"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const bootcamps_1 = require("../controllers/bootcamps");
router.route("/").get(bootcamps_1.getBootCamps).post(bootcamps_1.createBootcamp);
router
    .route("/:id")
    .get(bootcamps_1.getBootCamp)
    .put(bootcamps_1.updateBootCamp)
    .delete(bootcamps_1.deleteBootCamp);
exports.default = router;
