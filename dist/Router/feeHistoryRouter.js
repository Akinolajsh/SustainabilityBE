"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const feesController_1 = require("../controller/feesController");
const router = express_1.default.Router();
router.route("/:studentID/create-student-fee").post(feesController_1.createFeesRecord);
router.route("/:studentID/view-student-fee").get(feesController_1.viewFeeRecord);
exports.default = router;
