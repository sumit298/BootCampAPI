import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import router from "./Routes/bootcamps";
import morgan from 'morgan';
dotenv.config({ path: "./config/config.env" });

const app = express();

app.use(morgan('dev'));
app.use("/api/v1/bootcamps", router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `Server up and running in ${process.env.NODE_ENV} mode on port ${PORT}.`
  )
);
