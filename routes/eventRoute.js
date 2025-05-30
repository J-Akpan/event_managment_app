const express = require('express')
const { allEvents, createEvents} = require('../controllers/eventController') 
const {authenticateToken} = require('../middleware/userMiddleware')
const eventRouter = express.Router()


eventRouter.get('/all-events', allEvents)
eventRouter.post('/create-events', authenticateToken, createEvents)



module.exports = eventRouter