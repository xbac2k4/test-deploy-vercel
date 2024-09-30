const SeatService  = require("../services/SeatService");
// get category by page
class SeatController {
    getAllSeat = async (req, res, next) => {
        try {
            const data = await new SeatService().getAllSeat();
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

module.exports = SeatController;
