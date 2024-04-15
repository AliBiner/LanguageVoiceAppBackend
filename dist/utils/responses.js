"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomResponse {
    constructor({ data = null, message = null, }) {
        this.data = data;
        this.message = message;
    }
    success(response) {
        var _a;
        return response.status(200).json({
            success: true,
            data: this.data,
            message: (_a = this.message) !== null && _a !== void 0 ? _a : "Success",
        });
    }
    created(response) {
        var _a;
        return response.status(201).json({
            success: true,
            data: this.data,
            message: (_a = this.message) !== null && _a !== void 0 ? _a : "Created",
        });
    }
    error_500(response) {
        var _a;
        return response.status(500).json({
            success: false,
            data: this.data,
            message: (_a = this.message) !== null && _a !== void 0 ? _a : "Failed! Server Error!",
        });
    }
    error_400(response) {
        var _a;
        return response.status(400).json({
            success: false,
            data: this.data,
            message: (_a = this.message) !== null && _a !== void 0 ? _a : "Failed! Bad Request!",
        });
    }
    error_401(response) {
        var _a;
        return response.status(401).json({
            success: false,
            data: this.data,
            message: (_a = this.message) !== null && _a !== void 0 ? _a : "Failed! Unauthorized!",
        });
    }
    error_404(response) {
        var _a;
        return response.status(404).json({
            success: false,
            data: this.data,
            message: (_a = this.message) !== null && _a !== void 0 ? _a : "Failed! Not Found!",
        });
    }
    error_429(response) {
        var _a;
        return response.status(429).json({
            success: false,
            data: this.data,
            message: (_a = this.message) !== null && _a !== void 0 ? _a : "Failed! Over Request!",
        });
    }
}
exports.default = CustomResponse;
//# sourceMappingURL=responses.js.map