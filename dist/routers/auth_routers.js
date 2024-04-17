"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRouter = express_1.default.Router();
const auth_validation_1 = __importDefault(require("../middlewares/validations/auth_validation"));
const auth_controller_1 = require("../controllers/auth_controller");
const auth_1 = require("../middlewares/token/auth");
authRouter.post("/login", auth_validation_1.default.login, auth_controller_1.login);
authRouter.post("/register", auth_validation_1.default.register, auth_controller_1.register);
authRouter.get("/me", auth_1.tokenCheck, auth_controller_1.me);
exports.default = authRouter;
//# sourceMappingURL=auth_routers.js.map