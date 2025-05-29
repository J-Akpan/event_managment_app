const express = require('express')
const { allVenues, createVenue, venueInfo, deleteVenue, searchVenue } = require('../controllers/venueController') 
const {authenticateToken} = require('../middleware/userMiddleware')
const venueRouter = express.Router()


venueRouter.get('/all', allVenues)
venueRouter.get('/info',authenticateToken, venueInfo)
venueRouter.get('/search',authenticateToken, searchVenue)
venueRouter.post('/create',authenticateToken, createVenue)
venueRouter.delete('/delete',authenticateToken, deleteVenue)



module.exports = venueRouter