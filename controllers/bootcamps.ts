import { Request, Response, NextFunction } from "express";

// @desc    Get all Bootcamps
// @route   GET /api/v1/bootcamps
// access   Public
export const getBootCamps = (req: any, res: Response, next: NextFunction) => {
  res
    .status(200)
    .json({ success: true, msg: "Show all bootcamps", newURL: req.newURL });
};

// @desc    Get single Bootcamp
// @route   GET /api/v1/bootcamps/:id
// access   Public
export const getBootCamp = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res
    .status(200)
    .json({ success: true, msg: `Show bootcamp ${req.params.id}` });
};

// @desc    Create a Bootcamp
// @route   POST /api/v1/bootcamps
// access   Private
export const createBootcamp = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(201).json({ success: true, msg: "Create new bootcamps" });
};

// @desc    Update Bootcamp
// @route   PUT /api/v1/bootcamps/:id
// access   Private
export const updateBootCamp = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res
    .status(200)
    .json({ success: true, msg: `Update bootcamp ${req.params.id}` });
};

// @desc    Delete Bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// access   Private
export const deleteBootCamp = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete bootcamp ${req.params.id}` });
};
