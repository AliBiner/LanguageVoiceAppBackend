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
const user_postgre_1 = __importDefault(require("../../models/user_postgre"));
function isEmailUnique() {
    return __awaiter(this, void 0, void 0, function* () {
        const query = "select " +
            user_postgre_1.default.id +
            " from " +
            user_postgre_1.default.tableName +
            " where " +
            user_postgre_1.default.email +
            "=$1";
        return query;
    });
}
exports.default = isEmailUnique;
//# sourceMappingURL=isEmailUnique.js.map