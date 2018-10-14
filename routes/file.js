const express = require('express')
const router = express.Router();
const fs = require('fs')

const config = require('../config/app-config')

router.get('/:userId', (req, res) => {
    const userId = req.params.userId // req.body.userid
    const files = {}

    fs.readdir(config.dirName + '/' + userId, (err, files) => {
        files.forEach(file => {
            files.append(file)
        })
    })

    res.status(200).json({ files: files })
})

router.post('/add', (req, res) => {
    
})

module.exports = router