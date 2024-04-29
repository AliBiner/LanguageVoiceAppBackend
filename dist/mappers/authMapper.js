"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginQueryToUserModel = exports.registerRequestToUserModel = void 0;
const uuid_1 = require("uuid");
async function registerRequestToUserModel(request) {
    const { firstName, middleName, lastName, email, password } = request.body;
    const model = {
        id: (0, uuid_1.v4)(),
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        email: email,
        password: null,
        createdDate: new Date(Date.now()).toISOString(),
    };
    return model;
}
exports.registerRequestToUserModel = registerRequestToUserModel;
async function loginQueryToUserModel(queryResult) {
    const model = {
        id: queryResult[0].user_id,
        firstName: queryResult[0].first_name,
    };
    return model;
}
exports.loginQueryToUserModel = loginQueryToUserModel;
//# sourceMappingURL=authMapper.js.map