import express, { Router } from "express";
const expressRouter: Router = express.Router();

import authRouter from "./auth_routers";

expressRouter.use(authRouter);

export default expressRouter;
