const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const messageController = require('../controllers/messageController')

router.post('/login', authController.login)
router.post('/register', authController.register)
router.get('/logout', authController.logout)

router.get('/user', authController.user)

router.get('/messages', messageController.getMessages)
router.post('/create-message', messageController.createMessage)
// router.get('/messages/:messageId', messageController.getMessage)

// router.delete('/messages/:messageId', messageController.deleteMessage)
router.delete('/delete-message/:messageId', messageController.deleteMessage)

module.exports = router
