const Joi = require('joi');
const schema = Joi.object({
   username: Joi.string().required().min(10),
   password: Joi.string().required(),
   email: Joi.string().required()
})

module.exports = schema