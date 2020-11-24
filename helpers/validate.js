const Joi = require('joi')
const response = require('../config/response')

const validate = (schema, property) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body)
        const valid = error == null

        if (valid) {
            next()
        } else {
            const { details } = error
            const message = details.map(i => i.message).join(',')

            response.failed(message, res, 422)
        }
    }
}

module.exports = validate
