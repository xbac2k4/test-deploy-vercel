const Category = require("../models/Category");
const DetailTicket = require("../models/DetailTicket");
const Movie = require("../models/Movie");
const SeatSelected = require("../models/SeatSelect");
const Ticket = require("../models/Ticket");
const mongoose = require('mongoose');

class TicketService {
    getTicketByUser = async (id_user) => {
        try {
            const data = await Ticket.find({
                id_user: id_user,
            }).populate('id_user').populate({
                path: 'id_detailstickets',
                populate: [
                    {
                        path: 'id_movie',
                        populate: {
                            path: 'id_category',
                            model: 'category'
                        },
                    },
                    {
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
    addTicket = async (date, id_user, id_detailstickets, status) => {
        console.log(id_detailstickets);
        try {
            for (const id of id_detailstickets) {
                if (!mongoose.Types.ObjectId.isValid(id)) {
                    return {
                        status: 400,
                        message: "One or more ids in id_ticketdetails are not valid ObjectIds",
                        data: []
                    };
                }
            }

            const newTicket = new Ticket({
                date: date,
                id_user: id_user,
                id_detailstickets: id_detailstickets,
            });
            console.log("kkkkk", newTicket);
            const result = await newTicket.save();
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

module.exports = TicketService;