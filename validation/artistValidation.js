const Joi = require('joi')

const artistUpdateValidation = Joi.object({
    genre: Joi.string().required(),
    portforlioLink: Joi.string().required(),
})

const artistSearchValidation = Joi.object({
    searchTerm: Joi.string().required(),
})

module.exports ={
    artistUpdateValidation,
    artistSearchValidation 
}