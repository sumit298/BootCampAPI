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
exports.deleteBootCamp = exports.updateBootCamp = exports.createBootcamp = exports.getBootCamp = exports.getBootCamps = void 0;
const Bootcamps_1 = __importDefault(require("../models/Bootcamps"));
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
const async_1 = require("../middleware/async");
// @desc    Get all Bootcamps
// @route   GET /api/v1/bootcamps
// access   Public
exports.getBootCamps = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const allBootcamp = yield Bootcamps_1.default.find();
    res.status(200).json({
        success: true,
        count: allBootcamp.length,
        body: allBootcamp,
    });
}));
// @desc    Get single Bootcamp
// @route   GET /api/v1/bootcamps/:id
// access   Public
exports.getBootCamp = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bootcamp = yield Bootcamps_1.default.findById(req.params.id);
    if (!bootcamp) {
        return next(new errorResponse_1.default(`Bootcamp not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({
        success: true,
        body: bootcamp,
    });
}));
// @desc    Create a Bootcamp
// @route   POST /api/v1/bootcamps
// access   Private
exports.createBootcamp = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bootcamp = yield Bootcamps_1.default.create(req.body);
    res.status(201).json({
        success: true,
        body: bootcamp,
    });
}));
// @desc    Update Bootcamp
// @route   PUT /api/v1/bootcamps/:id
// access   Private
exports.updateBootCamp = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bootcamp = yield Bootcamps_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true, // mongoose validators
    });
    if (!bootcamp) {
        return next(new errorResponse_1.default(`Bootcamp not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({
        success: true,
        data: bootcamp,
    });
}));
// @desc    Delete Bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// access   Private
exports.deleteBootCamp = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bootcamp = yield Bootcamps_1.default.findByIdAndDelete(req.params.id);
    if (!bootcamp) {
        return next(new errorResponse_1.default(`Bootcamp not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({
        success: true,
        data: {},
    });
}));
