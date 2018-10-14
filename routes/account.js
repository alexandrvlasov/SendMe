const express = require('express')
const router = express.Router();

// Connect local files (Models, Controllers)
const User = require('../models/User')

// Routs
router.post('/:userId', (req, res) => {
    User.find({ _id: req.params.userId }).exec().then(user => {
        if (user.length <= 0) {
            res.status(409).json({ message: 'User no have' })
        } else {
            res.status(200).json({ user: user })
        }
    })
}).patch('/:userId', (req, res) => {
    const userId = req.params.userId

    User.findById(userId).exec().then(user => {
        if (user.length <= 0) {
            res.status(409).json({ message: 'Mail exists' })
        } else {
            User.update({ _id: userId }, { firstName: req.body.firstname, lastName: req.body.lastname }).exec().then(result => {
                res.status(200).json({ message: 'Update success' })
            }).catch(err => {
                res.status(500).json({ message: 'Update error' })
            })
        }
    })
})

// router.post('/login', authControllers.login)
// router.delete('/:userId', authControllers.deleteUser)

module.exports = router