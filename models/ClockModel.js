import db from "../config/Database.js";
import { DataTypes } from "sequelize";
const Clock = db.define(
  "emp_clocks",
  {
    id: {
      type: DataTypes.INTEGER(10),
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY(),
      defaultValue: null,
    },
    clock_in: {
      type: DataTypes.DATE(),
      defaultValue: null,
    },
    clock_out: {
      type: DataTypes.DATE(),
      defaultValue: null,
    },
    tipe: {
      type: DataTypes.ENUM("N", "NS", "DS"),
      defaultValue: "N",
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("A", "I", "S", "O", "L"), //A:Alfa, I:Izin, S:Sakit, O:Off, L:cuti
      defaultValue: "A",
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
Clock.sync({});
export default Clock;
