import db from "../config/Database.js";
import { DataTypes } from "sequelize";
const ClockLocation = db.define(
  "emp_clock_location",
  {
    id: {
      type: DataTypes.INTEGER(10),
      autoIncrement: true,
      primaryKey: true,
    },
    latitude: {
      type: DataTypes.STRING(50),
      defaultValue: null,
    },
    longitude: {
      type: DataTypes.STRING(50),
      defaultValue: null,
    },
    location: {
      type: DataTypes.STRING(35),
    },
    status: {
      type: DataTypes.ENUM("Y", "N"),
      defaultValue: "Y",
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
ClockLocation.sync({});
export default ClockLocation;
