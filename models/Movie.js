const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const Movie = new Scheme({
    image: { type: String },
    name: { type: String, required: true },
    start_date: { type: String, required: true },
    end_date: { type: String, required: true },
    duration: { type: String, required: true },
    description: { type: String, required: true },
    directors: { type: String, required: true },
    id_category: { type: Scheme.Types.ObjectId, ref: 'category' },
}, {
    timestamps: true
}
)
module.exports = mongoose.model('movie', Movie)