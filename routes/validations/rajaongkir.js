const Joi = require('joi')

const schemas = {
    getCost: Joi.object().keys({
        origin: Joi.number().integer().min(1).required(),
        destination: Joi.required(),
        weight: Joi.number().integer().min(1).required(),
        courier: Joi.string().case('lower').required(),
    })
}

module.exports = schemas
