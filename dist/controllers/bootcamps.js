"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBootCamp = exports.updateBootCamp = exports.createBootcamp = exports.getBootCamp = exports.getBootCamps = void 0;
// @desc    Get all Bootcamps
// @route   GET /api/v1/bootcamps
// access   Public
const getBootCamps = (req, res, next) => {
    res
        .status(200)
        .json({ success: true, msg: "Show all bootcamps", newURL: req.newURL });
};
exports.getBootCamps = getBootCamps;
// @desc    Get single Bootcamp
// @route   GET /api/v1/bootcamps/:id
// access   Public
const getBootCamp = (req, res, next) => {
    res
        .status(200)
        .json({ success: true, msg: `Show bootcamp ${req.params.id}` });
};
exports.getBootCamp = getBootCamp;
// @desc    Create a Bootcamp
// @route   POST /api/v1/bootcamps
// access   Private
const createBootcamp = (req, res, next) => {
    res.status(201).json({ success: true, msg: "Create new bootcamps" });
};
exports.createBootcamp = createBootcamp;
// @desc    Update Bootcamp
// @route   PUT /api/v1/bootcamps/:id
// access   Private
const updateBootCamp = (req, res, next) => {
    res
        .status(200)
        .json({ success: true, msg: `Update bootcamp ${req.params.id}` });
};
exports.updateBootCamp = updateBootCamp;
// @desc    Delete Bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// access   Private
const deleteBootCamp = (req, res, next) => {
    res
        .status(200)
        .json({ success: true, msg: `Delete bootcamp ${req.params.id}` });
};
exports.deleteBootCamp = deleteBootCamp;
