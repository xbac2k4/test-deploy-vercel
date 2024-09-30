const Room = require("../models/Room");

class RoomController {
    getAllRoom = async (req, res) => {
        try {
            const data = await Room.find().populate();
            // console.log('data: ', data);
            res.json({
                status: 200,
                messenger: "Danh sách phòng",
                data: data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = RoomController;