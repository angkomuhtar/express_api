import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;
const ApplLanguage = db.define(
  "appl_language",
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
    bahasa: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    speak: DataTypes.STRING(100),
    listen: DataTypes.STRING(100),
    write: DataTypes.STRING(100),
    read: DataTypes.STRING(100),
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
ApplLanguage.sync({});

export default ApplLanguage;
