"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
// @desc    Logs request to console
const logger = (req, res, next) => {
    req.newURL = `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl} `;
    console.log(`${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl} `);
    next();
};
exports.logger = logger;
