import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;
const ApplEducation = db.define(
  "appl_education",
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
    tingkat: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    nama: DataTypes.STRING(100),
    kota: DataTypes.STRING(100),
    jurusan: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    tahun_mulai: DataTypes.STRING(5),
    tahun_selesai: DataTypes.STRING(5),
    lulus: DataTypes.ENUM("Y", "N"),
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
ApplEducation.sync();
export default ApplEducation;
