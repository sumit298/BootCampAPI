"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const slugify_1 = __importDefault(require("slugify"));
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
    address: {
        type: String,
        required: [true, "Please add an address"],
    },
    location: {
        // Geojson Point
        type: String,
        enum: ["Point"],
        // required: true,
        coordinates: {
            type: [Number],
            required: true,
            index: "2dsphere",
        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String,
    },
    careers: {
        // Array of Strings
        type: [String],
        required: true,
        enum: [
            "Web Development",
            "Mobile Development",
            "UI/UX",
            "Data Science",
            "Machine Learning",
            "Business",
            "Other",
        ],
    },
    averageRating: {
        type: Number,
        min: [1, "Rating must be atleast 1"],
        max: [10, "Rating must can not be more than 10"],
    },
    averageCost: Number,
    photo: {
        type: String,
        default: "no-photo.jpg",
    },
    housing: {
        type: Boolean,
        default: false,
    },
    jobAssistance: {
        type: Boolean,
        default: false,
    },
    jobGuarantee: {
        type: Boolean,
        default: false,
    },
    acceptGi: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});
BootcampSchema.pre("save", function (next) {
    if (this.name) {
        this.slug = (0, slugify_1.default)(this.name, { lower: true });
    }
    next();
});
exports.default = mongoose_1.default.model("Bootcamp", BootcampSchema);
