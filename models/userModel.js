const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["admin", "agent"], // Faqat admin yoki agent bo'lishi mumkin
      required: true,
    },
  },
  {
    timestamps: true, // Yaratilgan va yangilangan vaqtni avtomatik qo'shadi
  }
);

module.exports = mongoose.model("User", userSchema);
