import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;
const ApplFamily = db.define(
  "appl_family",
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
    hubungan: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    nama: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM("M", "F"),
      allowNull: false,
    },
    usia: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    pendidikan: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    jabatan: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    perusahaan: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default ApplFamily;
