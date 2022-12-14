const Message = require('../models/message')

// Create a new message and populate the user field with the user's username
exports.createMessage = (req, res, next) => {
  const message = new Message({
    text: req.body.text,
    user: req.user.username,
  })
  message.save((err, result) => {
    if (err) {
      return next(err)
    }
    res.send(result)
  })
}

// Get all messages
exports.getMessages = (req, res, next) => {
  Message.find()
    .sort({ createdAt: -1 })
    // .limit(10)
    .exec((err, messages) => {
      if (err) {
        return next(err)
      }
      res.send(messages)
    })
}

// Delete a message
exports.deleteMessage = (req, res, next) => {
  Message.findByIdAndRemove(req.params.messageId, (err) => {
    if (err) {
      return next(err)
    }
    res.send('Message deleted successfully')
  })
}

// NOTE:
// Increase the likes count of a message and limit how many times a user can like a message to 1
exports.likeMessage = (req, res, next) => {
  Message.findById(req.params.messageId, (err, message) => {
    if (err) {
      return next(err)
    }
    if (message.likedBy.includes(req.body.username)) {
      res.send('You already liked this message')
    } else {
      message.likedBy.push(req.body.username)
      message.likes++
      message.save((err, result) => {
        if (err) {
          return next(err)
        }
        res.send(result)
      })
    }
  })
}
