// import mongoose,{Schema,Document,Model} from "mongoose";
// interface User{
//     name:string
//     lastName:string
//     email:string
//     password:string
// }
// interface UserDocument extends User,Document{}
// interface UserModel extends Model<UserDocument>{}
// const UserSchema: Schema<UserDocument>= new Schema<UserDocument>({
//     name:{
//         type:String,
//         required:true,
//         trim:true,
//     },
//     lastName:{
//         type:String,
//         required:true,
//         trim:true
//     },
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true,
//         trim: true,
//     }
// },{collection:"users",timestamps:true});
// const User = mongoose.model<UserDocument,UserModel>("User",UserSchema);
// export default User;
//# sourceMappingURL=user_model.js.map