import express, { Application, Request, Response } from "express";
import cors from "cors";
import student from "./Router/studentRouter";
import bag from "./Router/bagHistoryRouter";
import fee from "./Router/feeHistoryRouter";
import mongoose from "mongoose";
import env from "dotenv"
import { Db } from "./config/dataBase";
env.config()


const port: number = parseInt(process.env.PORT! );
const app: Application = express();


app.use(cors());
app.use(express.json());

app.use("/api", student);
app.use("/api", bag);
app.use("/api", fee);

app.get("/api", (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      message: "Success",
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(process.env.PORT || port, () => {
    console.log("mongodb listening on🚀🚀🚀", port);
  Db()
});
