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
exports.emailExistController = exports.me = exports.register = exports.login = void 0;
const auth_service_1 = require("../services/auth_service");
const responses_1 = __importDefault(require("../utils/responses"));
const worker_threads_1 = require("worker_threads");
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
            if (worker_threads_1.isMainThread) {
                // const workerPromises = [];
                // workerPromises.push(createWorker());
                const pass = yield Promise.resolve(createWorker());
                return new responses_1.default({ message: pass }).success(response);
            }
        }
        catch (err) {
            console.log(err);
            return new responses_1.default({ message: err }).error_500(response);
        }
    });
}
exports.me = me;
function createWorker() {
    return new Promise((resolve, reject) => {
        const worker = new worker_threads_1.Worker("../threads/meWorker.js");
        worker.postMessage("Hello, World!!");
        worker.on("message", (code) => {
            resolve(code);
        });
        worker.on("error", (code) => {
            reject(code);
        });
    });
}
function emailExistController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield (0, auth_service_1.emailExistService)(req, res);
        return result;
    });
}
exports.emailExistController = emailExistController;
//# sourceMappingURL=auth_controller.js.map