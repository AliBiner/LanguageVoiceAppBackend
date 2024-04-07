import { Response } from "express";
class CustomResponse {
  data?: any;
  message?: string | null;
  constructor({
    data = null,
    message = null,
  }: {
    data?: any;
    message?: string | null;
  }) {
    this.data = data;
    this.message = message;
  }
  success(response?: Response) {
    return response.status(200).json({
      success: true,
      data: this.data,
      message: this.message ?? "Success",
    });
  }
  created(response: Response) {
    return response.status(201).json({
      success: true,
      data: this.data,
      message: this.message ?? "Created",
    });
  }
  error_500(response: Response) {
    return response.status(500).json({
      success: false,
      data: this.data,
      message: this.message ?? "Failed! Server Error!",
    });
  }
  error_400(response: Response) {
    return response.status(400).json({
      success: false,
      data: this.data,
      message: this.message ?? "Failed! Bad Request!",
    });
  }
  error_401(response: Response) {
    return response.status(401).json({
      success: false,
      data: this.data,
      message: this.message ?? "Failed! Unauthorized!",
    });
  }
  error_404(response: Response) {
    return response.status(404).json({
      success: false,
      data: this.data,
      message: this.message ?? "Failed! Not Found!",
    });
  }
  error_429(response: Response) {
    return response.status(429).json({
      success: false,
      data: this.data,
      message: this.message ?? "Failed! Over Request!",
    });
  }
}

export default CustomResponse;
