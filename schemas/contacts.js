const Joi = require("joi");

const contactDataSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(3).max(15).required(),
});

const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  phone: Joi.string().min(3).max(15),
}).or("name", "email", "phone");

const idSchema = Joi.object({
  contactId: Joi.string().min(3).max(30).required(),
});

const favoriteSchema = Joi.object({
  favorite: Joi.boolean(),
});

module.exports = {
  contactDataSchema,
  updateContactSchema,
  idSchema,
  favoriteSchema,
};
