const mongoose = require('mongoose')
const roles = require('../enum/userRoles')


const appUserSchmea = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        type: String,
        required: true,
        default: roles.USER
    },
    userCreatedAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})
module.exports = mongoose.model('AppUser', appUserSchmea)