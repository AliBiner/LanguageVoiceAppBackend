import { Request, Response } from "express";
import CustomResponse from "../utils/responses";
import User from "../models/user.model";
import bcrypt from "bcrypt"
import { checkValueAtDb } from "./checks/check";
import { createToken } from "../middlewares/token/auth";

export async function authServiceLogin(request:Request,response:Response):Promise<Response> {
    const {email,password} = request.body
    const userCheck = await User.findOne({email})
    if (userCheck==null) {
        return new CustomResponse({message:"Email or Password Incorrect"}).error_400(response)
    }
    const comparePass = await bcrypt.compare(password,userCheck.password)
    if (comparePass===false) {
        return new CustomResponse({message:"Email or Password Incorrect"}).error_400(response)
    } else {

        await createToken(userCheck.id,userCheck,response)
    }
}

export async function authServiceRegister(req:Request,res:Response):Promise<Response> {
    const {email,password} = req.body
    if (await checkValueAtDb({email},User)===false) {
        return new CustomResponse({data:email,message:"Email is already correct"}).error_400(res)
    }
    const cryptPass = await bcrypt.hash(password,10)
    req.body.password = cryptPass
    const userToRegister = new User(req.body)
    await userToRegister.save()
        .then(data=>{
            return new CustomResponse({data,message:"Saved User"}).created(res)
        })
        .catch((error:Error)=>{
            return new CustomResponse({message:error.message}).error_400(res)
        })
}
