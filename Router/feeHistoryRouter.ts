import express from "express";
import { createFeesRecord, viewFeeRecord } from "../controller/feesController";

const router = express.Router();

router.route("/:studentID/create-student-fee").post(createFeesRecord);

router.route("/:studentID/view-student-fee").get(viewFeeRecord);

export default router;
