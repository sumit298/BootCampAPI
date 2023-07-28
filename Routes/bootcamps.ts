import express from "express";
const router = express.Router();
import {
  createBootcamp,
  deleteBootCamp,
  getBootCamp,
  getBootCamps,
  updateBootCamp,
} from "../controllers/bootcamps";

router.route("/").get(getBootCamps).post(createBootcamp);

router
  .route("/:id")
  .get(getBootCamp)
  .put(updateBootCamp)
  .delete(deleteBootCamp);

export default router;
