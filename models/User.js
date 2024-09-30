const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const User = new Scheme({
    username: { type: String, unique: true, maxlength: 255 },
    password: { type: String, maxLeght: 255 },
    email: { type: String, unique: true },
    avatar: { type: String },
    sex: { type: Number},
    phoneNumber: { type: String, unique: true },
    roles: { type: Number, default: 1 },
}, {
    timestamps: true
}
)

module.exports = mongoose.model('user', User)