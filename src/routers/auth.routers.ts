import express,{Router} from "express";
const authRouter:Router = express.Router()
import AuthValidation from "../middlewares/validations/auth.validation";
import {login,me,register} from "../controllers/auth.controller";
import { tokenCheck } from "../middlewares/token/auth";

authRouter.post("/login",AuthValidation.login,login);
authRouter.post("/register",AuthValidation.register,register);
authRouter.get("/me",tokenCheck,me);
export default authRouter