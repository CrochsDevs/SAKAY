// server/admin/createAdmin.js
import bcrypt from "bcrypt";
import connectDB from "../config/db.js";
import User from "../module/users/user.model.js";
import Roles from "../constant/roles.js";

const createAdmin = async () => {
    try {
        console.log("🔄 Connecting to database...");
        await connectDB();
        console.log("✅ Connected to database");
        
        const adminEmail = "admin@gmail.com";
        const adminPassword = "SakayAdmin@2026!";
        const existingAdmin = await User.getByEmail(adminEmail);
        
        if (existingAdmin) {
            console.log("Admin user already exists!");
            process.exit(0);
        }
        
        // Hash password
        console.log("🔐 Hashing password...");
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        
        // Create admin user data
        const adminData = {
            fullName: "Super Admin",
            email: adminEmail,
            phone: "09123456789",
            role: Roles.ADMIN,
            location: "Admin Office"
        };
        
        // Create admin user
        console.log("📝 Creating admin user...");
        await User.create(adminData, hashedPassword);
        
        process.exit(0);
        
    } catch (error) {
        console.error("📝 Error message:", error.message);
        
        // Check for specific errors
        if (error.code === 'ECONNREFUSED') {
            console.error("💡 Tip: Make sure MongoDB is running!");
        } else if (error.message.includes('validation')) {
            console.error("💡 Tip: Check if all required fields are provided!");
        }
        process.exit(1);
    }
};

// Run the function
createAdmin();