"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkValueAtDb = void 0;
async function checkValueAtDb(value, model) {
    const control = await model.findOne(value);
    if (control == null) {
        return true;
    }
    else {
        return false;
    }
}
exports.checkValueAtDb = checkValueAtDb;
//# sourceMappingURL=check.js.map