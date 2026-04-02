import { Router } from "express";
import { verifyJWT } from "../../middlewares/verifyJWT.js";
import {
    getAllFeedbacks,
    getFeedbackById,
    getUserFeedbacks,
    createFeedback,
    likeFeedback,
    unlikeFeedback,
    deleteFeedback,
    getFeedbackStats
} from "./feedback.controller.js";

const router = Router();

// PUBLIC ROUTES (no auth needed)
router.get("/", getAllFeedbacks);
router.get("/stats", getFeedbackStats);
router.get("/:id", getFeedbackById);

// PROTECTED ROUTES (need auth)
router.get("/user/my", verifyJWT, getUserFeedbacks);
router.post("/", verifyJWT, createFeedback);
router.post("/:id/like", verifyJWT, likeFeedback);
router.delete("/:id/like", verifyJWT, unlikeFeedback);
router.delete("/:id", verifyJWT, deleteFeedback);

export default router;