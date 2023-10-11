import express, { Request, Response } from "express";
import mongoose from "mongoose";
import StudentModel from "../model/StudentModel";
import bagModel from "../model/bagModel";

export const createBagRecord = async (req: Request, res: Response) => {
  try {
    const { bag, email } = req.body;

    const getUser = await StudentModel.findOne({ email });

    if (getUser) {
      const bagInfo = await bagModel.create({
        bag,
        cash: bag * 200,
      });

      await StudentModel.findByIdAndUpdate(
        getUser._id,
        {
          balance: getUser?.balance + bagInfo?.cash,
        },
        { new: true }
      );

      getUser.bagsHistory.push(new mongoose.Types.ObjectId(bagInfo?._id));
      getUser.save();

      return res.status(201).json({
        message: "created",
        data: bagInfo,
      });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    return res.status(404).json({ message: error.message });
  }
};

export const viewBagRecord = async (req: Request, res: Response) => {
  try {
    const { studentID } = req.params;

    const getUser = await StudentModel.findById(studentID).populate({
      path: "bagHistory",
      options: {
        sort: {
          createdAt: -1,
        },
      },
    });

    return res.status(200).json({
      message: "Bag record view successfully",
      data: getUser,
    });
  } catch (error: any) {
    return res.status(404).json({ message: error.message });
  }
};
