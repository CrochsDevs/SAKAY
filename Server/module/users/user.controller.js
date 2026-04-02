import User from "./user.model.js";

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