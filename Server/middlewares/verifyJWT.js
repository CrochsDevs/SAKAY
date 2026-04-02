// server/middlewares/verifyJWT.js
import jwt from "jsonwebtoken";
import User from "../module/users/user.model.js";
import Roles from "../constant/roles.js";

export const verifyJWT = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        req.user = null;
        return next();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.getById(decoded._id);

        if (!user) {
            req.user = null;
            return next();
        }

        // IMPORTANT: Make sure role is properly set
        req.user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            location: user.location || 'Commuter',
            role: user.role || Roles.COMMUTER
        };

        console.log('✅ verifyJWT - User authenticated:', req.user.email, 'Role:', req.user.role);

        next();
    } catch (error) {
        console.error('JWT verification error:', error.message);
        req.user = null;
        next();
    }
};

export const requireAdmin = (req, res, next) => {
    console.log('🔒 requireAdmin - Checking user:', req.user?.email, 'Role:', req.user?.role);
    
    if (!req.user) {
        return res.status(401).json({ 
            message: "Authentication required. Please login first." 
        });
    }
    
    if (req.user.role !== Roles.ADMIN) {
        return res.status(403).json({ 
            message: "Access denied. Admin privileges required. Your role: " + req.user.role 
        });
    }
    
    console.log('✅ Admin access granted for:', req.user.email);
    next();
};