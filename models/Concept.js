var mongoose = require('mongoose')


module.exports = mongoose.model('Concept', {
    definition: String,
    language: String
})