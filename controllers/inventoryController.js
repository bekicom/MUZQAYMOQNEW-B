const Inventory = require("../models/inventoryModel");
const ProductType = require("../models/productTypeModel");

// Mahsulot kirim qilish
exports.addInventory = async (req, res) => {
  try {
    const { product, boxCount, purchasePricePerUnit, sellingPricePerUnit } =
      req.body;

    // Mahsulotni topish
    const productType = await ProductType.findById(product);
    if (!productType) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Donalar sonini hisoblash (karobka uchun)
    const totalUnits =
      productType.type === "karobkali"
        ? boxCount * productType.unitsPerBox
        : boxCount;

    const newInventory = new Inventory({
      product,
      boxCount,
      totalUnits,
      purchasePricePerUnit,
      sellingPricePerUnit,
    });

    await newInventory.save();
    res.status(201).json(newInventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Barcha kirimlarni olish
exports.getAllInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find().populate("product");
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ID bo'yicha kirimni yangilash
exports.updateInventory = async (req, res) => {
  try {
    const { boxCount, purchasePricePerUnit, sellingPricePerUnit } = req.body;

    const inventory = await Inventory.findById(req.params.id);
    if (!inventory) {
      return res.status(404).json({ message: "Inventory not found" });
    }

    // Agar boxCount yangilansa, donalar sonini qayta hisoblash
    if (boxCount !== undefined) {
      const productType = await ProductType.findById(inventory.product);
      inventory.totalUnits =
        productType.type === "karobkali"
          ? boxCount * productType.unitsPerBox
          : boxCount;
      inventory.boxCount = boxCount;
    }

    inventory.purchasePricePerUnit =
      purchasePricePerUnit || inventory.purchasePricePerUnit;
    inventory.sellingPricePerUnit =
      sellingPricePerUnit || inventory.sellingPricePerUnit;

    await inventory.save();
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ID bo'yicha kirimni o'chirish
exports.deleteInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findByIdAndDelete(req.params.id);
    if (!inventory) {
      return res.status(404).json({ message: "Inventory not found" });
    }
    res.status(200).json({ message: "Inventory deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
