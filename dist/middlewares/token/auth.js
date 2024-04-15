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
exports.tokenCheck = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const responses_1 = __importDefault(require("../..//utils/responses"));
const user_model_1 = __importDefault(require("../../models/user_model"));
function createToken(userId, userObject, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const payload = {
            sub: userId,
            name: userObject.name,
        };
        const token = yield jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET_KEY, {
            algorithm: "HS512",
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
        return res.status(201).json({
            success: true,
            token,
            message: "Created Token",
        });
    });
}
exports.createToken = createToken;
function tokenCheck(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const headerToken = req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer ");
        if (!headerToken) {
            console.log("please test");
            return new responses_1.default({ message: "Please enter a token" }).error_401(res);
        }
        const token = req.headers.authorization.split(" ")[1];
        yield jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => __awaiter(this, void 0, void 0, function* () {
            if (err)
                return new responses_1.default({ message: "Undefined Token" }).error_401(res);
            const userInfo = yield user_model_1.default.findById(decoded.sub);
            if (!userInfo) {
                return new responses_1.default({ message: "Not found User" }).error_401(res);
            }
            next();
        }));
    });
}
exports.tokenCheck = tokenCheck;
//# sourceMappingURL=auth.js.map