import express, { Router } from "express";
const authRouter: Router = express.Router();
import AuthValidation from "../middlewares/validations/auth_validation";
import {
  disconnectForks,
  emailExistController,
  login,
  me,
  register,
} from "../controllers/auth_controller";
import { tokenCheck } from "../middlewares/token/auth";

authRouter.post("/login", AuthValidation.login, login);
authRouter.post("/register", AuthValidation.register, register);
authRouter.get("/me", tokenCheck, me);
authRouter.post(
  "/email-exists",
  AuthValidation.email_exist,
  emailExistController
);
authRouter.get("/me-one-thread", tokenCheck, me);
authRouter.get("/disconnect-forks", disconnectForks);
export default authRouter;
