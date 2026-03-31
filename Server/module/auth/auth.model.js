import connectDB from "../../config/db.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import User from "../users/user.model.js";

class Auth {
    static #collection = "auth";

    static async compare(userId, password) {
        if (!userId || !password) {
            throw new Error("User ID and Password are required");
        }

        const db = await connectDB();
        const authData = await db.collection(this.#collection).findOne({
            userId: new ObjectId(userId)
        });

        if (!authData) return false;
        const isMatch = await bcrypt.compare(password, authData.password);
        return isMatch;
    }

    static async change(userId, newHashedPassword) {
        const db = await connectDB();
        const result = await db.collection(this.#collection).updateOne(
            { userId: new ObjectId(userId) },
            {
                $set: {
                    password: newHashedPassword,
                    updatedAt: new Date()
                }
            },
            { upsert: true }
        );
        return result;
    }

    static async updateLastLogin(userId) {
        return await User.updateLastLogin(userId);
    }
}

export default Auth;