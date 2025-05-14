//import the neede moduls
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Event = require('../models/Events')
const Venue = require('../models/Venues')
const { Op } = require('sequelize')
const {venueCreateValidation} = require('../validation/venueValidation')


allVenues =async (req, res) => {
    try {
        const venueOwners = await User.findAll({
            where: {userType: "Venue Owner"},
            include: Venue
        })
        res.status(200).json(venueOwners)
     
    } catch (error) {
        throw error
    }

}

createVenue = async (req, res) => {
    try {
        const venueOwner = req.user.userId
        const {location, capacity, amenities, availability} = req.body

        // validation of the request body
        const { error } = venueCreateValidation.validate(req.body)
        if (error) { return res.json(error.details[0].message) }

        const createVenue = await Venue.findOrCreate({
            where: {userId: venueOwner},
            userId: venueOwner,
            location,
            capacity, 
            amenities, 
            availability
        })

        console.log(createVenue)

        // if (createVenue){
        //     return res.status(500).json({msg: "Record with these detail already exist"})
        // }
        // return res.status(201).json({msg: "Venue created successfully"})


    } catch (error) {
        throw error
    }

}



module.exports = {
    allVenues,
    createVenue
}
