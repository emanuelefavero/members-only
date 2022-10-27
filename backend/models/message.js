const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: String },
  createdAt: { type: Date, default: Date.now },

  // NOTE:
  likes: { type: Number, default: 0 },
  likedBy: { type: [String], default: [] },
})

module.exports = mongoose.model('Message', MessageSchema)
