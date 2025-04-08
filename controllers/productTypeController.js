const ProductType = require("../models/productTypeModel");

exports.createProductType = async (req, res) => {
  try {
    const newProductType = new ProductType(req.body);
    await newProductType.save();
    res.status(201).json(newProductType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllProductTypes = async (req, res) => {
  try {
    const productTypes = await ProductType.find();
    res.status(200).json(productTypes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductTypeById = async (req, res) => {
  try {
    const productType = await ProductType.findById(req.params.id);
    if (!productType) {
      return res.status(404).json({ message: "Product type not found" });
    }
    res.status(200).json(productType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
