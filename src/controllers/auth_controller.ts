import { Request, Response } from "express";
import {
  authServiceLogin,
  authServiceRegister,
} from "../services/auth_service";
import CustomResponse from "../utils/responses";
import { HandlerResponse } from "@netlify/functions";
import client from "../db/postgreSqlConnection";
import { error } from "console";

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
    const result = await client.query("select * from users");
    console.log(result.rows);
    return new CustomResponse({ data: result.rows }).success(response);
  } catch (err) {
    return new CustomResponse({ message: err }).error_500(response);
  }
}
