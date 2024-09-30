const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const Time = new Scheme({
    timeName: {type: String, required: true}
}, {
    timestamps: true
}
)
module.exports = mongoose.model('time', Time);