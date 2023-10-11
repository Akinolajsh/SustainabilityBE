import express from 'express';
import { createStudent, getOneStudent, getStudent, signInStudent, updateStudentIMage, updateStudentInfo } from '../controller/studentController';
import multer from 'multer';

const upload=  multer().single("avatar")

const router= express.Router();


router.route("/create-student").post(createStudent)
router.route("/sign-in-student").post(signInStudent)

router.route("/view-student").get(getStudent)
router.route("/:studentID/view-one-student").get(getOneStudent)

router.route("/:studentID/update-student-info").patch(updateStudentInfo)
router.route("/:studentID/update-student-image").patch(upload,updateStudentIMage)


export default router