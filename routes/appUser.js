const express = require('express')
const appUser = require('../models/appUser')
const router = express.Router()
const AppUser = require('../models/appUser')
const jwt = require('../security/jwt')
const roles = require('../enum/userRoles')




router.get('/jwt', (req, res, next) => jwt.authenticateToken(req, res, next, roles.USER), (req, res) => {
    res.send("Worked")
})

// Getting All 
router.get('/', async (req, res) => {
    try {
        const appUser = await appUser.find()
        res.json(appUser)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})



/* Getting One getAppUser is the middleware */
router.get('/:id', getAppUser, (req, res) => {
    res.json(res.appUser)
})



// Register User
router.post('/register', async (req, res) => {
    const appUser = new AppUser({
        name: req.body.name,
        password: req.body.password,
    })
    try {
        const newAppUser = await appUser.save()
        res.status(201).json(newAppUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Login User
router.post('/login', async (req, res) => {

    //Get user with name and PW
    const user = await appUser.findOne({ 'name': req.body.name, 'password': req.body.password })
    //check if user exists 
    console.log(user.roles)
    if (user != null) {
        const token = jwt.generateAccessToken({ username: req.body.name }, { role: user.roles });
        res.json({ token })
    } else {
        res.status(403).json({ message: "Username or Password is worng" })
    }
})



// Updating One | Patch = only the changed data updates, Put = everything updates
router.patch('/:id', getAppUser, async (req, res) => {
    if (req.body.name != null) {
        res.appUser.name = req.body.name
    }
    if (req.body.password != null) {
        res.appUser.password = req.body.password
    }
    try {

        const updatesAppUser = await res.appUser.save()
        res.json(updatesAppUser)

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})



// Deleting One 
router.delete('/:id', getAppUser, async (req, res) => {
    try {
        await res.appUser.remove()
        res.json({ message: 'Deleted AppUser' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})





//function to get a AppUser it also check if the AppUser exists if not it return an error message 
async function getAppUser(req, res, next) {
    let appUser
    try {
        appUser = await appUser.findById(req.params.id)
        if (appUser == null) {
            return res.status(404).json({ message: 'Cannot find AppUser' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.appUser = appUser
    next()
}




module.exports = router