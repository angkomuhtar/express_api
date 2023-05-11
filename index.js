import express from "express";
import db from "./config/Database.js";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";

dotenv.config();
const app = express();

try {
  await db.authenticate();
  // ApplQuestion.sync({ alter: true });
  // ApplExperience.sync({ alter: true });
  // ApplFamily.sync({ alter: true });
  // ApplLanguage.sync({ alter: true });
  // ApplExperience.sync({ alter: true });
  // ApplQuestion.sync({ alter: true });
  // appindex;t
} catch (error) {
  console.log("DB Error Connection", error);
}

app.use(fileUpload({ createParentPath: true }));
app.use("/uploads", express.static("uploads"));
app.use(cors({ credentials: true, origin: "*" }));
app.use(cookieParser());
app.use(express.json());
app.use("/v1", routes);
app.listen(process.env.PORT, () =>
  console.log("server Running in PORT " + process.env.PORT)
);
