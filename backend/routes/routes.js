const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const messageController = require('../controllers/messageController')

router.post('/login', authController.login)
router.post('/register', authController.register)
router.get('/logout', authController.logout)

router.get('/user', authController.user)

router.get('/messages', messageController.getMessages)
router.post('/messages', messageController.createMessage)
// router.get('/messages/:messageId', messageController.getMessage)

// router.delete('/messages/:messageId', messageController.deleteMessage)
router.delete('/messages/:messageId', messageController.deleteMessage)

// NOTE:
// Add a new route for liking a message
router.put('/messages/:messageId/like', messageController.likeMessage)

module.exports = router
