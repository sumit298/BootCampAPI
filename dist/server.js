"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const bootcamps_1 = __importDefault(require("./Routes/bootcamps"));
const morgan_1 = __importDefault(require("morgan"));
const db_1 = __importDefault(require("./config/db"));
require("colors");
dotenv_1.default.config({ path: "./config/config.env" });
// Connect to database
(0, db_1.default)();
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.use("/api/v1/bootcamps", bootcamps_1.default);
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server up and running in ${process.env.NODE_ENV} mode on port ${PORT}.`.yellow.bold));
process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    // close the server and exit the process
    server.close(() => process.exit(1));
});
