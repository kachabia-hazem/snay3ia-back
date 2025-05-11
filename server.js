const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config(); // Add this line to load .env variables

const app = express();
const PORT = 5000;
const User = require("./model/user");
const CategoryService = require("./services/categoryService"); // Corrected path: 'services' instead of 'service'

console.log("JWT_SECRET configured:", process.env.JWT_SECRET ? "Yes" : "No");

// Middleware CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow cookies if needed
  })
);

// Middleware BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connexion MongoDB
mongoose
  .connect("mongodb://localhost:27017/snay3iya", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("✅ Connected to MongoDB");
    // Seed the categories after connecting to MongoDB
    await CategoryService.seedCategories();
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Import des routes
const authRoutes = require("./routes/auth");
const serviceCategoriesRoutes = require("./routes/serviceCategories");
const userRoutes = require("./routes/userRoutes");
const requestRoutes = require("./routes/requestRoutes"); // Assuming you have a requestRoutes.js file
const reportRoutes = require("./routes/reportRoutes"); // Assuming you have a reportRoutes.js file

// Déclaration des routes
app.use("/api", authRoutes);
app.use("/api/service-categories", serviceCategoriesRoutes);
app.use("/api/users", userRoutes);
app.use("/api/requests", requestRoutes); // Assuming you have a requestRoutes.js file
app.use("/api/reports", reportRoutes); // Assuming you have a reportRoutes.js file

app.get("/api/test", (req, res) => {
  res.json({
    message: "API is working correctly",
    jwtConfigured: !!process.env.JWT_SECRET,
  });
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(
    `🔑 JWT_SECRET is ${
      process.env.JWT_SECRET ? "configured" : "NOT configured"
    }`
  );
  console.log(
    `📝 Reports endpoint available at: http://localhost:${PORT}/api/reports/report`
  );
});
