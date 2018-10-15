const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const fs = require('fs')
const router = express.Router();

// Connect local files (Models, Controllers)
const User = require('../models/User')

// Connect config file
const config = require('../config/app-config')

// Routs
router.post('/signup', (req, res) => {
    User.find({ username: req.body.username }).select('_id').exec().then(user => {
        if (user.length >= 1) {
            res.status(409).json({ message: 'Mail exists' })
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) { return res.status(500).json({ error: err }) }
    
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    username: req.body.username,
                    password: hash
                })
    
                user.save().then(user => {
                    // create user folder
                    const userFolderById = config.dirName + '/' + user._id
                    if (!fs.existsSync(userFolderById)) { fs.mkdirSync(userFolderById) }

                    // create a jwt token
                    const token = jwt.sign({ id: user._id }, config.secret, { expiresIn: "3h" })

                    res.status(200).json({ message: 'Success signup', auth: true, token: token, result_message: user })
                }).catch(err => {
                    res.status(500).json({
                        error: err,
                        message: 'There was a problem registering the user.'
                    })
                })
            })
        }
    })
})

router.post('/login', (req, res) => {
    User.find({ username: req.body.username }).exec().then(user => {
        if (user.length <= 0) { 
            res.status(500).json({ message: 'Auth failed' }) 
        } else {
            bcrypt.compare(req.body.password, user[0].password, (error, result) => {
                if (error) return res.status(401).json({ message: 'Password incorectly' })
        
                if (result) {
                    const token = jwt.sign({ id: user[0]._id }, config.secret, { expiresIn: "3h" })
        
                    return res.status(200).json({
                        message: 'Auth successful',
                        auth: true,
                        userId: user[0]._id,
                        username: user[0].username,
                        token: token
                    })
                }
              })
        }
    }).catch(err => {
        res.status(500).json({ error: err, message: 'User not have' })
    })
})

module.exports = router