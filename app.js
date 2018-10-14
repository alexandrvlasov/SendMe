const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')

// Require only routes
const authRoute = require('./routes/auth')
const accountRoute = require('./routes/account')
const fileRoute = require('./routes/file')

const config = require('./config/app-config')
const app = express()

//Connecte to Database
mongoose.connect(config.databaseURL, { useNewUrlParser: true })
mongoose.Promise = global.Promise

// Settings app express
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))

// Main routes
app.use('/api/auth', authRoute)
app.use('/api/user', accountRoute)
app.use('/api/file', fileRoute)

app.get('/', (req, res) => {
  res.status(200).send('Hello this my first RESTful API')
})
app.use((req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
})
app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})

module.exports = app;