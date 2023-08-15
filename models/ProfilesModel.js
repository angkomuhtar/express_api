import db from "../config/Database.js";
import { DataTypes } from "sequelize";
import Users from "./UsersModel.js";
const Profiles = db.define(
  "profiles",
  {
    id: {
      type: DataTypes.INTEGER(10),
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER(10),
    },
    nm_depan: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    nm_belakang: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    jenkel: {
      type: DataTypes.ENUM("m", "f"),
      allowNull: false,
    },
    employee_id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    avatar: {
      type: DataTypes.TEXT(),
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

export default Profiles;
