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
exports.emailExistController = exports.meOneThread = exports.me = exports.register = exports.login = void 0;
const responses_1 = __importDefault(require("../utils/responses"));
async function login(request, response) {
    const authServiceLogin = (await Promise.resolve().then(() => __importStar(require("../services/auth_service"))))
        .authServiceLogin;
    const result = authServiceLogin(request, response);
    return result;
}
exports.login = login;
async function register(request, response) {
    //import
    const authServiceRegister = (await Promise.resolve().then(() => __importStar(require("../services/auth_service"))))
        .authServiceRegister;
    const result = authServiceRegister(request, response);
    return result;
}
exports.register = register;
async function me(request, response) {
    try {
        return new responses_1.default({
            message: "Me Load Test with Cluster ",
        }).success(response);
    }
    catch (err) {
        console.log(err);
        return new responses_1.default({ message: err }).error_500(response);
    }
}
exports.me = me;
async function meOneThread(request, response) {
    try {
        return new responses_1.default({
            message: "Me Load Test with One Thread",
        }).success(response);
    }
    catch (err) {
        console.log(err);
        return new responses_1.default({ message: err }).error_500(response);
    }
}
exports.meOneThread = meOneThread;
// async function createWorker() {
//   return new Promise<string>((resolve, reject) => {
//     const worker = new Worker(__dirname + "/meWorker.js");
//     worker.postMessage("Hello, World!!");
//     worker.on("message", (code) => {
//       resolve(code);
//     });
//     worker.on("error", (code) => {
//       reject(code);
//     });
//   });
// }
async function emailExistController(req, res) {
    const emailExistService = (await Promise.resolve().then(() => __importStar(require("../services/auth_service"))))
        .emailExistService;
    const result = await emailExistService(req, res);
    return result;
}
exports.emailExistController = emailExistController;
//# sourceMappingURL=auth_controller.js.map