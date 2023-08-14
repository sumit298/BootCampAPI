"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const BootcampSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Please add name"],
        unique: true,
        trim: true,
        maxLength: [50, "Name cannot be greater than 50 characters"],
    },
    slug: String,
    description: {
        type: String,
        required: [true, "Please add description"],
        maxlength: [500, "Description cannot be greater than 500 characters"],
    },
    website: {
        type: String,
        match: [
            /https?:\/\/(www\.)?[-a-zA-z0-9@:%._\+~#=]{1,256}\.[a-zA-z0-9()]{1,6}\b([a-zA-z0-9()@:%_\+.~#?&//=]*)/,
            "Please use a valid URL with HTTP or HTTPS",
        ],
    },
    phone: {
        type: String,
        maxlength: [20, "Phone number cannot be longer than 20 characters"],
    },
    email: {
        type: String,
        match: [
            /^\w+([\.-]?\w+)*@\w([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please add a valid email",
        ],
    },
});
