import { Request, Response, NextFunction } from "express";
import Bootcamps from "../models/Bootcamps";
import ErrorResponse from "../utils/errorResponse";

// @desc    Get all Bootcamps
// @route   GET /api/v1/bootcamps
// access   Public
export const getBootCamps = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allBootcamp = await Bootcamps.find();
    res.status(200).json({
      success: true,
      count: allBootcamp.length,
      body: allBootcamp,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single Bootcamp
// @route   GET /api/v1/bootcamps/:id
// access   Public
export const getBootCamp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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
  } catch (error) {
    // res.status(400).json({
    //   success: false,
    // });
    next(error);
  }
};

// @desc    Create a Bootcamp
// @route   POST /api/v1/bootcamps
// access   Private
export const createBootcamp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bootcamp = await Bootcamps.create(req.body);
    res.status(201).json({
      success: true,
      body: bootcamp,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update Bootcamp
// @route   PUT /api/v1/bootcamps/:id
// access   Private
export const updateBootCamp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

// @desc    Delete Bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// access   Private
export const deleteBootCamp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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
  } catch (error) {
    next(error);
  }
};
