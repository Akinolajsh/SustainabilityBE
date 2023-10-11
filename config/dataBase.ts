import mongoose from "mongoose";

export const Db = () => {
try {
    mongoose.connect(process.env.DATABASE!)
    .then(()=> {
        console.log("Database connection established");
    })
    .catch ((error: Error) =>{
console.log("unable to connect to database");
    })
} catch (error) {
    console.log(error)
}}