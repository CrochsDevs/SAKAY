import FeedbackModel from "./feedback.model.js";
import { ObjectId } from "mongodb";

// Get all feedbacks (PUBLIC - no auth needed)
export const getAllFeedbacks = async (req, res) => {
    try {
        const feedbacks = await FeedbackModel.findAll();
        
        // Ensure each feedback has userName and userLocation
        const formattedFeedbacks = feedbacks.map(feedback => ({
            ...feedback,
            userName: feedback.userName || 'Anonymous User',
            userLocation: feedback.userLocation || 'Commuter'
        }));
        
        res.status(200).json(formattedFeedbacks);
    } catch (error) {
        console.error('Error fetching feedbacks:', error);
        res.status(500).json({ message: "Server error: " + error.message });
    }
};

// Get feedback by ID
export const getFeedbackById = async (req, res) => {
    try {
        const { id } = req.params;
        const feedback = await FeedbackModel.findById(id);
        
        if (!feedback) {
            return res.status(404).json({ message: "Feedback not found" });
        }
        
        res.status(200).json({
            ...feedback,
            userName: feedback.userName || 'Anonymous User',
            userLocation: feedback.userLocation || 'Commuter'
        });
    } catch (error) {
        console.error('Error fetching feedback by ID:', error);
        res.status(500).json({ message: "Server error: " + error.message });
    }
};

// Get user's own feedbacks (PROTECTED)
export const getUserFeedbacks = async (req, res) => {
    try {
        const userId = req.user._id;
        const feedbacks = await FeedbackModel.findByUserId(userId);
        
        const formattedFeedbacks = feedbacks.map(feedback => ({
            ...feedback,
            userName: feedback.userName || req.user.fullName || 'Anonymous User',
            userLocation: feedback.userLocation || req.user.location || 'Commuter'
        }));
        
        res.status(200).json(formattedFeedbacks);
    } catch (error) {
        console.error('Error fetching user feedbacks:', error);
        res.status(500).json({ message: "Server error: " + error.message });
    }
};

// Create new feedback (PROTECTED - requires auth)
export const createFeedback = async (req, res) => {
    try {
        const { rating, comment, userLocation } = req.body;
        const user = req.user;
        
        console.log('Creating feedback for user:', user); // Debug log
        
        // Validate rating
        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 1 and 5" });
        }
        
        // Validate comment
        if (!comment || comment.trim().length < 5) {
            return res.status(400).json({ message: "Comment must be at least 5 characters" });
        }
        
        // Get user's full name (try multiple possible field names)
        const userName = user.fullName || user.name || user.username || 'Anonymous User';
        
        const feedbackData = {
            userId: user._id,
            userName: userName,
            userEmail: user.email,
            userLocation: userLocation || user.location || 'Commuter',
            rating: parseInt(rating),
            comment: comment.trim()
        };
        
        console.log('Feedback data to save:', feedbackData); // Debug log
        
        const newFeedback = await FeedbackModel.create(feedbackData);
        
        res.status(201).json({ 
            message: "Feedback submitted successfully",
            feedback: newFeedback
        });
    } catch (error) {
        console.error('Error creating feedback:', error);
        res.status(500).json({ message: "Server error: " + error.message });
    }
};

// Like a feedback (PROTECTED)
export const likeFeedback = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id.toString();
        
        const result = await FeedbackModel.likeFeedback(id, userId);
        
        if (result.error) {
            return res.status(404).json({ message: result.error });
        }
        
        if (result.message === "Already liked") {
            return res.status(400).json({ message: "You already liked this feedback" });
        }
        
        res.status(200).json({ message: "Feedback liked successfully" });
    } catch (error) {
        console.error('Error liking feedback:', error);
        res.status(500).json({ message: "Server error: " + error.message });
    }
};

// Unlike a feedback (PROTECTED)
export const unlikeFeedback = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id.toString();
        
        const result = await FeedbackModel.unlikeFeedback(id, userId);
        res.status(200).json({ message: "Feedback unliked successfully" });
    } catch (error) {
        console.error('Error unliking feedback:', error);
        res.status(500).json({ message: "Server error: " + error.message });
    }
};

// Delete feedback (PROTECTED - only owner)
export const deleteFeedback = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        
        const result = await FeedbackModel.deleteById(id, userId);
        
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Feedback not found or you don't have permission" });
        }
        
        res.status(200).json({ message: "Feedback deleted successfully" });
    } catch (error) {
        console.error('Error deleting feedback:', error);
        res.status(500).json({ message: "Server error: " + error.message });
    }
};

// Get feedback statistics (PUBLIC)
export const getFeedbackStats = async (req, res) => {
    try {
        const stats = await FeedbackModel.getStats();
        res.status(200).json(stats);
    } catch (error) {
        console.error('Error fetching feedback stats:', error);
        res.status(500).json({ message: "Server error: " + error.message });
    }
};