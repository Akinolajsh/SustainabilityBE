import mongoose from "mongoose";

interface iFee{
    studentID: string;
    schoolName: string;
    cash: number;
}

interface iFeeData extends iFee, mongoose.Document{}

const feeModel= new mongoose.Schema<iFeeData>({
    studentID: {
        type: String,
    },
    schoolName: {
        type: String,
    },
    cash: {
        type: Number,
    },
   
},{timestamps:true})

export default mongoose.model<iFeeData>("fees", feeModel)