import { NextFunction, Request, Response } from "express";


// @desc    Logs request to console
export const logger = (req: any, res: any, next: NextFunction) => {
  req.newURL = `${req.method} ${req.protocol}://${req.get("host")}${
    req.originalUrl
  } `;
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl} `
  );
  next();
};
