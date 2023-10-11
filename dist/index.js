"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const studentRouter_1 = __importDefault(require("./Router/studentRouter"));
const bagHistoryRouter_1 = __importDefault(require("./Router/bagHistoryRouter"));
const feeHistoryRouter_1 = __importDefault(require("./Router/feeHistoryRouter"));
const dotenv_1 = __importDefault(require("dotenv"));
const dataBase_1 = require("./config/dataBase");
dotenv_1.default.config();
const port = parseInt(process.env.PORT);
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api", studentRouter_1.default);
app.use("/api", bagHistoryRouter_1.default);
app.use("/api", feeHistoryRouter_1.default);
app.get("/api", (req, res) => {
    try {
        return res.status(200).json({
            message: "Success",
        });
    }
    catch (error) {
        console.log(error);
    }
});
app.listen(process.env.PORT || port, () => {
    console.log("mongodb listening on🚀🚀🚀", port);
    (0, dataBase_1.Db)();
});
