const express = require("express");
const router = express.Router();

const authController = require("../controller/auth");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/user/:id", authController.getUserById);
router.get("/users", authController.getAllUsers);
router.post("/users/role", authController.getUserByRole);
router.put("/user/:id", authController.updateUser);
router.delete("/user/:id", authController.deleteUser);

module.exports = router;
