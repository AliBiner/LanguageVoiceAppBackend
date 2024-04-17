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
exports.authServiceRegister = exports.authServiceLogin = void 0;
const responses_1 = __importDefault(require("../utils/responses"));
const auth_1 = require("../middlewares/token/auth");
const postgreSqlConnection_1 = __importDefault(require("../db/postgreSqlConnection"));
const isEmailUnique_1 = __importDefault(require("../sql_queries/postgresql_queries/isEmailUnique"));
const user_postgre_1 = __importDefault(require("../models/user_postgre"));
const authMapper_1 = require("../mappers/authMapper");
const auth_repository_1 = require("../repositories/user_repository/auth_repository");
const selectQuery_1 = __importDefault(require("../sql_queries/postgresql_queries/selectQuery"));
function authServiceLogin(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = request.body;
        const query = (0, selectQuery_1.default)({
            tableName: "users",
            selectedColumn: ["email"],
            conditions: [user_postgre_1.default.email],
        });
        const values = [email];
        const checkEmail = yield (0, auth_repository_1.loginUser)(query, values, password);
        if (checkEmail === false) {
            return new responses_1.default({
                message: "Email or password not equals",
            }).error_400(response);
        }
        else {
            const userModel = yield (0, authMapper_1.loginQueryToUserModel)(checkEmail);
            yield (0, auth_1.createToken)(userModel, response);
        }
    });
}
exports.authServiceLogin = authServiceLogin;
function authServiceRegister(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email } = req.body;
            const emailQuery = (0, isEmailUnique_1.default)();
            const emailControl = yield postgreSqlConnection_1.default.query(emailQuery, [email]);
            if (emailControl.rowCount >= 1) {
                return new responses_1.default({
                    data: email,
                    message: "Email is already correct",
                }).error_400(res);
            }
            else {
                const userModel = yield (0, authMapper_1.registerRequestToUserModel)(req);
                const result = yield (0, auth_repository_1.createUser)(userModel);
                if (result !== false) {
                    return new responses_1.default({
                        message: "Created Account",
                    }).created(res);
                }
                else {
                    return new responses_1.default({ message: "Not Created Account" }).error_400(res);
                }
            }
        }
        catch (error) {
            console.log(error);
            return new responses_1.default({ message: "Account Creating Error" }).error_400(res);
        }
    });
}
exports.authServiceRegister = authServiceRegister;
//# sourceMappingURL=auth_service.js.map