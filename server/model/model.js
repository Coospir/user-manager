const mongoose = require('mongoose')

let schema = new mongoose.Schema({
    steamID: {
        type: String,
        required: true,
        unique: true
    },
    gender: String,
    rank: String,
    weapon: String
})

const playerDB = mongoose.model('playerdb', schema)

module.exports = playerDB