import express from "express";
import usersController from "../controllers/users.controller";

const router = express.Router();

router.get("/", usersController.getAll.bind(usersController));

export default router;