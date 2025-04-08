const Joi = require("joi");

const productTypeValidationSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  type: Joi.string().valid("donali", "karobkali").required(),
  unitsPerBox: Joi.number().min(1).optional(), // Karobkali bo'lsa, kerak
});

module.exports = {
  validateProductType: (data) => productTypeValidationSchema.validate(data),
};
