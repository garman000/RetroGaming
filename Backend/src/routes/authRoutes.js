import express from "express";
import authController from "../controllers/authController.js";
import { signUpUserValidation } from "../middlewares/signUpUserValidation.js";
import { encryptPassword } from "../middlewares/encryptPassword.js";
import { inputValidation } from "../middlewares/inputValidation.js";
import { emailAndPasswordValidation } from "../middlewares/emailAndPasswordValidation.js";

const router = express.Router();

router.post(
  "/signup",
  signUpUserValidation,
  encryptPassword,
  authController.signup
);
router.post("/login", inputValidation, emailAndPasswordValidation, authController.login);

export default router;
