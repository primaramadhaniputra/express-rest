const Joi = require('joi');
const schema = Joi.object({
   question: Joi.string().min(10),
   answer: Joi.string().min(10)
})

module.exports = schema