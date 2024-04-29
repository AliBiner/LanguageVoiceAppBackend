"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomResponse {
    data;
    message;
    constructor({ data = null, message = null, }) {
        this.data = data;
        this.message = message;
    }
    success(response) {
        return response.status(200).json({
            success: true,
            data: this.data,
            message: this.message ?? "Success",
        });
    }
    created(response) {
        return response.status(201).json({
            success: true,
            data: this.data,
            message: this.message ?? "Created",
        });
    }
    error_500(response) {
        return response.status(500).json({
            success: false,
            data: this.data,
            message: this.message ?? "Failed! Server Error!",
        });
    }
    error_400(response) {
        return response.status(400).json({
            success: false,
            data: this.data,
            message: this.message ?? "Failed! Bad Request!",
        });
    }
    error_401(response) {
        return response.status(401).json({
            success: false,
            data: this.data,
            message: this.message ?? "Failed! Unauthorized!",
        });
    }
    error_404(response) {
        return response.status(404).json({
            success: false,
            data: this.data,
            message: this.message ?? "Failed! Not Found!",
        });
    }
    error_429(response) {
        return response.status(429).json({
            success: false,
            data: this.data,
            message: this.message ?? "Failed! Over Request!",
        });
    }
}
exports.default = CustomResponse;
//# sourceMappingURL=responses.js.map