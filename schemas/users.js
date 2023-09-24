const Joi = require("joi");

const registrationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(30).required(),
});

module.exports = {
    registrationSchema
};
