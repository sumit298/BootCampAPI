import { Request, NextFunction, Response } from "express";
import ErrorResponse from "../utils/errorResponse";
import mongoose from "mongoose";

export interface ErrnoException extends Error {
  errno?: number;
  code?: number;
  path?: string;
  syscall?: string;
  stack?: string;
}

export const errorHandler = (
  err:
    | ErrorResponse
    | mongoose.Error.CastError
    | ErrnoException
    | mongoose.Error.ValidationError, // Adjust the type here
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log(err.stack);
  // console.log(err);
  let error: ErrorResponse;

  // Mongoose bad objectid
  if (err instanceof mongoose.Error.CastError) {
    const message = `Bootcamp not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  } else if ((err as ErrnoException).code === 11000) {
    // Mongoose Duplicate key
    const message = "Duplicate field value entered";
    error = new ErrorResponse(message, 400);
  } else if (err instanceof mongoose.Error.ValidationError) {
    // Mongoose Validation Error
    const message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
    error = new ErrorResponse(message, 400);
  } else {
    error = { ...err } as ErrorResponse;
    error.message = err.message || "Server Error";
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message,
  });
};
