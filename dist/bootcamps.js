"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.status(200).json({ success: true, msg: "Show all bootcamps" });
});
router.get("/:id", (req, res) => {
    res
        .status(200)
        .json({ success: true, msg: `Show bootcamp ${req.params.id}` });
});
router.post("/", (req, res) => {
    res.status(201).json({ success: true, msg: "Create new bootcamps" });
});
router.put("/:id", (req, res) => {
    res
        .status(200)
        .json({ success: true, msg: `Update bootcamp ${req.params.id}` });
});
router.delete("/:id", (req, res) => {
    res
        .status(200)
        .json({ success: true, msg: `Delete bootcamp ${req.params.id}` });
});
exports.default = router;
