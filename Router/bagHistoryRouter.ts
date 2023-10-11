import express from 'express';
import { createBagRecord, viewBagRecord } from '../controller/bagController';

const router= express.Router();


router.route("/:studentID/create-student-bag").post(createBagRecord)

router.route("/:studentID/view-student-bag").get(viewBagRecord)


export default router