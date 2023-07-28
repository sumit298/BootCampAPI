"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const bootcamps_1 = __importDefault(require("./Routes/bootcamps"));
const morgan_1 = __importDefault(require("morgan"));
dotenv_1.default.config({ path: "./config/config.env" });
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use("/api/v1/bootcamps", bootcamps_1.default);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server up and running in ${process.env.NODE_ENV} mode on port ${PORT}.`));
