const Joi = require("joi");

const agentValidationSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  familyName: Joi.string().min(3).max(50).required(),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]+$/)
    .length(12)
    .required(),
});

module.exports = {
  validateAgent: (data) => agentValidationSchema.validate(data),
};
