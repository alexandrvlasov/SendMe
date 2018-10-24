const express = require('express')
const router = express.Router();
const fs = require('fs')

// Connect config file
const config = require('../config/app-config')

// Connect middleware
const checkAuth = require('../middleware/check-auth')

router.get('/:userId', (req, res) => {
    const userId = req.params.userId

    fs.readdir(config.dirName + '/' + userId, (err, files) => {
        if (err) return res.status(500).json({ message: 'Problem with fs files' })

        res.status(200).json({ files: files })
    })    
})

router.post('/add', async (req, res) => {
    let user = await User.findById()
})

module.exports = router