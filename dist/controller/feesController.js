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
exports.viewFeeRecord = exports.createFeesRecord = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const StudentModel_1 = __importDefault(require("../model/StudentModel"));
const feeModel_1 = __importDefault(require("../model/feeModel"));
const createFeesRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cash, email } = req.body;
        const getUser = yield StudentModel_1.default.findOne({ email });
        if (getUser) {
            const feeInfo = yield feeModel_1.default.create({
                cash,
                studentID: getUser === null || getUser === void 0 ? void 0 : getUser._id,
                schoolName: getUser === null || getUser === void 0 ? void 0 : getUser.schoolName,
            });
            yield StudentModel_1.default.findByIdAndUpdate(getUser._id, {
                balance: (getUser === null || getUser === void 0 ? void 0 : getUser.balance) - (feeInfo === null || feeInfo === void 0 ? void 0 : feeInfo.cash),
            }, { new: true });
            getUser.feesHistory.push(new mongoose_1.default.Types.ObjectId(feeInfo === null || feeInfo === void 0 ? void 0 : feeInfo._id));
            getUser.save();
            return res.status(201).json({
                message: "created successfully",
                data: feeInfo,
            });
        }
        else {
            return res.status(404).json({
                message: "User not found",
            });
        }
    }
    catch (error) {
        return res.status(404).json({ message: error.message });
    }
});
exports.createFeesRecord = createFeesRecord;
const viewFeeRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentID } = req.params;
        const getUser = yield StudentModel_1.default.findById(studentID).populate({
            path: "feeHistory",
            options: {
                sort: {
                    createdAt: -1,
                },
            },
        });
    }
    catch (error) {
        return res.status(404).json({ message: error.message });
    }
});
exports.viewFeeRecord = viewFeeRecord;
