const User = require("../model/user");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      role,
      servicesCategory,
      experience,
      location,
      bio,
      availability,
    } = req.body;

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bycrypt.hash(password, 10);

    // Prepare user data based on role
    const userData = {
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      role,
    };

    if (role === "service_provider") {
      userData.servicesCategory = servicesCategory;
      userData.experience = experience;
      userData.location = location;
      userData.bio = bio;
      userData.availability = availability;
    }

    const user = new User(userData);
    const savedUser = await user.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: savedUser._id });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const user = await User.findOne({ phone: phone });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.ban) {
      return res.status(401).json({ message: "User is banned" });
    }

    const match = await bycrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign(
      { phone: user.phone, role: user.role },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "15m" }
    );

    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + 15);

    res.status(200).json({
      message: "Login successful",
      token: token,
      expiresAt: expirationDate,
      role: user.role,
      userId: user._id,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

const getUserById = async (req, res) => {
  const uid = req.params.id;
  try {
    await User.findById(uid).then(async (u) => {
      if (u) {
        res.status(200).json(u);
      } else {
        res.status(404).json({ msg: "User not Found" });
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllUsers = async (req, res) => {
  try {
    await User.find().then((users) => {
      res.status(200).json(users);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUserByRole = async (req, res) => {
  const role = req.body.role;
  try {
    await User.find({ role: role }).then((users) => {
      res.status(200).json(users);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateUser = async (req, res) => {
  const uid = req.params.id;
  try {
    await User.findByIdAndUpdate(uid, req.body).then(async (u) => {
      if (u) {
        res.status(200).json({ msg: "User updated successfully" });
      } else {
        res.status(404).json({ msg: "User not Found" });
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteUser = async (req, res) => {
  const uid = req.params.id;
  try {
    await User.findByIdAndDelete(uid).then(async (u) => {
      if (u) {
        res.status(200).json({ msg: "User deleted successfully" });
      } else {
        res.status(404).json({ msg: "User not Found" });
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const authV = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token, authorization denied",
      });
    }

    const token = authHeader.replace("Bearer ", "");

    // Verify the token
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by phone
    const user = await User.findOne({ phone: decoded.phone });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // Add user to request object
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Token is not valid",
      error: error.message, // Include the error message for debugging
    });
  }
};

module.exports = {
  register,
  login,
  getUserById,
  getAllUsers,
  getUserByRole,
  updateUser,
  deleteUser,
  authV,
};
