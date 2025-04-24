const CategoryService = require('../services/categoryService');

const getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryService.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCategories,
};