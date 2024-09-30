const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Ticket = new Schema({
    date: { type: String, required: true },
    id_user: { type: Schema.Types.ObjectId, ref: 'user' },
    id_detailstickets: [{ type: Schema.Types.ObjectId, ref: 'detailticket' }],
}, {
    timestamps: true
});
module.exports = mongoose.model('ticket', Ticket)