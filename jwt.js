const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
// get config vars
dotenv.config();

const generateAccessToken = (str, time) => {
    return jwt.sign(str, process.env.TOKEN_SECRET, { expiresIn: time });
}

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        console.log(err)

        if (err) return res.sendStatus(403)

        req.user = user

        next()
    })
}

exports.generateAccessToken = generateAccessToken;
exports.authenticateToken = authenticateToken;