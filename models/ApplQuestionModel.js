import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;
const ApplQuestion = db.define(
  "appl_experience",
  {
    id: {
      type: DataTypes.INTEGER(10),
      autoIncrement: true,
      primaryKey: true,
    },
    appl_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    info_source: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    kenalan: DataTypes.TEXT,
    polisi: DataTypes.TEXT,
    referensi: DataTypes.TEXT,
    training: DataTypes.TEXT,
    tunduk: DataTypes.TEXT,
    pekerjaan_disukai: DataTypes.TEXT,
    pekerjaan_tidak_disukai: DataTypes.TEXT,
    shift: DataTypes.ENUM("Y", "N"),
    rotasi: DataTypes.ENUM("Y", "N"),
    lembur: DataTypes.ENUM("Y", "N"),
    malam: DataTypes.ENUM("Y", "N"),
    keluar_kota: DataTypes.ENUM("Y", "N"),
    diluar_kota: DataTypes.ENUM("Y", "N"),
    kerja_libur: DataTypes.ENUM("Y", "N"),
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
ApplQuestion.sync({});
export default ApplQuestion;
