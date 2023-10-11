import mongoose from "mongoose";

interface iBag{
    student: {};
    bag: number;
    cash: number;
}

interface iBagData extends iBag, mongoose.Document{}

const bagModel= new mongoose.Schema<iBagData>({
    student: {
        type: mongoose.Types.ObjectId,
        ref: "bags"
    },
    bag: {
        type: Number,
    },
    cash: {
        type: Number,
    },
   
},{timestamps:true})

export default mongoose.model<iBagData>("bags", bagModel)