import express from "express";
import postsController from "../controllers/posts.controller.js";

const router = express.Router();

router.get("/", postsController.readPosts);
router.post("/post", postsController.createPosts);
router.get("/:id", postsController.getOnePost);
router.patch("/:id", postsController.updatePosts);
router.delete("/:id", postsController.deletePost);
router.post("/:id/votes", postsController.votes);
router.post("/:id/comment", postsController.commentPost);

export default router;
