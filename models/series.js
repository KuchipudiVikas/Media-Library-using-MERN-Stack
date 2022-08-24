const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const seriesSchema = new Schema({
    title: String,
    noe: String,
    year: Number,
    poster: String,
    link: String,
    episodes: String,
    description: String
});

module.exports = mongoose.model('series', seriesSchema);