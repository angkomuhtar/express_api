import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import ApplCourse from "./ApplCourseModel.js";
import ApplEducation from "./ApplEducationModel.js";
import ApplLanguage from "./ApplLanguageModel.js";
import ApplContact from "./ApplContactModel.js";
import ApplFamily from "./ApplFamilyModel.js";
import ApplExperience from "./ApplExperienceModel.js";
import ApplQuestion from "./ApplQuestionModel.js";

const { DataTypes } = Sequelize;
const Applicants = db.define(
  "applicants",
  {
    id: {
      type: DataTypes.INTEGER(10),
      autoIncrement: true,
      primaryKey: true,
    },
    nama: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    position: DataTypes.STRING(100),
    address: DataTypes.STRING(100),
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    phone: DataTypes.STRING(15),
    photo: DataTypes.STRING(100),
    citizen: DataTypes.STRING(60),
    religion: DataTypes.STRING(60),
    hobby: DataTypes.STRING(100),
    id_card: DataTypes.STRING(100),
    tempat_lahir: DataTypes.STRING(50),
    tgl_lahir: DataTypes.DATEONLY,
    height: DataTypes.INTEGER(10),
    weight: DataTypes.INTEGER(10),
    gender: DataTypes.ENUM("M", "F"),
    married: DataTypes.STRING(25),
    residence: DataTypes.STRING(25),
    vehicle: DataTypes.STRING(25),
    health: DataTypes.STRING(25),
    pantangan: DataTypes.TEXT,
    last_sick: DataTypes.TEXT,
    ipk: DataTypes.DECIMAL(5, 2),
    alasan_sekolah: DataTypes.TEXT,
    alasan_berhenti_sekolah: DataTypes.TEXT,
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

Applicants.hasMany(ApplContact, {
  as: "contact",
  sourceKey: "id",
  foreignKey: "appl_id",
});

Applicants.hasMany(ApplCourse, {
  as: "course",
  sourceKey: "id",
  foreignKey: "appl_id",
});
Applicants.hasMany(ApplEducation, {
  as: "education",
  sourceKey: "id",
  foreignKey: "appl_id",
});
Applicants.hasMany(ApplExperience, {
  as: "experience",
  sourceKey: "id",
  foreignKey: "appl_id",
});
Applicants.hasMany(ApplFamily, {
  as: "family",
  sourceKey: "id",
  foreignKey: "appl_id",
});
Applicants.hasMany(ApplLanguage, {
  as: "language",
  sourceKey: "id",
  foreignKey: "appl_id",
});
Applicants.hasMany(ApplQuestion, {
  as: "question",
  sourceKey: "id",
  foreignKey: "appl_id",
});

Applicants.sync({ alter: true });
export default Applicants;
