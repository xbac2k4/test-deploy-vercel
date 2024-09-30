const SeatSelectedService = require("../services/SeatSelectedService");
// get category by page
class SeatSelectedController {
    getSeatSelectedByShowtimes = async (req, res, next) => {
        const { id_showtimes } = req.query;
        try {
            const data = await new SeatSelectedService().getSeatSelectedByShowtimes(id_showtimes);
            res.json({
                status: data.status,
                message: data.message,
                data: data.data
            })
        } catch (error) {
            console.log(error);
        }
    }
    addSeatSelected = async (req, res) => {
        try {
            const { id_showtimes, id_seat, price } = req.body;
            // console.log(req.body);
            // console.log(`name: ${name}`);
            const data = await new SeatSelectedService().addSeatSelected(id_showtimes, id_seat, price);
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

module.exports = SeatSelectedController;
