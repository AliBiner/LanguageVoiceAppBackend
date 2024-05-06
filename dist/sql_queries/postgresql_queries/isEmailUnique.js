"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_postgre_1 = require("../../models/user_postgre");
async function isEmailUnique() {
    const query = "select " +
        user_postgre_1.userModelDatabaseColumnNames.id +
        " from " +
        user_postgre_1.userModelDatabaseColumnNames.tableName +
        " where " +
        user_postgre_1.userModelDatabaseColumnNames.email +
        "=$1";
    return query;
}
exports.default = isEmailUnique;
//# sourceMappingURL=isEmailUnique.js.map