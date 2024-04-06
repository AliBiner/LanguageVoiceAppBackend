"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const expressRouter = express_1.default.Router();
const auth_routers_1 = __importDefault(require("./auth.routers"));
expressRouter.use(auth_routers_1.default);
exports.default = expressRouter;
//# sourceMappingURL=index.js.map