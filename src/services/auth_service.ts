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
  emailExistsRepository,
  loginUser,
} from "../repositories/user_repository/auth_repository";
import selectQuerywithWhere from "../sql_queries/postgresql_queries/selectQuery";
import * as bcrypt from "bcrypt";
import { insertWithExist } from "../sql_queries/postgresql_queries/insertWithExist";

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
    const { password } = req.body;

    // const emailQuery = isEmailUnique();
    // const insertWithEx = insertWithExist("users");
    // const emailControl = await client.query(await emailQuery, [email]);
    // if ((await emailControl.rowCount) >= 1) {
    //   return new CustomResponse({
    //     data: email,
    //     message: "Email is already correct",
    //   }).error_400(res);
    // } else {
    const cryptPass = bcrypt.hashSync(password, 1);

    const userModel: UserModel = await registerRequestToUserModel(req);

    userModel.password = cryptPass;

    const result: number = await createUser(userModel);
    if (result !== 0) {
      return new CustomResponse({
        message: "Created Account",
      }).created(res);
    } else {
      return new CustomResponse({ message: "Not Created Account" }).error_400(
        res
      );
    }
    // }
  } catch (error) {
    return new CustomResponse({ message: "Account Creating Error" }).error_400(
      res
    );
  }
}

export async function emailExistService(
  req: Request,
  res: Response
): Promise<Response> {
  const { email } = req.body;
  const result = await emailExistsRepository(email);
  if (result === true) {
    return new CustomResponse({ message: "Email Already Exists" }).error_400(
      res
    );
  } else {
    return new CustomResponse({ message: "Email not used" }).success(res);
  }
}
