import mongoose from "mongoose";

let flag : Boolean = false;

export async function connectDb()
{
    if(flag)
    {
        return;
    }
    flag = true;
    return await mongoose.connect('mongodb+srv://Aviral_Singh:Aviral%40001@cluster0.hcnv856.mongodb.net/courses', {dbName: "courses"});
}
