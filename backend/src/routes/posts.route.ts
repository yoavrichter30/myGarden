import express from "express";
import {PostsController} from "../controllers/posts.controller";

const router = express.Router();
const postsController = new PostsController();


router.get("/", postsController.getAll.bind(postsController));
router.post("/create", postsController.create.bind(postsController));
router.get("/byUser/:username", postsController.postsByUser.bind(postsController));
router.put("/:id", postsController.updatePostById.bind(postsController));

export default router;