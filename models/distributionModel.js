const mongoose = require("mongoose");

const distributionSchema = new mongoose.Schema(
  {
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agent",
      required: true,
    },
    storeName: {
      type: String,
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductType",
      required: true,
    },
    boxCount: {
      type: Number,
      required: true,
    },
    totalUnits: {
      type: Number,
      required: true,
    },
    partialPaymentUnits: {
      type: Number, // Qancha dona mahsulot qabul qilindi
      required: true,
    },
    remainingDebtUnits: {
      type: Number, // Nasiyaga qolgan mahsulot donalari
      required: true,
    },
    distributionDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Distribution", distributionSchema);
