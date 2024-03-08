import express from "express";
import postsController from "../controllers/posts.controller";

const router = express.Router();

router.get("/posts", postsController.getAll);

export default router;