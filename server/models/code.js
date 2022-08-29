const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const codeSchema = new Schema({
    title: String,
    language: String,
    code: String
});

module.exports = mongoose.model('code', codeSchema);