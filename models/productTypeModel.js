const mongoose = require("mongoose");

const productTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["donali", "karobkali"], // Maxsulot kelish turi
      required: true,
    },
    unitsPerBox: {
      type: Number,
      required: function () {
        return this.type === "karobkali"; // Faqat karobkali bo'lsa kerak
      },
    },
  },
  {
    timestamps: true, // Yaratilgan va yangilangan vaqtlarni kuzatadi
  }
);

module.exports = mongoose.model("ProductType", productTypeSchema);
