import express from "express";
import plantsController from "../controllers/plants.controller";

const router = express.Router();

router.get("/explore", plantsController.explore);

export default router;