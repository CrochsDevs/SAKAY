// server/module/users/user.controller.js
import User from "./user.model.js";
import Roles from "../../constant/roles.js";

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.getById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};

// ========== ADMIN CONTROLLERS ==========

// Get all users (admin only)
export const getAllUsers = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== Roles.ADMIN) {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }
    
    const users = await User.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};

// Update user role (admin only)
export const updateUserRole = async (req, res) => {
  try {
    const { userId, role } = req.body;
    
    // Check if user is admin
    if (req.user.role !== Roles.ADMIN) {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }
    
    // Check if role is valid
    if (role !== Roles.ADMIN && role !== Roles.COMMUTER) {
      return res.status(400).json({ message: "Invalid role" });
    }
    
    // Cannot change your own role
    if (userId === req.user._id.toString()) {
      return res.status(400).json({ message: "Cannot change your own role" });
    }
    
    const result = await User.updateRole(userId, role);
    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json({ message: "User role updated successfully" });
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};

// Delete user (admin only)
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if user is admin
    if (req.user.role !== Roles.ADMIN) {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }
    
    // Cannot delete yourself
    if (id === req.user._id.toString()) {
      return res.status(400).json({ message: "Cannot delete your own account" });
    }
    
    const result = await User.deleteById(id);
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};