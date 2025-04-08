const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB udar ulandi!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1); // Ulanish xatosi bo'lsa, jarayonni to'xtatadi
  }
};

module.exports = connectDB;
