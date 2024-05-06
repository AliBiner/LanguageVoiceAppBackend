import { Request, Response } from "express";
import CustomResponse from "../utils/responses";

export async function login(
  request: Request,
  response: Response
): Promise<Response> {
  const authServiceLogin = (await import("../services/auth_service"))
    .authServiceLogin;
  const result = authServiceLogin(request, response);
  return result;
}

export async function register(
  request: Request,
  response: Response
): Promise<Response> {
  //import
  const authServiceRegister = (await import("../services/auth_service"))
    .authServiceRegister;
  const result = authServiceRegister(request, response);
  return result;
}
export async function me(request: Request, response: Response) {
  try {
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
    return new CustomResponse({
      message: "Me Load Test with One Thread",
    }).success(response);
  } catch (err) {
    console.log(err);
    return new CustomResponse({ message: err }).error_500(response);
  }
}
// async function createWorker() {
//   return new Promise<string>((resolve, reject) => {
//     const worker = new Worker(__dirname + "/meWorker.js");

//     worker.postMessage("Hello, World!!");

//     worker.on("message", (code) => {
//       resolve(code);
//     });
//     worker.on("error", (code) => {
//       reject(code);
//     });
//   });
// }

export async function emailExistController(
  req: Request,
  res: Response
): Promise<Response> {
  const emailExistService = (await import("../services/auth_service"))
    .emailExistService;
  const result = await emailExistService(req, res);

  return result;
}
