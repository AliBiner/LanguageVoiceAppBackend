"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class APIError extends Error {
    constructor(message, statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, APIError.prototype);
    }
}
exports.default = APIError;
//# sourceMappingURL=errors.js.map