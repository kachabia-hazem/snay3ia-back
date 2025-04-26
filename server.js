const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = 5000;
const User = require("./model/user");
const CategoryService = require("./services/categoryService"); // Corrected path: 'services' instead of 'service'

// Middleware CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
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
    useNewUrlParser: true,
    useUnifiedTopology: true,
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

// Déclaration des routes
app.use("/api", authRoutes);
app.use("/api/service-categories", serviceCategoriesRoutes);
app.use("/api/users", userRoutes);

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
