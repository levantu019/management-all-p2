const Joi = require('joi');

const accountSchema = Joi.object({
  name: Joi.string().max(100).required(),
  position: Joi.string().max(100).allow('', null),
  username: Joi.string().max(100).required(),
  password: Joi.string().min(6).max(255).required()
});

const accountUpdateSchema = Joi.object({
  name: Joi.string().max(100).required(),
  position: Joi.string().max(100).allow('', null),
  username: Joi.string().max(100).required(),
  password: Joi.string().min(6).max(255)
});

module.exports = { accountSchema, accountUpdateSchema };