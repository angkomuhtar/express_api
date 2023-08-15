import express from "express";
import db from "./config/Database.js";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import cron from "node-cron";
import { CreateAbsen } from "./controller/ClockController.js";

dotenv.config();
const app = express();

app.use(fileUpload({ createParentPath: true }));
app.use("/uploads", express.static("uploads"));
app.use(cors({ credentials: true, origin: "*" }));
app.use(cookieParser());
app.use(express.json());

cron.schedule("30 8 * * *", () => {
  CreateAbsen();
});
app.use("/v1", routes);

app.listen(process.env.PORT, () =>
  console.log("server Running in PORT " + process.env.PORT)
);
