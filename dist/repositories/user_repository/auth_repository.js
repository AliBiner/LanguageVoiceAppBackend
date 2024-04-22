"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailExistsRepository = exports.loginUser = exports.createUser = void 0;
const insert_1 = __importDefault(require("../../sql_queries/postgresql_queries/insert"));
const postgreSqlConnection_1 = __importDefault(require("../../db/postgreSqlConnection"));
const user_postgre_1 = __importDefault(require("../../models/user_postgre"));
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
function createUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const insert = (0, insert_1.default)(user_postgre_1.default.tableName, [
            user_postgre_1.default.id,
            user_postgre_1.default.firstName,
            user_postgre_1.default.middleName,
            user_postgre_1.default.lastName,
            user_postgre_1.default.email,
            user_postgre_1.default.password,
            user_postgre_1.default.createdDate,
        ]);
        const values = [
            (0, uuid_1.v4)(),
            user.firstName,
            user.middleName,
            user.lastName,
            user.email,
            user.password,
            new Date(Date.now()).toISOString(),
        ];
        const result = yield postgreSqlConnection_1.default.query(insert, values);
        return result.rowCount;
    });
}
exports.createUser = createUser;
function loginUser(query, values, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const check = yield postgreSqlConnection_1.default.query(query, values);
        if (check.rowCount >= 1) {
            const checkPass = yield bcrypt_1.default.compare(password, check.rows[0].account_password);
            if (checkPass === false) {
                return false;
            }
            return check.rows;
        }
        else {
            return false;
        }
    });
}
exports.loginUser = loginUser;
function emailExistsRepository(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield postgreSqlConnection_1.default.query("select exists ( select 1 from users where email='" + email + "') limit 1");
        return result.rows[0].exists;
    });
}
exports.emailExistsRepository = emailExistsRepository;
//# sourceMappingURL=auth_repository.js.map