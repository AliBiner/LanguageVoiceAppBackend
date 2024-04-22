import { Request, Response } from "express";
import {
  authServiceLogin,
  authServiceRegister,
  emailExistService,
} from "../services/auth_service";
import CustomResponse from "../utils/responses";
import client from "../db/postgreSqlConnection";

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
    return new CustomResponse({}).success(response);
  } catch (err) {
    return new CustomResponse({ message: err }).error_500(response);
  }
}

export async function emailExistController(
  req: Request,
  res: Response
): Promise<Response> {
  const result = await emailExistService(req, res);
  return result;
}
