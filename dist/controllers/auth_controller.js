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
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = exports.register = exports.login = void 0;
const auth_service_1 = require("../services/auth_service");
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
function me() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = {
            statusCode: 200,
            body: JSON.stringify({ msg: "test" }),
        };
        return result;
    });
}
exports.me = me;
//# sourceMappingURL=auth_controller.js.map