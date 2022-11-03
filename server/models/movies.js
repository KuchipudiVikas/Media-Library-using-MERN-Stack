const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const moviesSchema = new Schema({
    imdbId: String,
    title: String,
    res: String,
    year: Number,
    ImageUrl: String,
    BackDrop: String,
    link: String,
    rating: String,
    description: String,
    keyWords: String,
});

module.exports = mongoose.model('movies', moviesSchema);