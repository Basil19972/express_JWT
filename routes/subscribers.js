const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')



// Getting All 
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})



/* Getting One getSubscriber is the middleware */
router.get('/:id', getSubscriber, (req, res) => {
    res.json(res.subscriber)
})



// Creating One
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscriberToChnnel: req.body.subscriberToChnnel
    })
    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})


// Updating One | Patch = only the changed data updates, Put = everything updates
router.patch('/:id', getSubscriber, async (req, res) => {
    if (req.body.name != null) {
        res.subscriber.name = req.body.name
    }
    if (req.body.subscriberToChnnel != null) {
        res.subscriber.subscriberToChnnel = req.body.subscriberToChnnel
    }
    try {

        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})



// Deleting One 
router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        await res.subscriber.remove()
        res.json({ message: 'Deleted Subscriber' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})





//function to get a subscriber it also check if the subscriber exists if not it return an error message 
async function getSubscriber(req, res, next) {
    let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id)
        console.log(subscriber)
        if (subscriber == null) {
            return res.status(404).json({ message: 'Cannot find subscriber' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.subscriber = subscriber
    next()
}




module.exports = router