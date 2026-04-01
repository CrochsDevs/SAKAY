import jwt from "jsonwebtoken";
import User from "../module/users/user.model.js";

export const verifyJWT = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.getById(decoded._id);

        if (!user) {
            return res.status(401).json({ message: "Invalid token. User not found." });
        }

        // IMPORTANT: Include ALL user data needed for feedback
        req.user = {
            _id: user._id,
            fullName: user.fullName, // Make sure this field exists
            email: user.email,
            location: user.location || 'Commuter'
        };

        console.log('VerifyJWT user:', req.user); // Debug log

        next();
    } catch (error) {
        console.error('JWT verification error:', error);
        return res.status(401).json({ message: "Invalid token." });
    }
};