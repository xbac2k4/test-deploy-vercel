const Category = require("../models/Category");
const Movie = require("../models/Movie");
const SeatSelected = require("../models/SeatSelect");
const DetailTicket = require("../models/DetailTicket");

class DetailTicketService {
    getAllDetailTicket = async () => {
        try {
            const data = await DetailTicket.find().populate({
                path: 'id_movie',
                populate: {
                    path: 'id_category',
                    model: 'category'
                },
            }).populate({
                path: 'id_seatselected',
                populate: [
                    {
                        path: 'id_seat',
                        model: 'seat',
                        populate: {
                            path: 'id_seatType',
                            model: 'seattype'
                        }
                    },
                    {
                        path: 'id_showtimes',
                        populate: [
                            {
                                path: 'id_room',
                                model: 'room'
                            },
                            {
                                path: 'id_time',
                                model: 'time'
                            },
                            {
                                path: 'id_movie',
                                model: 'movie',
                                populate: {
                                    path: 'id_category',
                                    model: 'category'
                                }
                            }
                        ]
                    }
                ]
            })
            // console.log('data: ', data);
            return {
                status: 200,
                message: "Danh sách chi tiết vé",
                data: data
            }
        } catch (error) {
            console.log(error);
        }
    }
    getDetailTicketByPage = async (page, limit) => {
        try {
            const skip = (parseInt(page) - 1) * parseInt(limit);
            const detailticket = await DetailTicket.find().skip(skip).limit(parseInt(limit)).populate({
                path: 'id_movie',
                populate: {
                    path: 'id_category',
                    model: 'category'
                },
            }).populate({
                path: 'id_seatselected',
                populate: [
                    {
                        path: 'id_seat',
                        model: 'seat',
                        populate: {
                            path: 'id_seatType',
                            model: 'seattype'
                        }
                    },
                    {
                        path: 'id_showtimes',
                        populate: [
                            {
                                path: 'id_room',
                                model: 'room'
                            },
                            {
                                path: 'id_time',
                                model: 'time'
                            },
                            {
                                path: 'id_movie',
                                model: 'movie',
                                populate: {
                                    path: 'id_category',
                                    model: 'category'
                                }
                            }
                        ]
                    }
                ]
            })
            const total = await DetailTicket.countDocuments();
            const totalPages = Math.ceil(total / parseInt(limit));
            // console.log('data: ', data);
            return {
                status: 200,
                message: "Danh sách chi tiết vé",
                data: { detailticket, totalPages }
            }
        } catch (error) {
            console.log(error);
        }
    }
    addDetailTicket = async (date, roomName, timeName, price, seatName, seatType, movieName, id_movie, id_seatselected, status) => {
        try {
            const newDetailTickety = new DetailTicket({
                date: date,
                roomName: roomName,
                timeName: timeName,
                price: price,
                seatName: seatName,
                seatType: seatType,
                movieName: movieName,
                id_movie: id_movie,
                id_seatselected: id_seatselected,
                status: status
            });
            const result = await newDetailTickety.save();
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
    getTicketByID = async (id) => {
        try {
            const data = await DetailTicket.findById(id).populate({
                path: 'id_movie',
                populate: {
                    path: 'id_category',
                    model: 'category'
                },
            }).populate({
                path: 'id_seatselected',
                populate: [
                    {
                        path: 'id_seat',
                        model: 'seat',
                        populate: {
                            path: 'id_seatType',
                            model: 'seattype'
                        }
                    },
                    {
                        path: 'id_showtimes',
                        populate: [
                            {
                                path: 'id_room',
                                model: 'room'
                            },
                            {
                                path: 'id_time',
                                model: 'time'
                            },
                            {
                                path: 'id_movie',
                                model: 'movie',
                                populate: {
                                    path: 'id_category',
                                    model: 'category'
                                }
                            }
                        ]
                    }
                ]
            })
            // console.log('data: ', data);
            return {
                status: 200,
                message: "Danh sách vé",
                data: data
            }
        } catch (error) {
            console.log(error);
        }
    }
    updateDetailTicket = async (id) => {
        try {
            const update = await DetailTicket.findById(id)
            let result = null;
                if (update) {
                    update.status = true?? update.status,
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
}

module.exports = DetailTicketService;