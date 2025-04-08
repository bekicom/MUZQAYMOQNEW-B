const Joi = require("joi");

const userValidationSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]+$/)
    .length(12)
    .required(),
  role: Joi.string().valid("admin", "agent").required(),
});

module.exports = {
  validateUser: (data) => userValidationSchema.validate(data),
};
