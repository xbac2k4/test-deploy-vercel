const Movie = require("../models/Movie");
const MovieService = require("../services/MovieService");

class MovieController {
    getAllMovie = async (req, res) => {
        try {
            const data = await Movie.find().populate('id_category');
            // console.log('data: ', data);
            res.json({
                "status": 200,
                "messenger": "Danh sách phim",
                "data": data
            })
        } catch (error) {
            console.log(error);
        }
    }
    getMovieByPage = async (req, res, next) => {
        const { page, limit } = req.query;
        try {
            const data = await new MovieService().getMovieByPage(page, limit);
            res.json({
                status: data.status,
                message: data.message,
                data: data.data
            })
        } catch (error) {
            console.log(error);
        }
    }
    getMovieByID = async (req, res, next) => {
        const { id } = req.params;
        try {
            const data = await new MovieService().getMovieByID(id);
            res.json({
                status: data.status,
                message: data.message,
                data: data.data
            })
        } catch (error) {
            console.error('Error fetching movie', error);
            res.status(500).json({ error: 'Server error' });
        }
    }
    addMovieWithImage = async (req, res) => {
        try {
            const file = req.file;
            console.log(`file: ${file}`);
            const name = req.body.name;
            const duration = req.body.duration;
            const directors = req.body.directors;
            const urlsImage = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
            const description = req.body.description;
            const id_category = req.body.id_category;
            const end_date = req.body.end_date;
            const start_date = req.body.start_date;
            const data = await new MovieService().addMovieWithImage(file, name, duration, directors, urlsImage, description, id_category, end_date, start_date);
            res.json({
                status: data.status,
                message: data.message,
                data: data.data
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: 500, message: "Có lỗi xảy ra" });
        }
    }
    updateMovieWithImage = async (req, res) => {
        try {
            const { id } = req.params;
            const file = req.file;
            // console.log(`file: ${file}`);
            const name = req.body.name;
            const duration = req.body.duration;
            const directors = req.body.directors;
            const urlsImage = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
            const description = req.body.description;
            const id_category = req.body.id_category;
            const end_date = req.body.end_date;
            const start_date = req.body.start_date;
            const data = await new MovieService().updateMovieWithImage(id, file, name, duration, directors, urlsImage, description, id_category, end_date, start_date);
            res.json({
                status: data.status,
                message: data.message,
                data: data.data
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: 500, message: "Có lỗi xảy ra" });
        }
    }
    deleteMovie = async (req, res) => {
        try {
            const { id } = req.params;
            const data = await new MovieService().deleteMovie(id);
            res.json({
                status: data.status,
                message: data.message,
                data: data.data
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: 500, message: "Có lỗi xảy ra" });
        }
    }
}

module.exports = MovieController;