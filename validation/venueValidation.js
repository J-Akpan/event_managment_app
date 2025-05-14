const Joi = require('joi')

const venueCreateValidation = Joi.object({
    location: Joi.string().required(),
    capacity: Joi.string().required(),
    amenities: Joi.string().required(),
    availability: Joi.string().required(),
})

module.exports ={
    venueCreateValidation
}