import express from "express";
import db from "./config/Database.js";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import Applicants from "./models/ApplicantsModel.js";
import ApplEducation from "./models/ApplEducationModel.js";
import ApplCourse from "./models/ApplCourseModel.js";
import ApplContact from "./models/ApplContactModel.js";
import ApplFamily from "./models/ApplFamilyModel.js";
import ApplLanguage from "./models/ApplLanguageModel.js";
import ApplExperience from "./models/ApplExperienceModel.js";
import ApplQuestion from "./models/ApplQuestionModel.js";
import fileUpload from "express-fileupload";

dotenv.config();
const app = express();

try {
  await db.authenticate();
  // Applicants.sync({ alter: true });
  // ApplFamily.sync({ alter: true });
  // ApplLanguage.sync({ alter: true });
  // ApplExperience.sync({ alter: true });
  // ApplQuestion.sync({ alter: true });
  // app.use(inde)
} catch (error) {
  console.log("DB Error Connection", error);
}

app.use(fileUpload({ createParentPath: true }));
app.use("/uploads", express.static("uploads"));
app.use(cors({ credentials: true, origin: "*" }));
app.use(cookieParser());
app.use(express.json());
app.use("/v1", routes);
app.listen(3002, () => console.log("server Running in PORT 3002"));
