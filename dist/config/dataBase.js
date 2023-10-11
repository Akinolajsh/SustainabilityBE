"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Db = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Db = () => {
    try {
        mongoose_1.default.connect(process.env.DATABASE)
            .then(() => {
            console.log("Database connection established");
        })
            .catch((error) => {
            console.log("unable to connect to database");
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.Db = Db;
