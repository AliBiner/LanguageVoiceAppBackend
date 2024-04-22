"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertWithExist = void 0;
function insertWithExist(tableName, columns, email) {
    let insert = "insert into " + tableName + " (";
    for (let index = 0; index < columns.length; index++) {
        if (index === columns.length - 1) {
            insert += columns[index];
        }
        else {
            insert += columns[index] + ",";
        }
    }
    insert += ") select ";
    for (let index = 1; index <= columns.length; index++) {
        if (index === columns.length) {
            insert += "$" + index;
        }
        else {
            insert += "$" + index + ",";
        }
    }
    insert +=
        " where not EXISTS (select 1 from " +
            tableName +
            " where email='" +
            email +
            "')";
    return insert;
}
exports.insertWithExist = insertWithExist;
//# sourceMappingURL=insertWithExist.js.map