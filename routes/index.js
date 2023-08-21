import express from "express";
import { Login, logout, refreshToken } from "../controller/AuthController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import "express-group-routes";
import {
  checkClockIn,
  getClockById,
  postClockIn,
} from "../controller/ClockController.js";
import Users from "../database/models/users.js";

const routes = express.Router();
const app = express();

routes.get("/", async (req, res) => {
  let data = await Users.findAndCountAll();
  if (err) {
    console.log(err);
  }
  return res.json({ msg: data, hash: hash });
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
