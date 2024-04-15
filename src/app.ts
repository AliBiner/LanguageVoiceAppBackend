import "express-async-errors";
import express from "express";
const app = express();
const port = 8080; // default port to listen
import routers from "./routers/index";
import dotenv from "dotenv";
dotenv.config();
import "./db/dbConnection";
import errorHandlerMiddleware from "./middlewares/errorhandler";
import cors from "cors";

// Middleware
app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// Router
app.use("/api", routers);

// Error Handler
app.use(errorHandlerMiddleware);

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://192.168.1.126:${port}`);
});

export default app;
