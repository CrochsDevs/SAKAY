import bcrypt from "bcrypt";
import connectDB from "../config/db.js";
import User from "../module/users/user.model.js";
import Roles from "../constant/roles.js";

const createAdmin = async () => {
    try {
        console.log("Connecting to database...");
        const db = await connectDB();
        
        const adminEmail = "admin@gmail.com";
        const adminPassword = "SakayAdmin@2026!";
        
        const usersColl = db.collection("users");
        const authColl = db.collection("auth");
        
        const existingUser = await usersColl.findOne({ email: adminEmail.toLowerCase() });
        
        if (existingUser) {
            console.log("Admin user already exists in users collection, updating...");
            
            // Ensure role is ADMIN
            await usersColl.updateOne(
                { _id: existingUser._id },
                { $set: { role: Roles.ADMIN } }
            );
            console.log("User role set to ADMIN");
            
            // Always update the password
            const hashedPassword = await bcrypt.hash(adminPassword, 10);
            await authColl.updateOne(
                { userId: existingUser._id },
                { $set: { password: hashedPassword } },
                { upsert: true }
            );
            console.log("Admin password updated");
        } else {
            // Create fresh admin user
            console.log("Creating new admin user...");
            const hashedPassword = await bcrypt.hash(adminPassword, 10);
            const adminData = {
                fullName: "Super Admin",
                email: adminEmail,
                phone: "09123456789",
                role: Roles.ADMIN,
                location: "Admin Office"
            };
            await User.create(adminData, hashedPassword);
            console.log("Admin user created");
        }
        
        console.log("Admin setup complete!");
        process.exit(0);
        
    } catch (error) {
        console.error("Error:", error.message);
        
        if (error.code === 'ECONNREFUSED') {
            console.error("Tip: Make sure MongoDB is running!");
        }
        process.exit(1);
    }
};

createAdmin();
