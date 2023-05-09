import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import UsersGroup from "./UsersGroupModel.js";

const { DataTypes } = Sequelize;
const Users = db.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER(10),
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(254),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    user_tipe: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Y", "N"),
      defaultValue: "Y",
    },
    refresh_token: DataTypes.TEXT,
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

Users.hasMany(UsersGroup, {
  as: "group",
  foreignKey: "user_tipe",
  sourceKey: "user_tipe",
});

UsersGroup.hasMany(Users, {
  as: "user",
  foreignKey: "user_tipe",
  sourceKey: "user_tipe",
});

export default Users;
