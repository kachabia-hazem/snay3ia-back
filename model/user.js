const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["client", "service_provider"], required: true },
  servicesCategory: {
    type: String,
    enum: [
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
    ],
    required: function () {
      return this.role === "service_provider";
    },
  },
  experience: {
    type: Number,
    required: function () {
      return this.role === "service_provider";
    },
  },
  location: {
    type: String,
    required: function () {
      return this.role === "service_provider";
    },
  },
  bio: {
    type: String,
    required: function () {
      return this.role === "service_provider";
    },
  },
  availability: {
    type: Boolean,
    required: function () {
      return this.role === "service_provider";
    },
    default: true,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
