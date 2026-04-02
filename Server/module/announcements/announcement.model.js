// server/module/announcements/announcement.model.js
import connectDB from "../../config/db.js";
import { ObjectId } from "mongodb";

class AnnouncementModel {
    static #collection = "announcements";

    static async create(announcementData) {
        const db = await connectDB();
        const newAnnouncement = {
            title: announcementData.title,
            content: announcementData.content,
            priority: announcementData.priority || 'normal',
            authorId: new ObjectId(announcementData.authorId),
            authorName: announcementData.authorName,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        const result = await db.collection(this.#collection).insertOne(newAnnouncement);
        return { ...newAnnouncement, _id: result.insertedId };
    }

    static async findAll() {
        const db = await connectDB();
        return await db.collection(this.#collection)
            .find({ isActive: true })
            .sort({ priority: -1, createdAt: -1 })
            .toArray();
    }

    static async findById(id) {
        const db = await connectDB();
        return await db.collection(this.#collection).findOne({ _id: new ObjectId(id) });
    }

    static async updateById(id, updateData) {
        const db = await connectDB();
        return await db.collection(this.#collection).updateOne(
            { _id: new ObjectId(id) },
            { $set: { ...updateData, updatedAt: new Date() } }
        );
    }

    static async deleteById(id) {
        const db = await connectDB();
        return await db.collection(this.#collection).deleteOne({ _id: new ObjectId(id) });
    }
}

export default AnnouncementModel;