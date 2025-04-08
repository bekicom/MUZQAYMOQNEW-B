const mongoose = require("mongoose");

const distributionSchema = new mongoose.Schema(
  {
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agent", // Agent bilan bog'lanadi
      required: true,
    },
    storeName: {
      type: String, // Do'kon nomi
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductType", // Mahsulot turi bilan bog'lanadi
      required: true,
    },
    boxCount: {
      type: Number, // Necha karobka
      required: true,
    },
    totalUnits: {
      type: Number, // Karobkadan avtomatik hisoblanadi
      required: true,
    },
    distributionDate: {
      type: Date,
      default: Date.now, // Tarqatish sanasi
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Distribution", distributionSchema);
