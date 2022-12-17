const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const accountsSchema = new Schema({
    gmail: String,
    size: String
})

module.exports = mongoose.model('accounts', accountsSchema)