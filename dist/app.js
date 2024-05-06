"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routers/index"));
const dotenv_1 = __importDefault(require("dotenv"));
require("./db/dbConnection");
const errorhandler_1 = __importDefault(require("./middlewares/errorhandler"));
const cors_1 = __importDefault(require("cors"));
const postgreSqlConnection_1 = require("./db/postgreSqlConnection");
const cluster_1 = __importDefault(require("cluster"));
const os_1 = __importDefault(require("os"));
const port = process.env.PORT || 8080 || 8081; // default port to listen
dotenv_1.default.config();
const numCPUs = os_1.default.availableParallelism();
if (cluster_1.default.isPrimary) {
    // Fork workers.
    for (let i = 0; i < 5; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on("disconnect", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        console.log("Let's fork another worker!");
        cluster_1.default.fork();
    });
}
else {
    console.log(`Create Instance of Node.js`);
    const app = (0, express_1.default)();
    // Middleware
    app.use(express_1.default.json());
    app.use(express_1.default.json({ limit: "50mb" }));
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, cors_1.default)());
    // Router
    app.use("/api", index_1.default);
    // Error Handler
    app.use(errorhandler_1.default);
    // start the Express server
    app.listen(port, () => {
        (0, postgreSqlConnection_1.connect)();
        console.log(`Server Started`);
    });
}
// const app = express();
// // Middleware
// app.use(express.json());
// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ extended: true }));
// app.use(cors());
// // Router
// app.use("/api", routers);
// // Error Handler
// app.use(errorHandlerMiddleware);
// // start the Express server
// app.listen(port, () => {
//   connect();
//   console.log(`Server Started`);
// });
//# sourceMappingURL=app.js.map