export interface UserModel {
  id?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  createdDate?: string;
  updatedDate?: string;
  deletedDate?: string;
}

interface UserModelDatabaseColumnNames {
  tableName: string;
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  password: string;
  createdDate: string;
  updatedDate: string;
  deletedDate: string;
}

export const userModelDatabaseColumnNames: UserModelDatabaseColumnNames = {
  tableName: "users",
  id: "user_id",
  createdDate: "created_date",
  email: "email",
  firstName: "first_name",
  lastName: "last_name",
  password: "account_password",
  deletedDate: "deleted_date",
  middleName: "middle_name",
  updatedDate: "updated_date",
};
