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
exports.emailExistService = exports.authServiceRegister = exports.authServiceLogin = void 0;
const responses_1 = __importDefault(require("../utils/responses"));
async function authServiceLogin(request, response) {
    //import
    const query_package = await Promise.resolve().then(() => __importStar(require("../sql_queries/postgresql_queries/selectQuery")));
    const userModelDatabaseColumnNames = (await Promise.resolve().then(() => __importStar(require("../models/user_postgre"))))
        .userModelDatabaseColumnNames;
    const { email, password } = request.body;
    const query = query_package.default({
        tableName: "users",
        selectedColumn: ["email"],
        conditions: [userModelDatabaseColumnNames.email],
    });
    const values = [email];
    const loginUser = (await Promise.resolve().then(() => __importStar(require("../repositories/user_repository/auth_repository")))).loginUser;
    const checkEmail = await loginUser(query, values, password);
    if (checkEmail === false) {
        return new responses_1.default({
            message: "Email or password not equals",
        }).error_400(response);
    }
    else {
        const loginQueryToUserModel = (await Promise.resolve().then(() => __importStar(require("../mappers/authMapper"))))
            .loginQueryToUserModel;
        const createToken = (await Promise.resolve().then(() => __importStar(require("../middlewares/token/auth")))).createToken;
        const userModel = await loginQueryToUserModel(checkEmail);
        await createToken(userModel, response);
    }
}
exports.authServiceLogin = authServiceLogin;
async function authServiceRegister(req, res) {
    try {
        //import
        const registerRequestToUserModel = (await Promise.resolve().then(() => __importStar(require("../mappers/authMapper"))))
            .registerRequestToUserModel;
        const { createUser } = await Promise.resolve().then(() => __importStar(require("../repositories/user_repository/auth_repository")));
        const bcrypt = (await Promise.resolve().then(() => __importStar(require("bcrypt")))).hashSync;
        const { password } = req.body;
        const cryptPass = bcrypt(password, 1);
        const userModel = await registerRequestToUserModel(req);
        userModel.password = cryptPass;
        const result = await createUser(userModel);
        if (result !== 0) {
            return new responses_1.default({
                message: "Created Account",
            }).created(res);
        }
        else {
            return new responses_1.default({ message: "Not Created Account" }).error_400(res);
        }
    }
    catch (error) {
        return new responses_1.default({ message: "Account Creating Error" }).error_400(res);
    }
}
exports.authServiceRegister = authServiceRegister;
async function emailExistService(req, res) {
    //import
    const { emailExistsRepository } = await Promise.resolve().then(() => __importStar(require("../repositories/user_repository/auth_repository")));
    const { email } = req.body;
    const result = await emailExistsRepository(email);
    if (result === 1) {
        return new responses_1.default({ message: "Email Already Exists" }).error_400(res);
    }
    else {
        return new responses_1.default({ message: "Email not used" }).success(res);
    }
}
exports.emailExistService = emailExistService;
//# sourceMappingURL=auth_service.js.map