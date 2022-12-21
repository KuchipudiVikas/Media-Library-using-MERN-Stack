const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const seriesSchema = new Schema({
    title: String,
    year: String,
    description: String,
    runtime: String,
    rating: String,
    trailer: String,
    poster: String,
    backdrop: String,
    seasons: [
        {
            name: String,
            link: String
        }
    ],
})

module.exports = mongoose.model('series', seriesSchema)