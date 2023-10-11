import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import StudentModel from "../model/StudentModel";
import { streamUpload } from "../config/steam";

export const createStudent = async (req: Request, res: Response) => {
  try {
    const { email, password, studentName, schoolName } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const student = await StudentModel.create({
      email,
      password: hash,
      studentName,
      schoolName,
      balance: 0,
    });
    return res.status(201).json({
      data: student,
      message: "Student created successfully",
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const getStudent = async (req: Request, res: Response) => {
  try {
    const student = await StudentModel.find({});
    return res.status(200).json({
      data: student,
      message: "Student successfully viewed",
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const getOneStudent = async (req: Request, res: Response) => {
  try {
    const { studentID } = req.params;
    const student = await StudentModel.findById(studentID);
    return res.status(200).json({
      data: student,
      message: "Student successfully viewed",
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const updateStudentInfo = async (req: Request, res: Response) => {
  try {
    const {studentID } = req.params;
    const { HomeAddress, gender, phoneNumber } = req.body;

    const student = await StudentModel.findByIdAndUpdate(
      studentID,
      {
        HomeAddress,
        gender,
        phoneNumber,
      },
      { new: true }
    );
    return res.status(201).json({
      data: student,
      message: "StudentInfo Updated successfully",
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const updateStudentIMage = async (req: Request, res: Response) => {
  try {
    const { studentID } = req.params;
    const { secure_url, public_id }: any = streamUpload(req);

    const student = await StudentModel.findByIdAndUpdate(
      studentID,
      {
        studentImage: secure_url,
        studentImageID: public_id,
      },
      { new: true }
    );
    return res.status(201).json({
      data: student,
      message: "StudentImage Updated successfully",
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const signInStudent = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const student = await StudentModel.findOne({ email });

    if (student) {
      const check = await bcrypt.compare(password, student.password);
      if (check) {
        return res.status(201).json({
          message: "SignIn successful",
        });
      } else {
        return res.status(403).json({ message: "Incorrect password" });
      }
    } else {
      return res.status(403).json({ message: "student not found" });
    }
  } catch (error: any) {
    return res.status(404).json({ error: error.message });
  }
};
