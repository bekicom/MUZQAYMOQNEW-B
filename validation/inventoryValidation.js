const Joi = require("joi");

const inventoryValidationSchema = Joi.object({
  product: Joi.string().required(), // Product ID
  boxCount: Joi.number().min(1).required(),
  purchasePricePerUnit: Joi.number().min(0).required(),
  sellingPricePerUnit: Joi.number().min(0).required(),
});

module.exports = {
  validateInventory: (data) => inventoryValidationSchema.validate(data),
};
