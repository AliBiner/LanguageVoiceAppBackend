import { Request, Response } from "express";
import {
  authServiceLogin,
  authServiceRegister,
} from "../services/auth_service";
import CustomResponse from "../utils/responses";

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

export async function me(req: Request, res: Response): Promise<Response> {
  return new CustomResponse({ data: req.body }).success(res);
}
