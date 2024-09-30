const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const SeatType = new Scheme({
    seatType: {type: Number, required: true},
    price: {type: Number, required: true},
}, {
    timestamps: true
}
)
module.exports = mongoose.model('seattype', SeatType);