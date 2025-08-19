import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:string,
        require:true
    },
    email:{
        type:string,
        required:true
    },
    password:{
        type:string,
        required:true
    },
    role:{
        type:string,
        enum:["instructor","student"],
        default:"student"
    },
    enrolledCourses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        }
    ],
    photoUrl:{
        type:string,
        default:""
    }
},{timestamps:true});

export default User = mongoose.model("User",userSchema);