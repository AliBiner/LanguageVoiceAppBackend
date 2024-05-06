import { userModelDatabaseColumnNames } from "../../models/user_postgre";

async function isEmailUnique() {
  const query =
    "select " +
    userModelDatabaseColumnNames.id +
    " from " +
    userModelDatabaseColumnNames.tableName +
    " where " +
    userModelDatabaseColumnNames.email +
    "=$1";
  return query;
}

export default isEmailUnique;
