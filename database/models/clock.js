import { DataTypes, Model } from "sequelize";
import db from "../connection.js";

class Clock extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
}
Clock.init(
  {
    user_id: DataTypes.INTEGER,
    date: DataTypes.DATEONLY,
    clock_in: DataTypes.DATE,
    clock_out: DataTypes.DATE,
    tipe: DataTypes.ENUM("N", "NS", "DS", "OS"),
    status: DataTypes.ENUM("A", "I", "S", "O", "L", "H"),
  },
  {
    sequelize: db,
    modelName: "Clock",
    tableName: "clocks",
  }
);

export default Clock;
