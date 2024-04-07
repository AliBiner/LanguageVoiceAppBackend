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
const user_model_1 = __importDefault(require("../models/user_model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const check_1 = require("./checks/check");
const auth_1 = require("../middlewares/token/auth");
function authServiceLogin(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = request.body;
        const userCheck = yield user_model_1.default.findOne({ email });
        if (userCheck == null) {
            return new responses_1.default({
                message: "Email or Password Incorrect",
            }).error_400(response);
        }
        const comparePass = yield bcrypt_1.default.compare(password, userCheck.password);
        if (comparePass === false) {
            return new responses_1.default({
                message: "Email or Password Incorrect",
            }).error_400(response);
        }
        else {
            yield (0, auth_1.createToken)(userCheck.id, userCheck, response);
        }
    });
}
exports.authServiceLogin = authServiceLogin;
function authServiceRegister(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        if ((yield (0, check_1.checkValueAtDb)({ email }, user_model_1.default)) === false) {
            return new responses_1.default({
                data: email,
                message: "Email is already correct",
            }).error_400(res);
        }
        const cryptPass = yield bcrypt_1.default.hash(password, 10);
        req.body.password = cryptPass;
        const userToRegister = new user_model_1.default(req.body);
        yield userToRegister
            .save()
            .then((data) => {
            return new responses_1.default({ data, message: "Saved User" }).created(res);
        })
            .catch((error) => {
            return new responses_1.default({ message: error.message }).error_400(res);
        });
    });
}
exports.authServiceRegister = authServiceRegister;
//# sourceMappingURL=auth_service.js.map