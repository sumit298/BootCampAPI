import express from "express";
import dotenv from "dotenv";
import router from "./Routes/bootcamps";
import morgan from "morgan";
import connectDB from "./config/db";
import "colors";
dotenv.config({ path: "./config/config.env" });
import {errorHandler} from './middleware/error';

// Connect to database
connectDB();
const app = express();

// Use body parser
app.use(express.json());

app.use(morgan("dev"));
app.use("/api/v1/bootcamps", router);

app.use(errorHandler)

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(
    `Server up and running in ${process.env.NODE_ENV} mode on port ${PORT}.`
      .yellow.bold
  )
);

process.on("unhandledRejection", (err: Error, promise) => {
  console.log(`Error: ${err.message}`.red);
  // close the server and exit the process
  server.close(() => process.exit(1));
});
