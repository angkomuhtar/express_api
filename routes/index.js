import express from "express";
import { Login, logout, refreshToken } from "../controller/AuthController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import "express-group-routes";
import { Profiles, Users } from "../models/index.js";
import {
  checkClockIn,
  getClockById,
  postClockIn,
} from "../controller/ClockController.js";
import moment from "moment";

const routes = express.Router();
const app = express();

routes.get("/", async (req, res) => {
  return res.json({ msg: moment().format("YYYY MM-DD HH:mm:ss") });
});

routes.group("/auth", (route) => {
  route.post("/login", Login);
  route.get("/refresh_token", refreshToken);
  route.get("/logout", logout);
});

routes.group("/clock", (route) => {
  route.use(verifyToken());
  route.get("/history", getClockById);
  route.get("/", checkClockIn);
  route.post("/", postClockIn);
});

export default routes;
