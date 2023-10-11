import express, { Application, Request, Response } from "express";
import cors from "cors";
import student from "./Router/studentRouter";
import bag from "./Router/bagHistoryRouter";
import fee from "./Router/feeHistoryRouter";
import mongoose from "mongoose";

const port: number = 2054;
const app: Application = express();

const url: string = "mongodb://0.0.0.0:27017/SustanabilityDB";

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

app.listen(port, () => {
  mongoose.connect(url).then(() => {
    console.log("mongodb listening on🚀🚀🚀", port);
  });
});
