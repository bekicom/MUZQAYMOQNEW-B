const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const agentController = require("../controllers/agentController");
const pkgConf = require("../controllers/productTypeController"); // Mahsulot turlari uchun controller
const IC = require("../controllers/inventoryController"); // Mahsulot kirim qilish uchun controller
const DC = require("../controllers/distributionController"); // Mahsulot tarqatish uchun controller
const authMiddleware = require("../middleware/authMiddleware");

// Foydalanuvchi marshrutlari
router.post("/register", authMiddleware, userController.createUser); // Ro'yxatdan o'tish
router.get("/users", authMiddleware, userController.getAllUsers); // Foydalanuvchilar ro'yxati
router.get("/user/:id", authMiddleware, userController.getUserById); // ID bo'yicha foydalanuvchi
router.put("/user/:id", authMiddleware, userController.updateUser); // Foydalanuvchini yangilash
router.delete("/user/:id", authMiddleware, userController.deleteUser); // Foydalanuvchini o'chirish

// Agent marshrutlari
router.post("/agents", authMiddleware, agentController.createAgent); // Agent yaratish
router.get("/agents", authMiddleware, agentController.getAllAgents); // Agentlar ro'yxati
router.get("/agent/:id", authMiddleware, agentController.getAgentById); // ID bo'yicha agent
router.delete("/agent/:id", authMiddleware, agentController.deleteAgent); // Agentni o'chirish

// Mahsulot turlari marshrutlari
router.post("/product-types", authMiddleware, pkgConf.createProductType); // Mahsulot turi yaratish
router.get("/product-types", authMiddleware, pkgConf.getAllProductTypes); // Mahsulot turlari ro'yxati
router.get("/product-types/:id", authMiddleware, pkgConf.getProductTypeById); // ID bo'yicha mahsulot turi

// Mahsulot kirim marshrutlari
router.post("/inventory", authMiddleware, IC.addInventory); // Mahsulot kirim qilish
router.get("/inventory", authMiddleware, IC.getAllInventory); // Kirim ro'yxatini olish
router.put("/inventory/:id", authMiddleware, IC.updateInventory); // Kirimni yangilash
router.delete("/inventory/:id", authMiddleware, IC.deleteInventory); // Kirimni o'chirish

// Mahsulot tarqatish marshrutlari
router.post("/distributions", authMiddleware, DC.createDistribution); // Mahsulot tarqatish
router.get("/distributions", authMiddleware, DC.getAllDistributions); // Tarqatish ro'yxatini olish
router.delete("/distributions/:id", authMiddleware, DC.deleteDistribution); // Tarqatishni o'chirish

module.exports = router;
