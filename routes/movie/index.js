const express = require('express');
const router = express.Router();
const MovieController = require('../../controllers/MovieController');
const authenticateToken = require('../../middlewares/auth');
const Upload = require('../../config/common/upload');
// Movie
router.get('/get-movie-by-page', new MovieController().getMovieByPage);
router.get('/get-movie', new MovieController().getAllMovie);
router.get('/get-movie-by-id/:id', new MovieController().getMovieByID);
router.post('/add-movie-with-image', Upload.single('image'), new MovieController().addMovieWithImage);
router.put('/update-movie-with-image/:id', Upload.single('image'), new MovieController().updateMovieWithImage);
router.delete('/delete-movie/:id', new MovieController().deleteMovie);

module.exports = router;
