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
exports.me = exports.register = exports.login = void 0;
const auth_service_1 = require("../services/auth_service");
const responses_1 = __importDefault(require("../utils/responses"));
const postgreSqlConnection_1 = __importDefault(require("../db/postgreSqlConnection"));
function login(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = (0, auth_service_1.authServiceLogin)(request, response);
        return result;
    });
}
exports.login = login;
function register(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = (0, auth_service_1.authServiceRegister)(request, response);
        return result;
    });
}
exports.register = register;
function me(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield postgreSqlConnection_1.default.query("select * from users");
            console.log(result.rows);
            return new responses_1.default({ data: result.rows }).success(response);
        }
        catch (err) {
            return new responses_1.default({ message: err }).error_500(response);
        }
    });
}
exports.me = me;
//# sourceMappingURL=auth_controller.js.map