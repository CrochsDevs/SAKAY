import { Router } from "express";
import { getUserProfile } from "./user.controller.js";
import { verifyJWT } from "../../middlewares/verifyJWT.js";

const router = Router();

router.get("/profile", verifyJWT, getUserProfile);

export default router;