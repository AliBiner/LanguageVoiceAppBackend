"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectForks = exports.emailExistController = exports.meOneThread = exports.me = exports.register = exports.login = void 0;
const auth_service_1 = require("../services/auth_service");
const responses_1 = __importDefault(require("../utils/responses"));
const worker_threads_1 = require("worker_threads");
const cluster_1 = __importDefault(require("cluster"));
const process_1 = __importDefault(require("process"));
async function login(request, response) {
    const result = (0, auth_service_1.authServiceLogin)(request, response);
    return result;
}
exports.login = login;
async function register(request, response) {
    const result = (0, auth_service_1.authServiceRegister)(request, response);
    return result;
}
exports.register = register;
// export function createOneThreadId(req: Request, res: Response) {
//   oneThreadPid = process.pid;
//   return new CustomResponse({
//     message: `Took Process Id: ${oneThreadPid}`,
//   }).success(res);
// }
async function me(request, response) {
    try {
        if (worker_threads_1.isMainThread) {
            const result = await createWorker();
        }
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
        console.log(process_1.default.pid);
        const result = await createWorker();
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
async function createWorker() {
    return new Promise((resolve, reject) => {
        const worker = new worker_threads_1.Worker(__dirname + "/meWorker.js");
        worker.postMessage("Hello, World!!");
        worker.on("message", (code) => {
            resolve(code);
        });
        worker.on("error", (code) => {
            reject(code);
        });
    });
}
async function emailExistController(req, res) {
    const result = await (0, auth_service_1.emailExistService)(req, res);
    return result;
}
exports.emailExistController = emailExistController;
function disconnectForks(req, res) {
    cluster_1.default.disconnect;
    return new responses_1.default({}).success(res);
}
exports.disconnectForks = disconnectForks;
//# sourceMappingURL=auth_controller.js.map