const Joi = require("joi");

const contactDataSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(3).max(15).required(),
});

const idSchema = Joi.object({
  contactId: Joi.string().min(3).max(30).required(),
});

module.exports = {
  contactDataSchema,
  idSchema,
};
