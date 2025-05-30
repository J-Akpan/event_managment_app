const express = require('express')
const { } = require('../controllers/bookingController') 
const {authenticateToken} = require('../middleware/userMiddleware')
const bookingRouter = express.Router()


bookingRouter.get('/all-events', allEvents)
bookingRouter.post('/create-events',authenticateToken, createEvents)



module.exports = bookingRouter