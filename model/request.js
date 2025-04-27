// models/Request.js

const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  client: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  serviceProvider: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  fullName: { 
    type: String, 
    required: true 
  },
  phone: { 
    type: String, 
    required: true 
  },
  address: { 
    type: String, 
    required: true 
  },
  serviceRequested: { 
    type: String, 
    enum: [
      "Construction", "Plumbing", "Electrical Wiring", "Painting", "Carpentry",
      "Roofing", "Flooring", "Home Renovation", "Gardening", "Pest Control",
      "Air Conditioning", "Cleaning", "Furniture Assembly", "Smart Home Setup",
      "Wallpaper Installation", "Window Repair", "Gutter Cleaning",
      "Pool Maintenance", "Moving and Transport", "Home Security"
    ],
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  urgency: { 
    type: String, 
    enum: ["low", "medium", "high"], 
    default: "medium" 
  },
  availability: [{
    period: String,
    startTime: String,
    endTime: String
  }],
  preferredDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
}, {
  timestamps: true // createdAt, updatedAt auto
});

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
