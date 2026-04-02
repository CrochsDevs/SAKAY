// server/module/announcements/announcement.routes.js
import { Router } from "express";
import { verifyJWT, requireAdmin } from "../../middlewares/verifyJWT.js";
import {
    getAllAnnouncements,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement
} from "./announcement.controller.js";

const router = Router();

// Public routes
router.get("/", getAllAnnouncements);

// Admin only routes
router.post("/", verifyJWT, requireAdmin, createAnnouncement);
router.put("/:id", verifyJWT, requireAdmin, updateAnnouncement);
router.delete("/:id", verifyJWT, requireAdmin, deleteAnnouncement);

export default router;