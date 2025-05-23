const express = require('express')
const {
    allArtist, 
    artistDetailsUpdate, 
    artistInfo,
    deleteArtist
} = require('../controllers/artistController') 
const {authenticateToken} = require('../middleware/userMiddleware')

const artistRouter = express.Router()


artistRouter.get('/all', allArtist)
artistRouter.post('/create', authenticateToken, artistDetailsUpdate)
artistRouter.get('/info', authenticateToken, artistInfo)
artistRouter.delete('/delete', authenticateToken, deleteArtist)


module.exports = artistRouter