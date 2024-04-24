import { Request, Response } from "express";
import {
  authServiceLogin,
  authServiceRegister,
  emailExistService,
} from "../services/auth_service";
import CustomResponse from "../utils/responses";
import client from "../db/postgreSqlConnection";
import { isMainThread, Worker } from "worker_threads";
import { resolve } from "path";
import { rejects } from "assert";

export async function login(
  request: Request,
  response: Response
): Promise<Response> {
  const result = authServiceLogin(request, response);
  return result;
}

export async function register(
  request: Request,
  response: Response
): Promise<Response> {
  const result = authServiceRegister(request, response);
  return result;
}

export async function me(request: Request, response: Response) {
  try {
    if (isMainThread) {
      // const workerPromises = [];
      // workerPromises.push(createWorker());

      const pass = await Promise.resolve(createWorker());
      return new CustomResponse({ message: pass }).success(response);
    }
  } catch (err) {
    console.log(err);
    return new CustomResponse({ message: err }).error_500(response);
  }
}
function createWorker() {
  return new Promise<string>((resolve, reject) => {
    const worker = new Worker("../threads/meWorker.js");

    worker.postMessage("Hello, World!!");

    worker.on("message", (code) => {
      resolve(code);
    });
    worker.on("error", (code) => {
      reject(code);
    });
  });
}

export async function emailExistController(
  req: Request,
  res: Response
): Promise<Response> {
  const result = await emailExistService(req, res);
  return result;
}
