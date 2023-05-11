import express from "express";
import { Login, refreshToken } from "../controller/AuthController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import UsersGroup from "../models/UsersGroupModel.js";

import "express-group-routes";
import Applicants from "../models/ApplicantsModel.js";
import {
  getDetails,
  getResume,
  postEducation,
  postExp,
  postFamily,
  postQuestion,
  postResume,
} from "../controller/ResumeController.js";

const routes = express.Router();
const app = express();

routes.get("/", async (req, res) => {
  const data = await Applicants.findAll({ include: ["education", "course"] });
  res.json({
    data,
  });
});

routes.group("/auth", (route) => {
  route.post("/login", Login);
  route.get("/refresh_token", refreshToken);
});

// routes.group((route) => {
//   route.use(verifyToken("manager"));
//   route.get("/", (req, res) => {
//     res.status(200).json({
//       msg: "Welcome to API MAM",
//     });
//   });
// });

routes.group("/resume", (route) => {
  route.get("/", getResume);
  route.get("/:id", getDetails);
  route.post("/", postResume);
  route.post("/education", postEducation);
  route.post("/family", postFamily);
  route.post("/experience", postExp);
  route.post("/questions", postQuestion);
});

export default routes;
