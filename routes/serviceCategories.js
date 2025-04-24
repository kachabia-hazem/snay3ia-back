const express = require("express");
const router = express.Router();

// Liste des catégories de services
const serviceCategories = [
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

// Route pour récupérer la liste des catégories
router.get("/", (req, res) => {
  res.json(serviceCategories);
});

module.exports = router;
