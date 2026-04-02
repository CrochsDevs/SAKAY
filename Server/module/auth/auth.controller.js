import User from "../users/user.model.js";
import Auth from "./auth.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    const { fullName, email, phone, password } = req.body;
    try {
        const userExists = await User.getByEmail(email);
        if (userExists) return res.status(400).json({ message: "Email registered na pre!" });

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ fullName, email, phone }, hashedPassword);

        res.status(201).json({ message: "Account created successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.getByEmail(email);
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await Auth.compare(user._id, password);
        if (!isMatch) return res.status(401).json({ message: "Wrong password" });

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        });

        await Auth.updateLastLogin(user._id);

        // IMPORTANT: Make sure to include fullName in the response
        const userResponse = {
            _id: user._id,
            fullName: user.fullName, // This should exist
            email: user.email,
            phone: user.phone,
            role: user.role,
            location: user.location || 'Commuter' // Add location field if it exists
        };

        console.log('Login response user:', userResponse); // Debug log

        res.status(200).json({
            message: "Login successful!",
            user: userResponse
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: error.message });
    }
};

export const logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: "Logged out na!" });
};

export const getStatus = async (req, res) => {
    try {
        const user = await User.getById(req.user._id);

        if (!user) {
            return res.status(401).json({ isAuthenticated: false });
        }

        // IMPORTANT: Include all user data in the response
        const userResponse = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phone: user.phone,
            role: user.role,
            location: user.location || 'Commuter'
        };

        console.log('Status check user:', userResponse); // Debug log

        res.status(200).json({
            isAuthenticated: true,
            user: userResponse
        });
    } catch (error) {
        console.error('Status check error:', error);
        res.status(401).json({ isAuthenticated: false });
    }
};