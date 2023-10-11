import express, { Request, Response } from "express";
import mongoose from "mongoose";
import StudentModel from "../model/StudentModel";
import feeModel from "../model/feeModel";

export const createFeesRecord = async (req: Request, res: Response) => {
  try {
    const { cash, email } = req.body;

    const getUser = await StudentModel.findOne({ email });
    if (getUser) {
      const feeInfo = await feeModel.create({
        cash,
        studentID: getUser?._id,
        schoolName: getUser?.schoolName,
      });
      await StudentModel.findByIdAndUpdate(
        getUser._id,
        {
          balance: getUser?.balance - feeInfo?.cash,
        },
        { new: true }
      );

      getUser.feesHistory.push(new mongoose.Types.ObjectId(feeInfo?._id));
      getUser.save();

      return res.status(201).json({
        message: "created successfully",
        data: feeInfo,
      });
    } else {
      return res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error: any) {
    return res.status(404).json({ message: error.message });
  }
};

export const viewFeeRecord = async (req: Request, res: Response) => {
  try {
    const { studentID } = req.params;

    const getUser = await StudentModel.findById(studentID).populate({
      path: "feeHistory",
      options: {
        sort: {
          createdAt: -1,
        },
      },
    });
  } catch (error: any) {
    return res.status(404).json({ message: error.message });
  }
};
