const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Foydalanuvchini yaratish
exports.createUser = async (req, res) => {
  try {
    const { name, phoneNumber, role } = req.body;

    // Ruxsat etilgan rollarni tekshirish
    if (!["admin", "agent"].includes(role)) {
      return res.status(400).json({ message: "Invalid role type" });
    }

    // Foydalanuvchini saqlash
    const newUser = await User.create({ name, phoneNumber, role });
    res
      .status(201)
      .json({ message: "User created successfully", data: newUser });
  } catch (error) {
    // Telefon raqami unique bo'lsa va mavjud bo'lsa, xatolik qaytadi
    if (error.code === 11000) {
      return res.status(400).json({ message: "Phone number already exists" });
    }
    res.status(500).json({ message: error.message });
  }
};

// Barcha foydalanuvchilarni olish
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res
      .status(200)
      .json({ message: "All users fetched successfully", data: users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Foydalanuvchini ID bo'yicha olish
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User found", data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Foydalanuvchini yangilash
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User updated successfully", data: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Foydalanuvchini o'chirish
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Foydalanuvchini login qilish
exports.loginUser = async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    // Telefon raqami orqali foydalanuvchini topish
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // JWT Token yaratish
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          phoneNumber: user.phoneNumber,
          role: user.role,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
