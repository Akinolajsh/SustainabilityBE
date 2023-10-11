"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInStudent = exports.updateStudentIMage = exports.updateStudentInfo = exports.getOneStudent = exports.getStudent = exports.createStudent = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const StudentModel_1 = __importDefault(require("../model/StudentModel"));
const steam_1 = require("../config/steam");
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, studentName, schoolName } = req.body;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(password, salt);
        const student = yield StudentModel_1.default.create({
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
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
});
exports.createStudent = createStudent;
const getStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield StudentModel_1.default.find({});
        return res.status(200).json({
            data: student,
            message: "Student successfully viewed",
        });
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
});
exports.getStudent = getStudent;
const getOneStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentID } = req.params;
        const student = yield StudentModel_1.default.findById(studentID);
        return res.status(200).json({
            data: student,
            message: "Student successfully viewed",
        });
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
});
exports.getOneStudent = getOneStudent;
const updateStudentInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentID } = req.params;
        const { HomeAddress, gender, phoneNumber } = req.body;
        const student = yield StudentModel_1.default.findByIdAndUpdate(studentID, {
            HomeAddress,
            gender,
            phoneNumber,
        }, { new: true });
        return res.status(201).json({
            data: student,
            message: "StudentInfo Updated successfully",
        });
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
});
exports.updateStudentInfo = updateStudentInfo;
const updateStudentIMage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentID } = req.params;
        const { secure_url, public_id } = (0, steam_1.streamUpload)(req);
        const student = yield StudentModel_1.default.findByIdAndUpdate(studentID, {
            studentImage: secure_url,
            studentImageID: public_id,
        }, { new: true });
        return res.status(201).json({
            data: student,
            message: "StudentImage Updated successfully",
        });
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
});
exports.updateStudentIMage = updateStudentIMage;
const signInStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const student = yield StudentModel_1.default.findOne({ email });
        if (student) {
            const check = yield bcrypt_1.default.compare(password, student.password);
            if (check) {
                return res.status(201).json({
                    message: "SignIn successful",
                });
            }
            else {
                return res.status(403).json({ message: "Incorrect password" });
            }
        }
        else {
            return res.status(403).json({ message: "student not found" });
        }
    }
    catch (error) {
        return res.status(404).json({ error: error.message });
    }
});
exports.signInStudent = signInStudent;
