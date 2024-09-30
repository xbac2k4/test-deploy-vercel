const SeatSelect = require("../models/SeatSelect");
const SeatType = require("../models/SeatType");

class SeatSelectedService {
    getSeatSelectedByShowtimes = async (id_showtimes) => {
        try {        
            const data = await SeatSelect.find({
                id_showtimes: id_showtimes,
            }).populate({
                path: 'id_seat',
                populate: {
                    path: 'id_seatType',
                    model: 'seattype'
                },
            }).populate({
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
            })
            return {
                status: 200,
                message: "Danh sách ghế ngồi",
                data: data
            }
        } catch (error) {
            console.log(error);
        }
    }
    addSeatSelected = async (id_showtimes, id_seat, price) => {
        try {
            const newSeatSelected = new SeatSelect({
                id_showtimes: id_showtimes,
                id_seat: id_seat,
                price: price
            });
            const result = await newSeatSelected.save();
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
}

module.exports = SeatSelectedService;