"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8080; // default port to listen
const index_1 = __importDefault(require("./routers/index"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
require("./db/dbConnection");
const errorhandler_1 = __importDefault(require("./middlewares/errorhandler"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config");
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
app.listen(config_1.config.server.port, () => {
    console.log(`server started at http://192.168.1.126:${config_1.config.server.port}`);
});
exports.default = app;
//# sourceMappingURL=app.js.map