const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const Category = new Scheme({
    // image: { type: String },
    name: {type: String, required: true}
}, {
    timestamps: true
}
)
module.exports = mongoose.model('category', Category)