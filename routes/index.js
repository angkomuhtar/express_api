import express from "express";
import { Login, logout, refreshToken } from "../controller/AuthController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import "express-group-routes";
import {
  checkClockIn,
  getClockById,
  postClockIn,
} from "../controller/ClockController.js";
import { Clock, Profile, Users } from "../database/models/index.js";
import bcrypt from "bcrypt";
import moment from "moment";

const routes = express.Router();
const app = express();

routes.get("/", async (req, res) => {
  let data = await Clock.findAndCountAll({
    include: [{ model: Users }],
  });
  return res.json({ msg: data });
});

routes.get("/generate", async (req, res) => {
  bcrypt
    .genSalt(parseInt(process.env.SALT_ROUND))
    .then((salt) => {
      console.log("Salt: ", salt);
      return bcrypt.hash("secret", salt);
    })
    .then(async (hash) => {
      console.log("Hash: ", hash);
      Users.create({
        username: "Admin",
        email: "admin@api.com",
        password: hash,
        status: "Y",
        user_tipe: "Administrator",
        refresh_token: null,
        phone_id: null,
        createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
      })
        .then(async (data) => {
          // console.log(data);
          await Profile.create({
            user_id: data.id,
            first_name: "Admin",
            last_name: "API",
            phone: "083555555",
            gender: "M",
            avatar: "",
            createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
            updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          });
          return res.json({
            msg: data,
          });
        })
        .catch((err) => {
          res.json({
            msg: err,
          });
        });

      // return res.json({ msg: user });
    })
    .catch((err) => console.error(err.message));
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
