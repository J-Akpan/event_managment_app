const express = require('express')
const { allVenues, createVenue, venueInfo } = require('../controllers/venueController') 
const {authenticateToken} = require('../middleware/userMiddleware')
const venueRouter = express.Router()


venueRouter.get('/all', allVenues)
venueRouter.post('/info',authenticateToken, venueInfo)
venueRouter.post('/create',authenticateToken, createVenue)



module.exports = venueRouter