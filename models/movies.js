const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const moviesSchema = new Schema({
    imdbId: String,
    title: String,
    res: String,
    size: String,
    year: Number,
    ImageUrl: String,
    backdrop: String,
    link: String,
    trailer: String,
    rating: String,
    runtime: String,
    description: String,
    keyWords: String,
});
module.exports = mongoose.model('movies', moviesSchema);