import "express-async-errors";
import express from "express";

const port = process.env.PORT || 8080 || 8081; // default port to listen
import routers from "./routers/index";
import dotenv from "dotenv";
dotenv.config();
import "./db/dbConnection";
import errorHandlerMiddleware from "./middlewares/errorhandler";
import cors from "cors";
import { connect } from "./db/postgreSqlConnection";
import cluster from "cluster";

import os from "os";

const numCPUs = os.availableParallelism();

if (cluster.isPrimary) {
  console.log(`Number of CPUs is ${numCPUs}`);
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < 5; i++) {
    cluster.fork();
  }

  cluster.on("disconnect", (worker: any, code: any, signal: any) => {
    console.log(`worker ${worker.process.pid} died`);
    console.log("Let's fork another worker!");
    cluster.fork();
  });
} else {
  const app = express();
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
    connect();
    console.log(`Server Started`);
  });
}

// const app = express();
// // Middleware
// app.use(express.json());
// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ extended: true }));

// app.use(cors());

// // Router
// app.use("/api", routers);

// // Error Handler
// app.use(errorHandlerMiddleware);
// // start the Express server
// app.listen(port, () => {
//   connect();
//   console.log(`Server Started`);
// });
