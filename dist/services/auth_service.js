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
exports.emailExistService = exports.authServiceRegister = exports.authServiceLogin = void 0;
const responses_1 = __importDefault(require("../utils/responses"));
const auth_1 = require("../middlewares/token/auth");
const user_postgre_1 = __importDefault(require("../models/user_postgre"));
const authMapper_1 = require("../mappers/authMapper");
const auth_repository_1 = require("../repositories/user_repository/auth_repository");
const selectQuery_1 = __importDefault(require("../sql_queries/postgresql_queries/selectQuery"));
const bcrypt = __importStar(require("bcrypt"));
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
            const { password } = req.body;
            // const emailQuery = isEmailUnique();
            // const insertWithEx = insertWithExist("users");
            // const emailControl = await client.query(await emailQuery, [email]);
            // if ((await emailControl.rowCount) >= 1) {
            //   return new CustomResponse({
            //     data: email,
            //     message: "Email is already correct",
            //   }).error_400(res);
            // } else {
            const cryptPass = bcrypt.hashSync(password, 1);
            const userModel = yield (0, authMapper_1.registerRequestToUserModel)(req);
            userModel.password = cryptPass;
            const result = yield (0, auth_repository_1.createUser)(userModel);
            if (result !== 0) {
                return new responses_1.default({
                    message: "Created Account",
                }).created(res);
            }
            else {
                return new responses_1.default({ message: "Not Created Account" }).error_400(res);
            }
            // }
        }
        catch (error) {
            return new responses_1.default({ message: "Account Creating Error" }).error_400(res);
        }
    });
}
exports.authServiceRegister = authServiceRegister;
function emailExistService(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email } = req.body;
        const result = yield (0, auth_repository_1.emailExistsRepository)(email);
        if (result === 1) {
            return new responses_1.default({ message: "Email Already Exists" }).error_400(res);
        }
        else {
            return new responses_1.default({ message: "Email not used" }).success(res);
        }
    });
}
exports.emailExistService = emailExistService;
//# sourceMappingURL=auth_service.js.map