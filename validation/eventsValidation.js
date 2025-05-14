const Joi = require('joi')

const eventsCreateValidation = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),



})

module.exports ={
    eventsCreateValidation
}