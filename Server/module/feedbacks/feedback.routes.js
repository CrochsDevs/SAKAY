// server/module/feedbacks/feedback.routes.js
import { Router } from "express";
import { verifyJWT, requireAdmin } from "../../middlewares/verifyJWT.js";
import {
    getAllFeedbacks,
    getAllFeedbacksForAdmin,
    getPendingFeedbacks,
    getFeedbackById,
    getUserFeedbacks,
    createFeedback,
    approveFeedback,
    likeFeedback,
    unlikeFeedback,
    deleteFeedback,
    getFeedbackStats
} from "./feedback.controller.js";

const router = Router();

// PUBLIC ROUTES (no auth needed) - Only shows approved feedbacks
router.get("/", getAllFeedbacks);
router.get("/stats", getFeedbackStats);
router.get("/:id", getFeedbackById);

// PROTECTED ROUTES (need auth)
router.get("/user/my", verifyJWT, getUserFeedbacks);
router.post("/", verifyJWT, createFeedback);
router.post("/:id/like", verifyJWT, likeFeedback);
router.delete("/:id/like", verifyJWT, unlikeFeedback);
router.delete("/:id", verifyJWT, deleteFeedback);

// ADMIN ONLY ROUTES
router.get("/admin/all", verifyJWT, requireAdmin, getAllFeedbacksForAdmin);
router.get("/admin/pending", verifyJWT, requireAdmin, getPendingFeedbacks);
router.put("/admin/:id/approve", verifyJWT, requireAdmin, approveFeedback);

export default router;