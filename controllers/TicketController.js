const DetailTicket = require("../models/DetailTicket");
const TicketService = require("../services/TicketService");

class TicketController {
    getTicketByUser = async (req, res) => {
        const { id_user } = req.query;
        console.log("mmmmm", id_user);
        try {
            const data = await new TicketService().getTicketByUser(id_user);
            // console.log('data: ', data);
            res.json({
                status: data.status,
                message: data.message,
                data: data.data
            })
            // console.log({
            //     status: data.status,
            //     message: data.message,
            //     data: data.data
            // });
        } catch (error) {
            console.log(error);
        }
    }

    addTicket = async (req, res) => {
        try {
            const { date, id_user, id_detailstickets } = req.body
            console.log("mmmmm", id_detailstickets);
            const data = await new TicketService().addTicket(date, id_user, id_detailstickets);
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
    
}

module.exports = TicketController;