import { Request, Response } from "express";
import {
  authServiceLogin,
  authServiceRegister,
  emailExistService,
} from "../services/auth_service";
import CustomResponse from "../utils/responses";
import { isMainThread, Worker } from "worker_threads";
import cluster from "cluster";
import os from "os";
import process from "process";

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
// export function createOneThreadId(req: Request, res: Response) {
//   oneThreadPid = process.pid;
//   return new CustomResponse({
//     message: `Took Process Id: ${oneThreadPid}`,
//   }).success(res);
// }
export async function me(request: Request, response: Response) {
  try {
    if (isMainThread) {
    }
    return new CustomResponse({
      message: "Me Load Test with Cluster ",
    }).success(response);
  } catch (err) {
    console.log(err);
    return new CustomResponse({ message: err }).error_500(response);
  }
}
export async function meOneThread(request: Request, response: Response) {
  try {
    console.log(process.pid);

    const result = await createWorker();
    return new CustomResponse({
      message: "Me Load Test with One Thread",
    }).success(response);
  } catch (err) {
    console.log(err);
    return new CustomResponse({ message: err }).error_500(response);
  }
}
async function createWorker() {
  return new Promise<string>((resolve, reject) => {
    const worker = new Worker(__dirname + "/meWorker.js");

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

export function disconnectForks(req: Request, res: Response) {
  cluster.disconnect;

  return new CustomResponse({}).success(res);
}
