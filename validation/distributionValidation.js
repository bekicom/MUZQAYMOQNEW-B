const Joi = require("joi");

const distributionValidationSchema = Joi.object({
  agent: Joi.string().required(), // Agent ID
  storeName: Joi.string().min(3).max(100).required(), // Do'kon nomi
  product: Joi.string().required(), // Mahsulot ID
  boxCount: Joi.number().min(1).required(), // Karobka soni
});

module.exports = {
  validateDistribution: (data) => distributionValidationSchema.validate(data),
};
