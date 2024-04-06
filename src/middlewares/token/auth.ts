import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import CustomResponse from "../..//utils/responses";
import User from "../../models/user.model";

export async function createToken(userId:string,userObject:User,res:Response):Promise<Response> {

    const payload = {
        sub:userId,
        name:userObject.name
    }
    const token = await jwt.sign(payload,process.env.JWT_SECRET_KEY,{
        algorithm:"HS512",
        expiresIn:process.env.JWT_EXPIRES_IN
    })
    return res.status(201).json({
        success:true,
        token,
        message:"Created Token"
    })
}

export async function tokenCheck(req:Request,res:Response,next:NextFunction) {
    const headerToken = req.headers.authorization && req.headers.authorization.startsWith("Bearer ")

    if (!headerToken) {
        return new CustomResponse({message:"Please enter a token"}).error_401(res)
    }
    const token = req.headers.authorization.split(" ")[1]

    await jwt.verify(token,process.env.JWT_SECRET_KEY,async (err:Error,decoded:string | jwt.JwtPayload) => {
        if (err) return new CustomResponse({message:"Undefined Token"}).error_401(res)
        const userInfo= await User.findById(decoded.sub)
        if(!userInfo){
            return new CustomResponse({message:"Not found User"}).error_401(res)
        }
        next()
    })
}