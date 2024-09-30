const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const Seat = new Scheme({
    seatNumber: {type: String, required: true},
    rowNumber: {type: String, required: true},
    id_seatType: {type: Scheme.Types.ObjectId, ref: 'seattype', required: true},
}, {
    timestamps: true
}
)
module.exports = mongoose.model('seat', Seat);