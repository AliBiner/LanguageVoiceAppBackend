import insertPostgreSql from "../../sql_queries/postgresql_queries/insert";
import client from "../../db/postgreSqlConnection";
import userModelDatabaseColumnNames, {
  UserModel,
} from "../../models/user_postgre";
import { v4 as uuid4 } from "uuid";
import { QueryResultRow } from "pg";
import bcrypt from "bcrypt";
import { insertWithExist } from "../../sql_queries/postgresql_queries/insertWithExist";

export async function createUser(user: UserModel): Promise<number> {
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
  const check = await client.query(query, values);
  if (check.rowCount >= 1) {
    const checkPass = await bcrypt.compare(
      password,
      check.rows[0].account_password
    );
    if (checkPass === false) {
      return false;
    }
    return check.rows;
  } else {
    return false;
  }
}

export async function emailExistsRepository(email: string) {
  const result = await client.query(
    "select exists ( select 1 from users where email='" + email + "') limit 1"
  );
  console.log(result.rows[0].exists);
  return result.rows[0].exists;
}
