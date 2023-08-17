"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
const mongoose_1 = __importDefault(require("mongoose"));
const errorHandler = (err, // Adjust the type here
req, res, next) => {
    // console.log(err.stack);
    // console.log(err);
    let error;
    // Mongoose bad objectid
    if (err instanceof mongoose_1.default.Error.CastError) {
        const message = `Bootcamp not found with id of ${err.value}`;
        error = new errorResponse_1.default(message, 404);
    }
    else if (err.code === 11000) {
        // Mongoose Duplicate key
        const message = "Duplicate field value entered";
        error = new errorResponse_1.default(message, 400);
    }
    else if (err instanceof mongoose_1.default.Error.ValidationError) {
        // Mongoose Validation Error
        const message = Object.values(err.errors)
            .map((val) => val.message)
            .join(", ");
        error = new errorResponse_1.default(message, 400);
    }
    else {
        error = Object.assign({}, err);
        error.message = err.message || "Server Error";
    }
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message,
    });
};
exports.errorHandler = errorHandler;
