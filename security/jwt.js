const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// get config vars
dotenv.config();
// access config var
process.env.TOKEN_SECRET;




function generateAccessToken(username, role) {
    return jwt.sign({ username, role }, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
}


function authenticateToken(req, res, next, role) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        console.log(err)

        if (user.role.role == role) {
            next()
        } else {
            res.sendStatus(403)
        }

    })
}
module.exports = { generateAccessToken, authenticateToken }