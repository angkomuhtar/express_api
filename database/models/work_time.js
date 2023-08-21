import { DataTypes, Model } from "sequelize";
import db from "../connection.js";

class Work_Time extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    Work_Time.hasMany(models.Clock, { foreignKey: "tipe", sourceKey: "tipe" });
  }
}
Work_Time.init(
  {
    masuk: DataTypes.TIME,
    keluar: DataTypes.TIME,
    tipe: DataTypes.ENUM("N", "NS", "DS", "OS"),
  },
  {
    sequelize: db,
    modelName: "Work_Time",
  }
);

export default Work_Time;
