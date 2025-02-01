const express = require('express')
const router = express.Router()
const moviesController = require('../controllers/movies') 
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/:id', moviesController.getMovie)
router.post('/:id/add', moviesController.addMovie)
router.get('/faves/all', moviesController.getFaves)
router.post('/:id/fave', moviesController.faveMovie)
router.get('/watchlist/all', moviesController.getWatchlist)
router.post('/:id/watchlist', moviesController.addToWatchlist)
router.get('/:id/recommendations', moviesController.getRecommendations)
router.get('/reviews/all', moviesController.getReviews)
router.post('/:id/review', moviesController.postReview)
router.put('/:id/review/edit', moviesController.editReview)
router.delete('/:id/delete', moviesController.deleteReview)

module.exports = router