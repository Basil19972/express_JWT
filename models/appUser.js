const mongoose = require('mongoose')

const appUserSchmea = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userCreatedAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})
module.exports = mongoose.model('AppUser', appUserSchmea)