import APIError from "../utils/errors";
import express, { Request, Response } from "express";

const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: any
) => {
  if (err instanceof APIError) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  } else {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export default errorHandlerMiddleware;
