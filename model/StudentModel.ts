import mongoose from "mongoose";

interface iStudent{
    email: string;
    password: string;
    studentName: string;
    phoneNumber: string;
    schoolName: string;
    HomeAddress: string;
    studentImage: string;
    studentImageID: string;
    gender: string;
    balance: number;
    feesHistory: Array<{}>;
    bagsHistory: Array<{}>;
}

interface iStudentData extends iStudent, mongoose.Document{}

const studentModel= new mongoose.Schema<iStudentData>({
    studentName: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    schoolName: {
        type: String,
    },
    password: {
        type: String,
    },
    HomeAddress: {
        type: String,
    },
    studentImage: {
        type: String,
    },
    studentImageID: {
        type: String,
    },
 email: {
        type: String,
        unique: true,
    },
    gender: {
        type: String,
    },
    balance: {
        type: Number,
    },
    feesHistory: [{
        type: mongoose.Types.ObjectId,
        ref: "fees"
    }],
    bagsHistory: [{
        type: mongoose.Types.ObjectId,
        ref: "bags"
    }],
},{timestamps:true})

export default mongoose.model<iStudentData>("students", studentModel)