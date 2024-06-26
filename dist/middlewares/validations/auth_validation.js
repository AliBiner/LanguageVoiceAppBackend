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
const joi = __importStar(require("joi"));
const responses_1 = __importDefault(require("../../utils/responses"));
class AuthValidation {
    static login = async (req, res, next) => {
        try {
            await joi
                .object({
                email: joi.string().email().trim().min(3).max(100).required(),
                password: joi
                    .string()
                    .trim()
                    .min(6)
                    .max(18)
                    .required()
                    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
            })
                .validateAsync(req.body);
        }
        catch (error) {
            if (error.details && error.details[0].message) {
                return new responses_1.default({
                    message: error.details[0].message,
                }).error_400(res);
            }
            else {
                return new responses_1.default({
                    message: "Please enter a valid model json",
                }).error_400(res);
            }
        }
        next();
    };
    static register = async (req, res, next) => {
        try {
            await joi
                .object({
                firstName: joi.string().trim().min(3).max(100).required(),
                middleName: joi.string().trim().min(3).max(100),
                lastName: joi.string().trim().min(3).max(100).required(),
                email: joi.string().email().trim().min(3).max(100).required(),
                password: joi
                    .string()
                    .trim()
                    .min(6)
                    .max(18)
                    .required()
                    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
                repeatPassword: joi.ref("password"),
            })
                .validateAsync(req.body);
        }
        catch (error) {
            if (error.details && error.details[0].message) {
                return new responses_1.default({
                    message: error.details[0].message,
                }).error_400(res);
            }
            else {
                return new responses_1.default({
                    message: "Please enter a valid model json",
                }).error_400(res);
            }
        }
        next();
    };
    static email_exist = async (req, res, next) => {
        try {
            await joi
                .object({
                email: joi.string().email().trim().min(3).max(100).required(),
            })
                .validateAsync(req.body);
        }
        catch (error) {
            if (error.details && error.details[0].message) {
                return new responses_1.default({
                    message: error.details[0].message,
                }).error_400(res);
            }
            else {
                return new responses_1.default({
                    message: "Please enter a valid model json",
                }).error_400(res);
            }
        }
        next();
    };
}
exports.default = AuthValidation;
//# sourceMappingURL=auth_validation.js.map