const User = require("../models/User");

// Créer un utilisateur
const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

// Récupérer tous les utilisateurs
const getAllUsers = async () => {
  return await User.find();
};

// Récupérer un utilisateur par ID
const getUserById = async (id) => {
  return await User.findById(id);
};

// Mettre à jour un utilisateur
const updateUser = async (id, updateData) => {
  return await User.findByIdAndUpdate(id, updateData, { new: true });
};

// Supprimer un utilisateur
const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
