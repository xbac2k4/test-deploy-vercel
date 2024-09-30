const Seat = require("../models/Seat");
const SeatType = require("../models/SeatType");

class SeatService {
    getAllSeat = async () => {
        try {
            const data = await Seat.find().populate('id_seatType')
            // console.log('data: ', data);
            return {
                status: 200,
                message: "Danh sách ghế ngồi",
                data: data
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = SeatService;