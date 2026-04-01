import connectDB from "../../config/db.js";
import { ObjectId } from "mongodb";

class User {
    static #userColl = "users";
    static #authColl = "auth";

    static async create(userData, hashedPassword) {
        const db = await connectDB();

        const userProfile = {
            fullName: userData.fullName,
            email: userData.email.toLowerCase(),
            phone: userData.phone,
            role: userData.role || 'commuter',
            location: 'Commuter', // Default location
            createdAt: new Date(),
            lastLogin: null
        };

        const userResult = await db.collection(this.#userColl).insertOne(userProfile);
        const userId = userResult.insertedId;

        await db.collection(this.#authColl).insertOne({
            userId: userId,
            password: hashedPassword,
            updatedAt: new Date()
        });

        return userId;
    }

    static async getById(id) {
        const db = await connectDB();
        const user = await db.collection(this.#userColl).findOne({ _id: new ObjectId(id) });

        // Ensure user always has fullName and location
        if (user) {
            user.fullName = user.fullName || 'User';
            user.location = user.location || 'Commuter';
        }

        return user;
    }

    static async getByEmail(email) {
        const db = await connectDB();
        const user = await db.collection(this.#userColl).findOne({ email: email.toLowerCase() });

        // Ensure user always has fullName and location
        if (user) {
            user.fullName = user.fullName || 'User';
            user.location = user.location || 'Commuter';
        }

        return user;
    }

    static async updateLastLogin(id) {
        const db = await connectDB();
        return await db.collection(this.#userColl).updateOne(
            { _id: new ObjectId(id) },
            { $set: { lastLogin: new Date() } }
        );
    }

    // Optional: Add method to update user location
    static async updateLocation(id, location) {
        const db = await connectDB();
        return await db.collection(this.#userColl).updateOne(
            { _id: new ObjectId(id) },
            { $set: { location: location } }
        );
    }
}

export default User;