const Category = require('../model/category');

const getAllCategories = async () => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    return categories;
  } catch (error) {
    throw new Error('Error fetching categories: ' + error.message);
  }
};

const seedCategories = async () => {
  const defaultCategories = [
    "Construction",
    "Plumbing",
    "Electrical Wiring",
    "Painting",
    "Carpentry",
    "Roofing",
    "Flooring",
    "Home Renovation",
    "Gardening",
    "Pest Control",
    "Air Conditioning",
    "Cleaning",
    "Furniture Assembly",
    "Smart Home Setup",
    "Wallpaper Installation",
    "Window Repair",
    "Gutter Cleaning",
    "Pool Maintenance",
    "Moving and Transport",
    "Home Security",
  ];

  try {
    // Force reseed by deleting existing categories
    await Category.deleteMany({});
    const categoryDocs = defaultCategories.map(name => ({
      name,
      articleCount: 0,
    }));
    await Category.insertMany(categoryDocs);
    console.log('Categories seeded successfully');
  } catch (error) {
    console.error('Error seeding categories:', error.message);
    throw error;
  }
};

module.exports = {
  getAllCategories,
  seedCategories,
};