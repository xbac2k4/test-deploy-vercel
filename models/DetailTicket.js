const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const DetailTicket = new Scheme({
    date: { type: String, required: true },
    roomName: { type: String, required: true },
    timeName: { type: String, required: true },
    price: { type: Number, required: true },
    seatName: { type: String, required: true },
    seatType: { type: Number, required: true },
    movieName: { type: String, required: true },
    id_movie: { type: Scheme.Types.ObjectId, ref: 'movie' },
    id_seatselected: { type: Scheme.Types.ObjectId, ref: 'seatselected' },
    status: { type: Boolean, required: true },
}, {
    timestamps: true
}
)
module.exports = mongoose.model('detailticket', DetailTicket)