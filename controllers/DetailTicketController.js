const DetailTicket = require("../models/DetailTicket");
const DetailTicketService = require("../services/DetailTicketService");

class DetailTicketController {
    getAllDetailTicket = async (req, res) => {
        try {
            const data = await new DetailTicketService().getAllDetailTicket();
            // console.log('data: ', data);
            res.json({
                status: data.status,
                message: data.message,
                data: data.data
            })
        } catch (error) {
            console.log(error);
        }
    }
    getDetailTicketByPage = async (req, res) => {
        const { page, limit } = req.query;
        try {
            const data = await new DetailTicketService().getDetailTicketByPage(page, limit);
            res.json({
                status: data.status,
                message: data.message,
                data: data.data
            })
        } catch (error) {
            console.log(error);
        }
    }
    getDetailTicketByUser = async (req, res) => {
        try {
            const data = await Room.find().populate();
            // console.log('data: ', data);
            res.json({
                status: data.status,
                message: data.message,
                data: data.data
            })
        } catch (error) {
            console.log(error);
        }
    }
    addDetailTicket = async (req, res) => {
        try {
            const { date, roomName, timeName, price, seatName, seatType, movieName, id_movie, id_seatselected, status} = req.body
            const data = await new DetailTicketService().addDetailTicket(date, roomName, timeName, price, seatName, seatType, movieName, id_movie, id_seatselected, status);
            // console.log('data: ', data);
            res.json({
                status: data.status,
                message: data.message,
                data: data.data
            })
        } catch (error) {
            console.log(error);
        }
    }
    updateDetailTicket = async (req, res) => {
        try {
            const { id } = req.params

            const data = await new DetailTicketService().updateDetailTicket(id);
            res.json({
                status: data.status,
                message: data.message,
                data: data.data
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: 500, message: "Có lỗi xảy ra" }); // Trả về mã lỗi 500 nếu có lỗi
        }
    }
    getTicketByID = async (req, res) => {
        const { id } = req.params
        console.log("mmmmm", id);
        try {
            const data = await new DetailTicketService().getTicketByID(id);
            // console.log('data: ', data);
            res.json({
                status: data.status,
                message: data.message,
                data: data.data
            })
            console.log({
                status: data.status,
                message: data.message,
                data: data.data
            });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = DetailTicketController;