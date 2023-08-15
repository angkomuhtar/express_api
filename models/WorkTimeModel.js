import db from "../config/Database.js";
import { DataTypes } from "sequelize";
const WorkTime = db.define(
  "emp_work_time",
  {
    id: {
      type: DataTypes.INTEGER(10),
      autoIncrement: true,
      primaryKey: true,
    },
    jam_masuk: {
      type: DataTypes.TIME,
      defaultValue: null,
    },
    jam_pulang: {
      type: DataTypes.TIME,
      defaultValue: null,
    },
    tipe: {
      type: DataTypes.ENUM("N", "NS", "DS", "O"), //N => Normal, NS => Night Shift, Day Shift, Offices (6-6)
      defaultValue: "N",
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
WorkTime.sync({});
export default WorkTime;
