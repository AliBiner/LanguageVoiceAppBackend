"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailExistsRepository = exports.loginUser = exports.createUser = void 0;
const postgreSqlConnection_1 = __importDefault(require("../../db/postgreSqlConnection"));
async function createUser(user) {
    //import
    const insertPostgreSql = (await Promise.resolve().then(() => __importStar(require("../../sql_queries/postgresql_queries/insert")))).default;
    const userModelDatabaseColumnNames = (await Promise.resolve().then(() => __importStar(require("../../models/user_postgre")))).userModelDatabaseColumnNames;
    const uuid4 = (await Promise.resolve().then(() => __importStar(require("uuid")))).v4;
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
    const result = await postgreSqlConnection_1.default.query(insert, values);
    return result.rowCount;
}
exports.createUser = createUser;
async function loginUser(query, values, password) {
    //import
    const bcrypt = (await Promise.resolve().then(() => __importStar(require("bcrypt")))).compare;
    const check = await postgreSqlConnection_1.default.query(query, values);
    if (check.rowCount >= 1) {
        const checkPass = await bcrypt(password, check.rows[0].account_password);
        if (checkPass === false) {
            return false;
        }
        return check.rows;
    }
    else {
        return false;
    }
}
exports.loginUser = loginUser;
async function emailExistsRepository(email) {
    const result = await postgreSqlConnection_1.default.query("select user_id from users where email='" + email + "' limit 1");
    return result.rowCount;
}
exports.emailExistsRepository = emailExistsRepository;
//# sourceMappingURL=auth_repository.js.map