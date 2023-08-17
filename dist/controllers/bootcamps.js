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
// @desc    Get all Bootcamps
// @route   GET /api/v1/bootcamps
// access   Public
const getBootCamps = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allBootcamp = yield Bootcamps_1.default.find();
        res.status(200).json({
            success: true,
            count: allBootcamp.length,
            body: allBootcamp,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getBootCamps = getBootCamps;
// @desc    Get single Bootcamp
// @route   GET /api/v1/bootcamps/:id
// access   Public
const getBootCamp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bootcamp = yield Bootcamps_1.default.findById(req.params.id);
        if (!bootcamp) {
            return next(new errorResponse_1.default(`Bootcamp not found with id of ${req.params.id}`, 404));
        }
        res.status(200).json({
            success: true,
            body: bootcamp,
        });
    }
    catch (error) {
        // res.status(400).json({
        //   success: false,
        // });
        next(error);
    }
});
exports.getBootCamp = getBootCamp;
// @desc    Create a Bootcamp
// @route   POST /api/v1/bootcamps
// access   Private
const createBootcamp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bootcamp = yield Bootcamps_1.default.create(req.body);
        res.status(201).json({
            success: true,
            body: bootcamp,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createBootcamp = createBootcamp;
// @desc    Update Bootcamp
// @route   PUT /api/v1/bootcamps/:id
// access   Private
const updateBootCamp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
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
    }
    catch (error) {
        next(error);
    }
});
exports.updateBootCamp = updateBootCamp;
// @desc    Delete Bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// access   Private
const deleteBootCamp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bootcamp = yield Bootcamps_1.default.findByIdAndDelete(req.params.id);
        if (!bootcamp) {
            return next(new errorResponse_1.default(`Bootcamp not found with id of ${req.params.id}`, 404));
        }
        res.status(200).json({
            success: true,
            data: {},
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteBootCamp = deleteBootCamp;
