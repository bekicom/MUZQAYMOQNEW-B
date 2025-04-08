const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductType", // ProductType'ga bog'liq
      required: true,
    },
    boxCount: {
      type: Number,
      required: true,
    },
    totalUnits: {
      type: Number, // Karobka asosida avtomatik hisoblanadi
      required: true,
    },
    purchasePricePerUnit: {
      type: Number, // Donasining kelish narxi
      required: true,
    },
    sellingPricePerUnit: {
      type: Number, // Donasining sotish narxi
      required: true,
    },
  },
  {
    timestamps: true, // Qachon kiritilganini ko'rsatadi
  }
);

module.exports = mongoose.model("Inventory", inventorySchema);
