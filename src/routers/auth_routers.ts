import express, { Router } from "express";
import AuthValidation from "../middlewares/validations/auth_validation";
import {
  emailExistController,
  login,
  me,
  register,
} from "../controllers/auth_controller";
import { tokenCheck } from "../middlewares/token/auth";
const authRouter: Router = express.Router();

authRouter.post("/login", AuthValidation.login, login);
authRouter.post("/register", AuthValidation.register, register);
authRouter.get("/me", tokenCheck, me);
authRouter.post(
  "/email-exists",
  AuthValidation.email_exist,
  emailExistController
);
authRouter.get("/me-one-thread", tokenCheck, me);
export default authRouter;
