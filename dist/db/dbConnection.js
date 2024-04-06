"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect(process.env.DB_URL, {}).then(() => {
    // tslint:disable-next-line:no-console
    console.log("Database Connection Success");
}).catch((err) => {
    // tslint:disable-next-line:no-console
    console.log("Database Connection Failed", err);
});
exports.default = mongoose_1.default;
//# sourceMappingURL=dbConnection.js.map