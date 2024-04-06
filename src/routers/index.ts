import express,{Router} from "express";
const expressRouter:Router = express.Router()

import authRouter from "./auth.routers";

expressRouter.use(authRouter)

export default expressRouter