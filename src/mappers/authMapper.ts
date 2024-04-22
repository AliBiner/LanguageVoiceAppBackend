import { Request } from "express";
import { UserModel } from "../models/user_postgre";
import { v4 as uuid4 } from "uuid";
import { QueryResultRow } from "pg";

export async function registerRequestToUserModel(
  request: Request
): Promise<UserModel> {
  const { firstName, middleName, lastName, email, password } = request.body;

  const model: UserModel = {
    id: uuid4(),
    firstName: firstName,
    middleName: middleName,
    lastName: lastName,
    email: email,
    password: null,
    createdDate: new Date(Date.now()).toISOString(),
  };

  return model;
}

export async function loginQueryToUserModel(
  queryResult: QueryResultRow
): Promise<UserModel> {
  const model: UserModel = {
    id: queryResult[0].user_id,
    firstName: queryResult[0].first_name,
  };
  return model;
}
