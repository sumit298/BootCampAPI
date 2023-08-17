import { Request, Response, NextFunction } from "express";
import Bootcamps from "../models/Bootcamps";
import ErrorResponse from "../utils/errorResponse";
import { asyncHandler } from "../middleware/async";

// @desc    Get all Bootcamps
// @route   GET /api/v1/bootcamps
// access   Public
export const getBootCamps = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const allBootcamp = await Bootcamps.find();
    res.status(200).json({
      success: true,
      count: allBootcamp.length,
      body: allBootcamp,
    });
  }
);

// @desc    Get single Bootcamp
// @route   GET /api/v1/bootcamps/:id
// access   Public
export const getBootCamp = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const bootcamp = await Bootcamps.findById(req.params.id);
    if (!bootcamp) {
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    }
    res.status(200).json({
      success: true,
      body: bootcamp,
    });
  }
);

// @desc    Create a Bootcamp
// @route   POST /api/v1/bootcamps
// access   Private
export const createBootcamp = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const bootcamp = await Bootcamps.create(req.body);
    res.status(201).json({
      success: true,
      body: bootcamp,
    });
  }
);

// @desc    Update Bootcamp
// @route   PUT /api/v1/bootcamps/:id
// access   Private
export const updateBootCamp = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const bootcamp = await Bootcamps.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // when we get our response, we want data to be updated data
        runValidators: true, // mongoose validators
      }
    );
    if (!bootcamp) {
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    }
    res.status(200).json({
      success: true,
      data: bootcamp,
    });
  }
);

// @desc    Delete Bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// access   Private
export const deleteBootCamp = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const bootcamp = await Bootcamps.findByIdAndDelete(req.params.id);
    if (!bootcamp) {
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    }
    res.status(200).json({
      success: true,
      data: {},
    });
  }
);
