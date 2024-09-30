const Time = require("../models/Time");

class TimeController {
    getAllTime = async (req, res) => {
        try {
            const data = await Time.find().populate();
            // console.log('data: ', data);
            res.json({
                status: 200,
                messenger: "Danh sách khung giờ",
                data: data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = TimeController;