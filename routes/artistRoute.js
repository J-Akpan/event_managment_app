const express = require('express')
const {
    allArtist, 
    artistDetailsUpdate, 
    artistInfo,
    deleteArtist
} = require('../controllers/artistController') 
const {authenticateToken} = require('../middleware/userMiddleware')

const artistRouter = express.Router()


artistRouter.get('/all-artist', allArtist)
artistRouter.post('/update', authenticateToken, artistDetailsUpdate)
artistRouter.get('/artist-info', authenticateToken, artistInfo)
artistRouter.delete('/delete-artist', authenticateToken, deleteArtist)


module.exports = artistRouter