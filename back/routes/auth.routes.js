import express from "express";
import authRouter from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/register", authRouter.register);
router.post("/login", authRouter.login);
router.get("/logout", authRouter.logout);

export default router;
