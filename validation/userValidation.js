const Joi = require('joi')

const regValidation = Joi.object({
    username : Joi.string().alphanum().required().min(6),
    email: Joi.string().email().required(),
    userType: Joi.string().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .min(6).required()
})

const loginValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})



const updateValidation = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),

})


const passwordValidation = Joi.object({
    newPassword: Joi.string().required(),
    confirmPassword: Joi.string().required(),
})

module.exports = {
    passwordValidation,
    regValidation,
    loginValidation,
    updateValidation
}