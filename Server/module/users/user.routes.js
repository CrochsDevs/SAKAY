// server/module/users/user.routes.js
import { Router } from "express";
import { getUserProfile, getAllUsers, updateUserRole, deleteUser } from "./user.controller.js";
import { verifyJWT, requireAdmin } from "../../middlewares/verifyJWT.js";

const router = Router();

// User profile route (authenticated users only)
router.get("/profile", verifyJWT, getUserProfile);

// ========== ADMIN ROUTES ==========
// All admin routes require admin privileges
router.get("/all", verifyJWT, requireAdmin, getAllUsers);
router.put("/role", verifyJWT, requireAdmin, updateUserRole);
router.delete("/:id", verifyJWT, requireAdmin, deleteUser);

export default router;