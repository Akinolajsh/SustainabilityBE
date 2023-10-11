"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const studentModel = new mongoose_1.default.Schema({
    studentName: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    schoolName: {
        type: String,
    },
    password: {
        type: String,
    },
    HomeAddress: {
        type: String,
    },
    studentImage: {
        type: String,
    },
    studentImageID: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    gender: {
        type: String,
    },
    balance: {
        type: Number,
    },
    feesHistory: [{
            type: mongoose_1.default.Types.ObjectId,
            ref: "fees"
        }],
    bagsHistory: [{
            type: mongoose_1.default.Types.ObjectId,
            ref: "bags"
        }],
}, { timestamps: true });
exports.default = mongoose_1.default.model("students", studentModel);
