import { Request, Response } from "express";
import CustomResponse from "../utils/responses";
import { QueryResultRow } from "pg";
import { UserModel } from "../models/user_postgre";

export async function authServiceLogin(
  request: Request,
  response: Response
): Promise<Response> {
  //import
  const query_package = await import(
    "../sql_queries/postgresql_queries/selectQuery"
  );
  const userModelDatabaseColumnNames = (await import("../models/user_postgre"))
    .userModelDatabaseColumnNames;
  const { email, password } = request.body;

  const query = query_package.default({
    tableName: "users",
    selectedColumn: ["email"],
    conditions: [userModelDatabaseColumnNames.email],
  });
  const values: string[] = [email];
  const loginUser = (
    await import("../repositories/user_repository/auth_repository")
  ).loginUser;
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
    const loginQueryToUserModel = (await import("../mappers/authMapper"))
      .loginQueryToUserModel;
    const createToken = (await import("../middlewares/token/auth")).createToken;
    const userModel: UserModel = await loginQueryToUserModel(checkEmail);
    await createToken(userModel, response);
  }
}

export async function authServiceRegister(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    //import
    const registerRequestToUserModel = (await import("../mappers/authMapper"))
      .registerRequestToUserModel;
    const { createUser } = await import(
      "../repositories/user_repository/auth_repository"
    );
    const bcrypt = (await import("bcrypt")).hashSync;
    const { password } = req.body;
    const cryptPass = bcrypt(password, 1);

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
  //import
  const { emailExistsRepository } = await import(
    "../repositories/user_repository/auth_repository"
  );
  const { email } = req.body;
  const result: number = await emailExistsRepository(email);
  if (result === 1) {
    return new CustomResponse({ message: "Email Already Exists" }).error_400(
      res
    );
  } else {
    return new CustomResponse({ message: "Email not used" }).success(res);
  }
}
