const express = require('express')
const {welcome,register, login, updateDetails, passwordUpdate } = require('../controllers/userController') 
const {authenticateToken} = require('../middleware/userMiddleware')

const router = express.Router()

router.get('/', welcome)
router.post('/register', register)
router.post('/login', login)
router.put('/update', authenticateToken, updateDetails)
router.put('/password', authenticateToken, passwordUpdate)


module.exports = router 