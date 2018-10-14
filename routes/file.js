const express = require('express')
const router = express.Router();
const fs = require('fs')

const config = require('../config/app-config')

router.get('/:userId', (req, res) => {
    const userId = req.params.userId

    fs.readdir(config.dirName + '/' + userId, (err, files) => {
        if (err) return res.status(500).json({ message: 'Problem with fs files' })

        res.status(200).json({ files: files })
    })    
})

router.post('/add', (req, res) => {
    
})

module.exports = router