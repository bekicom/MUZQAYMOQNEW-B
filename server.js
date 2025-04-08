require("dotenv").config(); // .env faylidan ma'lumotlarni yuklash
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/dbConfig"); // Ma'lumotlar bazasi konfiguratsiyasi
const routes = require("./router/Router"); // Barcha routerlar

const app = express();

// Middleware'lar
app.use(express.json()); // JSON formatdagi ma'lumotlarni qabul qilish
app.use(morgan("dev")); // HTTP loglarini kuzatish
app.use(cors()); // CORS masalalarini boshqarish

// API manzillar
app.use("/api", routes);

// Xatolarni boshqarish middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// MongoDB bilan ulanish
connectDB(); // Ulanishni `dbConfig.js` dan amalga oshiradi

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
