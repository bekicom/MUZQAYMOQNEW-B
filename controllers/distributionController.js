const Distribution = require("../models/distributionModel");
const ProductType = require("../models/productTypeModel");

exports.createDistribution = async (req, res) => {
  try {
    const { agent, storeName, product, boxCount, partialPaymentUnits } =
      req.body;

    // Mahsulotni topish
    const productType = await ProductType.findById(product);
    if (!productType) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Donalar sonini hisoblash
    const totalUnits =
      productType.type === "karobkali"
        ? boxCount * productType.unitsPerBox
        : boxCount;

    // Nasiyaga qolgan donalarni hisoblash
    const remainingDebtUnits = totalUnits - (partialPaymentUnits || totalUnits);

    const newDistribution = new Distribution({
      agent,
      storeName,
      product,
      boxCount,
      totalUnits,
      partialPaymentUnits: partialPaymentUnits || 0,
      remainingDebtUnits,
    });

    await newDistribution.save();
    res.status(201).json(newDistribution);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllDistributions = async (req, res) => {
  try {
    const distributions = await Distribution.find()
      .populate("agent")
      .populate("product");
    res.status(200).json(distributions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateDistribution = async (req, res) => {
  try {
    const { partialPaymentUnits } = req.body;

    const distribution = await Distribution.findById(req.params.id);
    if (!distribution) {
      return res.status(404).json({ message: "Distribution not found" });
    }

    // Qolgan qarzni hisoblash
    const remainingDebtUnits =
      distribution.totalUnits -
      (partialPaymentUnits || distribution.partialPaymentUnits);

    distribution.partialPaymentUnits =
      partialPaymentUnits || distribution.partialPaymentUnits;
    distribution.remainingDebtUnits = remainingDebtUnits;

    await distribution.save();
    res.status(200).json(distribution);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteDistribution = async (req, res) => {
  try {
    const distribution = await Distribution.findByIdAndDelete(req.params.id);
    if (!distribution) {
      return res.status(404).json({ message: "Distribution not found" });
    }
    res.status(200).json({ message: "Distribution deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
