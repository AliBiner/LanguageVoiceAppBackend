import { Handler } from "express";
import app from "../src/app";
const handler: Handler = async (event, context) => {
  return app(event, context);
};

export default handler;
