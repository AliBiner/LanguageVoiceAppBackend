"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenCheck = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const responses_1 = __importDefault(require("../..//utils/responses"));
const postgreSqlConnection_1 = __importDefault(require("../../db/postgreSqlConnection"));
async function createToken(userObject, res) {
    const payload = {
        sub: userObject.id,
        name: userObject.firstName,
    };
    const token = await jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET_KEY, {
        algorithm: "HS512",
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return res.status(201).json({
        success: true,
        token,
        message: "Created Token",
    });
}
exports.createToken = createToken;
async function tokenCheck(req, res, next) {
    const headerToken = req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ");
    if (!headerToken) {
        return new responses_1.default({ message: "Please enter a token" }).error_401(res);
    }
    const token = req.headers.authorization.split(" ")[1];
    await jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
        if (err)
            return new responses_1.default({ message: "Undefined Token" }).error_401(res);
        const id = `'${decoded.sub}'`;
        const userInfo = await postgreSqlConnection_1.default.query("select * from users where user_id=$1", [id]);
        if (!userInfo) {
            return new responses_1.default({ message: "Not found User" }).error_401(res);
        }
        next();
    });
}
exports.tokenCheck = tokenCheck;
//# sourceMappingURL=auth.js.map