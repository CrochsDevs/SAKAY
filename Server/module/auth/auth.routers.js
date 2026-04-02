// server/module/auth/auth.routers.js
import { Router } from "express";
import { login, signup, logout, getStatus } from "./auth.controller.js";
import { verifyJWT } from "../../middlewares/verifyJWT.js";

const router = Router();

router.post("/sign-up", signup);
router.post("/log-in", login);

router.post("/logout", verifyJWT, logout);
router.get("/status", verifyJWT, getStatus);

export default router;