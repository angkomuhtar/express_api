import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;
const UsersGroup = db.define(
  "sys_users_groups",
  {
    id: {
      type: DataTypes.INTEGER(10),
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
    },
    mod_id: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
    },
    user_tipe: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default UsersGroup;
