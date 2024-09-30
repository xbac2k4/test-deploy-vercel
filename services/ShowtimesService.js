const Room = require("../models/Room");
const Showtimes = require("../models/Showtimes");
const Time = require("../models/Time");
class ShowTimesService {
    getShowtimesByPage = async (page, limit) => {
        try {
            const skip = (parseInt(page) - 1) * parseInt(limit);
            const showtimes = await Showtimes.find().populate('id_room').populate('id_time').populate('id_movie').skip(skip).limit(parseInt(limit));
            const total = await Showtimes.countDocuments();
            const totalPages = Math.ceil(total / parseInt(limit));
            // console.log('data: ', data);
            return {
                status: 200,
                message: "Danh sách lịch chiếu",
                data: {showtimes, totalPages}
            }
        } catch (error) {
            console.log(error);
        }
    }
    getShowtimesByID = async (id) => {
        try {
            const data = await Showtimes.findById(id).populate('id_room').populate('id_time').populate('id_movie')
            return {
                status: 200,
                message: "Danh sách lịch chiếu",
                data: data
            }
        } catch (error) {
            console.log(error);
        }
    }
    getShowtimesByDate = async (date) => {
        try {        
            const data = await Showtimes.find({
                date: date,
            }).populate('id_room').populate('id_time').populate({
                path: 'id_movie',
                populate: {
                    path: 'id_category',
                    model: 'category'
                }
            })
            return {
                status: 200,
                message: "Danh sách lịch chiếu",
                data: data
            }
        } catch (error) {
            console.log(error);
        }
    }
    getShowtimesByMovie = async (movie) => {
        try {        
            const data = await Showtimes.find({
                id_movie: movie,
            }).populate('id_room').populate('id_time').populate({
                path: 'id_movie',
                populate: {
                    path: 'id_category',
                    model: 'category'
                }
            })
            return {
                status: 200,
                message: "Danh sách lịch chiếu",
                data: data
            }
        } catch (error) {
            console.log(error);
        }
    }
    addShowtimes = async (date, id_room, id_time, id_movie) => {
        try {
            const existingShowtime = await Showtimes.findOne({
                date: date,
                id_room: id_room,
                id_time: id_time
            });
            // console.log(existingShowtime);
            if (existingShowtime) {
                return {
                    status: -2,
                    message: "Lịch chiếu đã tồn tại",
                    data: null
                };
            }
            // if (date && id_room && id_time) {
            //     return {
            //         status: -2,
            //         message: "Lịch chiếu đã tồn tại",
            //         data: null
            //     };
            // }
            const newShowtimes = new Showtimes({
                date: date,
                id_room: id_room,
                id_time: id_time,
                id_movie: id_movie
            });
            const result = await newShowtimes.save();
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
        } catch (error) {
            console.error('Error:', error);
            return {
                status: -1,
                message: 'Internal server error',
                data: null
            };
        }
    }
    updateCategory = async (id, name) => {
        try {
            const update = await Category.findById(id)
            let result = null;
                if (update) {
                    update.name = name ?? update.name,
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
        } catch (error) {
            console.error('Error:', error);
            return {
                status: -1,
                message: 'Internal server error',
                data: null
            };
        }
    }
    updateShowtimes = async (id, date, id_room, id_time, id_movie) => {
        try {
            const update = await Showtimes.findById(id)
            let result = null;
                if (update) {
                    update.date = date?? update.date,
                    update.id_room = id_room?? update.id_room,
                    update.id_time = id_time?? update.id_time,
                    update.id_movie = id_movie?? update.id_movie,
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
        } catch (error) {
            console.error('Error:', error);
            return {
                status: -1,
                message: 'Internal server error',
                data: null
            };
        }
    }
    deleteShowtimes = async (id) => {
        try {
            const result = await Showtimes.findByIdAndDelete(id);
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

module.exports = ShowTimesService;