import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

const client = new MongoClient(uri);
let dbInstance = null;

const connectDB = async () => {
    if (dbInstance) return dbInstance;
    try {
        await client.connect();
        dbInstance = client.db(dbName);
        console.log(`✅ MongoDB Connected to: ${dbName}`);

        const usersCollection = dbInstance.collection("users");
        await usersCollection.createIndex({ email: 1 }, { unique: true });

        return dbInstance;
    } catch (error) {
        console.error("❌ Database Error:", error);
        process.exit(1);
    }
};

export default connectDB;