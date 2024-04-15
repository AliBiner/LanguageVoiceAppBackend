import { Request, Response } from "express";
import {
  authServiceLogin,
  authServiceRegister,
} from "../services/auth_service";
import CustomResponse from "../utils/responses";
import { HandlerResponse } from "@netlify/functions";

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

export async function me() {
  const result: HandlerResponse = {
    statusCode: 200,
    body: JSON.stringify({ msg: "test" }),
  };
  return result;
}
