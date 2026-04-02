import connectDB from "../../config/db.js";
import { ObjectId } from "mongodb";

class FeedbackModel {
    static #collection = "feedbacks";

    // Create new feedback
    static async create(feedbackData) {
        const db = await connectDB();

        const newFeedback = {
            userId: new ObjectId(feedbackData.userId),
            userName: feedbackData.userName || 'Anonymous User',
            userEmail: feedbackData.userEmail,
            userLocation: feedbackData.userLocation || 'Commuter',
            rating: parseInt(feedbackData.rating),
            comment: feedbackData.comment,
            likes: 0,
            likedBy: [],
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const result = await db.collection(this.#collection).insertOne(newFeedback);
        return { ...newFeedback, _id: result.insertedId };
    }

    // Get all feedbacks (public)
    static async findAll() {
        const db = await connectDB();
        const feedbacks = await db.collection(this.#collection)
            .find()
            .sort({ createdAt: -1 })
            .toArray();

        // Ensure all feedbacks have userName
        return feedbacks.map(fb => ({
            ...fb,
            userName: fb.userName || 'Anonymous User',
            userLocation: fb.userLocation || 'Commuter'
        }));
    }

    // Get feedback by ID
    static async findById(id) {
        const db = await connectDB();
        const feedback = await db.collection(this.#collection).findOne({ _id: new ObjectId(id) });

        if (feedback) {
            feedback.userName = feedback.userName || 'Anonymous User';
            feedback.userLocation = feedback.userLocation || 'Commuter';
        }

        return feedback;
    }

    // Get feedbacks by user
    static async findByUserId(userId) {
        const db = await connectDB();
        const feedbacks = await db.collection(this.#collection)
            .find({ userId: new ObjectId(userId) })
            .sort({ createdAt: -1 })
            .toArray();

        return feedbacks.map(fb => ({
            ...fb,
            userName: fb.userName || 'Anonymous User',
            userLocation: fb.userLocation || 'Commuter'
        }));
    }

    // Like a feedback
    static async likeFeedback(feedbackId, userId) {
        const db = await connectDB();

        // Check if user already liked
        const feedback = await this.findById(feedbackId);
        if (!feedback) {
            return { error: "Feedback not found" };
        }

        if (feedback.likedBy && feedback.likedBy.includes(userId)) {
            return { message: "Already liked" };
        }

        const result = await db.collection(this.#collection).updateOne(
            { _id: new ObjectId(feedbackId) },
            {
                $inc: { likes: 1 },
                $push: { likedBy: userId },
                $set: { updatedAt: new Date() }
            }
        );

        return result;
    }

    // Unlike a feedback
    static async unlikeFeedback(feedbackId, userId) {
        const db = await connectDB();

        const result = await db.collection(this.#collection).updateOne(
            { _id: new ObjectId(feedbackId) },
            {
                $inc: { likes: -1 },
                $pull: { likedBy: userId },
                $set: { updatedAt: new Date() }
            }
        );

        return result;
    }

    // Delete feedback
    static async deleteById(id, userId) {
        const db = await connectDB();
        return await db.collection(this.#collection).deleteOne({
            _id: new ObjectId(id),
            userId: new ObjectId(userId)
        });
    }

    // Get statistics
    static async getStats() {
        const db = await connectDB();
        const feedbacks = await this.findAll();

        const totalFeedbacks = feedbacks.length;
        const averageRating = totalFeedbacks > 0
            ? (feedbacks.reduce((acc, curr) => acc + curr.rating, 0) / totalFeedbacks).toFixed(1)
            : 0;
        const satisfiedCount = feedbacks.filter(f => f.rating >= 4).length;
        const satisfiedPercentage = totalFeedbacks > 0
            ? Math.round((satisfiedCount / totalFeedbacks) * 100)
            : 0;

        return {
            totalFeedbacks,
            averageRating,
            satisfiedPercentage,
            totalLikes: feedbacks.reduce((acc, curr) => acc + (curr.likes || 0), 0)
        };
    }
}

export default FeedbackModel;