import * as joi from "joi";
import CustomResponse from "../../utils/responses";
import { Response, Request, NextFunction } from "express";
class AuthValidation {
  static login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await joi
        .object({
          email: joi.string().email().trim().min(3).max(100).required(),
          password: joi
            .string()
            .trim()
            .min(6)
            .max(18)
            .required()
            .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
        })
        .validateAsync(req.body);
    } catch (error) {
      if (error.details && error.details[0].message) {
        return new CustomResponse({
          message: error.details[0].message,
        }).error_400(res);
      } else {
        return new CustomResponse({
          message: "Please enter a valid model json",
        }).error_400(res);
      }
    }
    next();
  };

  static register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await joi
        .object({
          firstName: joi.string().trim().min(3).max(100).required(),
          middleName: joi.string().trim().min(3).max(100),
          lastName: joi.string().trim().min(3).max(100).required(),
          email: joi.string().email().trim().min(3).max(100).required(),
          password: joi
            .string()
            .trim()
            .min(6)
            .max(18)
            .required()
            .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
          repeatPassword: joi.ref("password"),
        })
        .validateAsync(req.body);
    } catch (error) {
      if (error.details && error.details[0].message) {
        return new CustomResponse({
          message: error.details[0].message,
        }).error_400(res);
      } else {
        return new CustomResponse({
          message: "Please enter a valid model json",
        }).error_400(res);
      }
    }
    next();
  };
}

export default AuthValidation;
