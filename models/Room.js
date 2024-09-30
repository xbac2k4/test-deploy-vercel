const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const Room = new Scheme({
    roomName: {type: String, required: true}
}, {
    timestamps: true
}
)
module.exports = mongoose.model('room', Room);