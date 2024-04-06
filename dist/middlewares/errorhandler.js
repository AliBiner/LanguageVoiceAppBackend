"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = __importDefault(require("../utils/errors"));
const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof errors_1.default) {
        // tslint:disable-next-line:no-console
        console.log(err);
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
    else {
        // tslint:disable-next-line:no-console
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
exports.default = errorHandlerMiddleware;
//# sourceMappingURL=errorhandler.js.map