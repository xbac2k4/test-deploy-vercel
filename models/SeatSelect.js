const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const SeatSelected = new Scheme({
    id_showtimes: {type: Scheme.Types.ObjectId, ref: 'showtime', required: true},
    id_seat: {type: Scheme.Types.ObjectId, ref: 'seat', required: true},
    price: {type: Number, required: true},
}, {
    timestamps: true
}
)
module.exports = mongoose.model('seatselected', SeatSelected);