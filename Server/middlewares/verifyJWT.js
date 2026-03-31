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
        
        req.user = { _id: decoded._id };
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token." });
    }
};