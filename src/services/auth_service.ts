import { Request, Response } from "express";
import CustomResponse from "../utils/responses";
import { createToken } from "../middlewares/token/auth";
import client from "../db/postgreSqlConnection";
import { QueryResultRow } from "pg";
import isEmailUnique from "../sql_queries/postgresql_queries/isEmailUnique";
import userModelDatabaseColumnNames, {
  UserModel,
} from "../models/user_postgre";
import {
  loginQueryToUserModel,
  registerRequestToUserModel,
} from "../mappers/authMapper";
import {
  createUser,
  loginUser,
} from "../repositories/user_repository/auth_repository";
import selectQuerywithWhere from "../sql_queries/postgresql_queries/selectQuery";

export async function authServiceLogin(
  request: Request,
  response: Response
): Promise<Response> {
  const { email, password } = request.body;
  const query = selectQuerywithWhere({
    tableName: "users",
    selectedColumn: ["email"],
    conditions: [userModelDatabaseColumnNames.email],
  });
  const values: string[] = [email];
  const checkEmail: QueryResultRow | false = await loginUser(
    query,
    values,
    password
  );
  if (checkEmail === false) {
    return new CustomResponse({
      message: "Email or password not equals",
    }).error_400(response);
  } else {
    const userModel: UserModel = await loginQueryToUserModel(checkEmail);
    await createToken(userModel, response);
  }
}

export async function authServiceRegister(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { email } = req.body;
    const emailQuery = isEmailUnique();
    const emailControl = await client.query(emailQuery, [email]);
    if (emailControl.rowCount >= 1) {
      return new CustomResponse({
        data: email,
        message: "Email is already correct",
      }).error_400(res);
    } else {
      const userModel: UserModel = await registerRequestToUserModel(req);

      const result: boolean = await createUser(userModel);
      if (result !== false) {
        return new CustomResponse({
          message: "Created Account",
        }).created(res);
      } else {
        return new CustomResponse({ message: "Not Created Account" }).error_400(
          res
        );
      }
    }
  } catch (error) {
    console.log(error);
    return new CustomResponse({ message: "Account Creating Error" }).error_400(
      res
    );
  }
}
