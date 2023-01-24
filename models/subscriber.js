const mongoose = require('mongoose')

const subscriberSchmea = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subscriberToChnnel: {
        type: String,
        required: true
    },
    subscriberDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})
module.exports = mongoose.model('Subscriber', subscriberSchmea)