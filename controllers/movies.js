const User = require('../models/User')
const Movie = require('../models/Movie')
const Review = require('../models/Review')
const Fave = require('../models/Fave')
const Watchlist = require('../models/Watchlist')
const Recommendation = require('../models/Recommendation')

module.exports = {
    
    getMovie: async (req, res) => {
        const movieId = req.params.id

        try {
          const movie = await Movie.find({movieId: movieId}).lean()
          
          if (Object.keys(movie).length === 0) {
              return res.json({movie: {}})
          } 

          return res.json({movie: movie})
        } catch (error) {
          console.log(error)
          return res.status(500).json({ message: 'Server Error' });
        }
      },
    
    addMovie: async (req, res) => {
        const movie = req.body
        
        try {
            await Movie.create({ 
              tmdbId: movie.tmdbId,
              director: movie.director,
              cast: movie.cast,
              title: movie.title,
              release_date: movie.release_date,
              overview: movie.overview,
              poster: movie.poster,
              mediaType: movie.mediaType,
              trailer: movie.trailer,
              sources: movie.sources,
              genres: movie.genres,
              production_companies: movie.production_companies,
              status: movie.status,
              popularity: movie.popularity,
              tagline: movie.tagline  
            })
            return res.status(201).json({ "message": "Movie successfully added" })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Server Error' });
        }
    },
    
    getFaves: async (req, res) => {
      try {
        const favedMovies = await Fave.find({userId: req.user.id})
        
        if (favedMovies.length === 0) {
            return res.json({faves: []})
        } 

        const favesData = favedMovies.map(movie => ({
            tmdbId: movie.tmdbId,
            mediaType: movie.mediaType,
            title: movie.title,
            poster: movie.poster
        }))

        return res.json({faves: favesData})
      } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Server Error' });
      }
    },
  
    
    faveMovie: async (req, res) => {
        try {
          const movieFromDB = await Movie.findOne({tmdbId: req.params.id}).lean()
          
          if (!movieFromDB) {
            return res.status(404).json({ message: "Movie not found" });
          }

          const { _id: mongoId, mediaType, title, poster, tmdbId } = movieFromDB;

          await Fave.create({ userId: req.user.id, title: title, itemId: mongoId, mediaType: mediaType, poster: poster, tmdbId: tmdbId})

          return res.status(201).json({ "message": "Added to faves" })
        } catch (error) {
          console.error(error)
          return res.status(500).json({ message: 'Server Error' }); 
        }
    },
  
    removeFave: async (req, res) => {
      try {
        const user = req.user.id
        const mediaId = req.params.id
        await Fave.findOneAndDelete({userId: user, tmdbId: mediaId })

        return res.status(201).json({ "message": "Removed from faves" })
      } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Server Error' }); 
      }
    },
  
    getReviews: async (req, res) => {
      try {
        const reviewedMovies = await Review.find({userId: req.user.id})
        
        if (reviewedMovies.length === 0) {
            return res.json({reviews: []})
        } 

        const reviewsData = reviewedMovies.map(reviews => ({
            mongoId: reviews._id,
            title: reviews.title,
            poster: reviews.poster,
            text: reviews.text
        }))

        return res.json({reviews: reviewsData})
      } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Server Error' });
      }
    },
  
   
    postReview: async (req, res) => {
      try {
        const movieFromDB = await Movie.findOne({tmdbId: req.params.id}).lean()
        
        if (!movieFromDB) {
          return res.status(404).json({ message: "Movie not found" });
        }

        const { _id, title, poster } = movieFromDB;

        await Review.create({ userId: req.user.id, title: title, itemId: _id, poster: poster, text: req.body.text})

        return res.status(201).json({ "message": "Added to faves" })
      } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Server Error' }); 
      }
    },

    getRecommendations: async (req, res) => {
      try {
        const recommendations = await Recommendation.find({userId: req.user.id})

        
      } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Server Error' });
      }
    },

    deleteReview: async (req, res) => {
      try {
        const reviewToDelete = req.params.id

        await Review.findOneAndDelete({ _id: reviewToDelete })
        return res.status(204).json('deleted!')
      } catch (error) {
        return res.status(500).json({ message: 'Server Error' });
      }
    },

    editReview: async (req, res) => {
      try {
        const reviewToEdit = req.params.id
        const newText = req.body.text

        await Review.findOneAndUpdate({ _id: reviewToEdit}, {text: newText })
        return res.status(204).json('review updated!')
      } catch (error) {
        return res.status(500).json({ message: 'Server Error' });
      }
    },

    addToWatchlist: async (req, res) => {
      try {
        const movieFromDB = await Movie.findOne({tmdbId: req.params.id}).lean()
        
        if (!movieFromDB) {
          return res.status(404).json({ message: "Movie not found" });
        }

        const { _id: mongoId, mediaType, title, poster, tmdbId } = movieFromDB;

        await Watchlist.create({ userId: req.user.id, title: title, itemId: mongoId, mediaType: mediaType, poster: poster, tmdbId: tmdbId})

        return res.status(201).json({ "message": "Added to watchlist" })
      } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Server Error' }); 
      }
  },

  getWatchlist: async (req, res) => {
    try {
      const watchlist = await Watchlist.find({userId: req.user.id})
      
      if (watchlist.length === 0) {
          return res.json({watchlist: []})
      } 

      const watchlistData = watchlist.map(movie => ({
          tmdbId: movie.tmdbId,
          title: movie.title,
          poster: movie.poster,
          mediaType: movie.mediaType
      }))

      return res.json({watchlist: watchlistData})
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Server Error' });
    }
  }, 
}