//import the neede moduls
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Event = require('../models/Events')
const { Op } = require('sequelize')
const {eventsCreateValidation} = require('../validation/eventsValidation')

//-------------Get all Events organizers
allEvents = async (req, res) =>{
    try {
        const allEvent = await User.findAll({
            where: {userType: "Event Organizer"},
            include: Event
        })
        if(allEvent) return res.status(200).json(allEvent)
        return res.status(404).json({msg: "No records found"})
        
    } catch (error) {
        throw error
    }
}

//--------------------create events------------
createEvents = async (req, res) =>{
    try {
        const userId = req.user.userId
        const venueId = req.user.venueId                //take not this is undefine at the moment
        console.log(venueId)
        const {title, description, startDate, endDate} = req.body

        // validation of the request body
        const { error } = eventsCreateValidation.validate(req.body)
        if (error) { return res.json(error.details[0].message) }

        //check for valid date
        const today = new Date()
        const eventDate = new Date(startDate)
        const closeDate = new Date(endDate)

        if(eventDate<today){
            return res.json({msg: "Event Start date cannot be a past date"})
        }
        if(closeDate<eventDate){
            return res.json({msg: "Event end date cannot be a past date"})
        }

        const createEvent = await Event.create({
            title: title,
            description: description,
            startDate: startDate,
            endDate:endDate,
            // venueId: venueId,
            userId: userId,
        })
        if (createEvent){
            return res.status(201).json({msg: "event created successfully"})
        }
        return res.status(500).json({msg: "An error occure while creating events"})




    } catch (error) {
        throw error
    }
}

module.exports ={
    allEvents,
    createEvents,
}