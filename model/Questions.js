const mongoose = require('mongoose')

const questions = mongoose.Schema({
    id: String,
    username: String,
    question: String,
})

module.exports = mongoose.model('Questions', questions)