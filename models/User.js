const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: { type: String, required: true },
  email: { type: String, default: '' },
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  avatarImg: { type: String, default: 'no-image.png' },
  password: { type: String, required: true }
})

module.exports = mongoose.model('User', userSchema)