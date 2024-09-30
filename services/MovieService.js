const Movie = require("../models/Movie");

class MovieService {
    getMovieByPage = async (page, limit) => {
        try {
            const skip = (parseInt(page) - 1) * parseInt(limit);
            const movies = await Movie.find().skip(skip).limit(parseInt(limit)).populate('id_category');
            const total = await Movie.countDocuments();
            const totalPages = Math.ceil(total / parseInt(limit));
            // console.log('data: ', data);
            return {
                status: 200,
                message: "Danh sách phim",
                data: { movies, totalPages }
            }
        } catch (error) {
            console.log(error);
        }
    }
    getMovieByID = async (id) => {
        try {
            const movie = await Movie.findById(id).populate('id_category');
            return {
                status: 200,
                message: "Danh sách phim",
                data: movie
            }
        } catch (error) {
            console.log(error);
        }
    }
    addMovieWithImage = async (file, name, duration, directors, urlsImage, description, id_category, end_date, start_date) => {
        try {
            if (!file || !name) {
                return {
                    status: 400,
                    message: "Không tìm thấy file",
                    data: []
                }
            }
            // console.log('data: ' + data);
            // console.log('file: ' + file);
            if (file) {
                const newMovie = new Movie({
                    name: name,
                    duration: duration,
                    directors: directors,
                    image: urlsImage,
                    description: description,
                    id_category: id_category,
                    end_date: end_date,
                    start_date: start_date
                });
                const result = await newMovie.save();
                if (result) {
                    return {
                        status: 200,
                        message: "Thêm thành công",
                        data: result
                    };
                } else {
                    return {
                        status: 400,
                        message: "Lỗi, thêm không thành công",
                        data: []
                    };
                }
            }
        } catch (error) {
            console.error('Error:', error);
            return {
                status: -1,
                message: 'Internal server error',
                data: null
            };
        }
    }
    updateMovieWithImage = async (id, file, name, duration, directors, urlsImage, description, id_category, end_date, start_date) => {
        try {
            const update = await Movie.findById(id)
            if (file) {
                let result = null;
                if (update) {
                    update.name = name ?? update.name,
                    update.image = urlsImage ?? update.image,
                    update.duration = duration?? update.duration,
                    update.directors = directors?? update.directors,
                    update.description = description?? update.description,
                    update.id_category = id_category?? update.id_category,
                    update.end_date = end_date?? update.end_date,
                    update.start_date = start_date?? update.start_date,
                    result = await update.save();
                }
                if (result) { // Nếu thêm thành công
                    return {
                        status: 200,
                        message: "Cập nhật thành công",
                        data: result
                    };
                } else { // Nếu thêm không thành công
                    return {
                        status: 400,
                        message: "Lỗi, thêm không thành công",
                        data: []
                    };
                }
            }
        } catch (error) {
            console.error('Error:', error);
            return {
                status: -1,
                message: 'Internal server error',
                data: null
            };
        }
    }
    deleteMovie = async (id) => {
        try {
            const result = await Movie.findByIdAndDelete(id);
            if (result) {
                return {
                    status: 200,
                    message: "Xóa thành công",
                    data: result
                };
            } else {
                return {
                    status: 400,
                    message: "Lỗi, xóa không thành công",
                    data: []
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = MovieService;