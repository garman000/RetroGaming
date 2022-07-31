import express from "express";
import scoreController from "../controllers/scoreController.js";
import { userValidation } from "../middlewares/userValidation.js";

const router = express.Router();

router.post("/add", userValidation, scoreController.add);
router.get("/lastScore", userValidation, scoreController.getLastScore);
router.get("/highScore", userValidation, scoreController.getHighScore);

export default router;
