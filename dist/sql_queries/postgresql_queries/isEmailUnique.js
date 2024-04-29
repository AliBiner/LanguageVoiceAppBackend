"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_postgre_1 = __importDefault(require("../../models/user_postgre"));
async function isEmailUnique() {
    const query = "select " +
        user_postgre_1.default.id +
        " from " +
        user_postgre_1.default.tableName +
        " where " +
        user_postgre_1.default.email +
        "=$1";
    return query;
}
exports.default = isEmailUnique;
//# sourceMappingURL=isEmailUnique.js.map