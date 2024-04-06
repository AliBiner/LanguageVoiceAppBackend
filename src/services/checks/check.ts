import { Document, Model, Schema } from "mongoose";


export async function checkValueAtDb<T extends Document>(value:{},model:Model<T>):Promise<boolean> {
    const control = await model.findOne(value)
    if (control==null) {
        return true
    } else {
        return false
    }
}