const express = require('express')
const { allVenues, createVenue } = require('../controllers/venueController') 
const {authenticateToken} = require('../middleware/userMiddleware')
const venueRouter = express.Router()


venueRouter.get('/all-venue', allVenues)
venueRouter.post('/create-venue',authenticateToken, createVenue)



module.exports = venueRouter