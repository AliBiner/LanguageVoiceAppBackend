import client from "../../db/postgreSqlConnection";
import { UserModel } from "../../models/user_postgre";
import { QueryResultRow } from "pg";

export async function createUser(user: UserModel): Promise<number> {
  //import
  const insertPostgreSql = (
    await import("../../sql_queries/postgresql_queries/insert")
  ).default;
  const userModelDatabaseColumnNames = (
    await import("../../models/user_postgre")
  ).userModelDatabaseColumnNames;
  const uuid4 = (await import("uuid")).v4;
  const insert = insertPostgreSql(userModelDatabaseColumnNames.tableName, [
    userModelDatabaseColumnNames.id,
    userModelDatabaseColumnNames.firstName,
    userModelDatabaseColumnNames.middleName,
    userModelDatabaseColumnNames.lastName,
    userModelDatabaseColumnNames.email,
    userModelDatabaseColumnNames.password,
    userModelDatabaseColumnNames.createdDate,
  ]);
  const values = [
    uuid4(),
    user.firstName,
    user.middleName,
    user.lastName,
    user.email,
    user.password,
    new Date(Date.now()).toISOString(),
  ];
  const result = await client.query(insert, values);
  return result.rowCount;
}

export async function loginUser(
  query: string,
  values: string[],
  password: string
): Promise<QueryResultRow | false> {
  //import
  const bcrypt = (await import("bcrypt")).compare;
  const check = await client.query(query, values);
  if (check.rowCount >= 1) {
    const checkPass = await bcrypt(password, check.rows[0].account_password);
    if (checkPass === false) {
      return false;
    }
    return check.rows;
  } else {
    return false;
  }
}

export async function emailExistsRepository(email: string): Promise<number> {
  const result = await client.query(
    "select user_id from users where email='" + email + "' limit 1"
  );
  return result.rowCount;
}
