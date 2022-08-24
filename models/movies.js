const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const moviesSchema = new Schema({
    title: String,
    res: String,
    year: Number,
    ImageUrl: String,
    link: String,
    rating: String,
    description: String
});

module.exports = mongoose.model('movies', moviesSchema);