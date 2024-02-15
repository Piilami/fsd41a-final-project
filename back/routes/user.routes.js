import express from "express";
import userController from "../controllers/user.controller.js";

const router = express.Router();

router.get("/:id", userController.getOneUser);
router.patch("/:id", userController.updateOneUser);
router.delete("/:id", userController.deleteOneUser);

export default router;
