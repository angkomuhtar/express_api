import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;
const ApplCourse = db.define(
  "appl_course",
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
    bidang: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    penyelenggara: DataTypes.STRING(100),
    kota: DataTypes.STRING(100),
    lama_kursus: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    tahun: DataTypes.STRING(5),
    dibayar_oleh: DataTypes.STRING(80),
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default ApplCourse;
