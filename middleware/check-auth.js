const jwt = require('jsonwebtoken')
const secret = require('../config/app-config').secret

module.exports = (req, res, next) => {
    try {
        const decoded = jwt.verify(req.body.token, secret)
        req.userData = decoded

        next()
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        })
    }
}