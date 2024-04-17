"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function insertPostgreSql(tableName, columns) {
    let insert = "insert into " + tableName + " (";
    for (let index = 0; index < columns.length; index++) {
        if (index === columns.length - 1) {
            insert += columns[index];
        }
        else {
            insert += columns[index] + ",";
        }
    }
    insert += ") values (";
    for (let index = 1; index <= columns.length; index++) {
        if (index === columns.length) {
            insert += "$" + index;
        }
        else {
            insert += "$" + index + ",";
        }
    }
    insert += ")";
    return insert;
}
exports.default = insertPostgreSql;
//# sourceMappingURL=insert.js.map