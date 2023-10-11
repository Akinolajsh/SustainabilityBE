"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studentController_1 = require("../controller/studentController");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)().single("avatar");
const router = express_1.default.Router();
router.route("/create-student").post(studentController_1.createStudent);
router.route("/sign-in-student").post(studentController_1.signInStudent);
router.route("/view-student").get(studentController_1.getStudent);
router.route("/:studentID/view-one-student").get(studentController_1.getOneStudent);
router.route("/:studentID/update-student-info").patch(studentController_1.updateStudentInfo);
router.route("/:studentID/update-student-image").patch(upload, studentController_1.updateStudentIMage);
exports.default = router;
