import { DataTypes, Model } from "sequelize";
import db from "../connection.js";

class Users extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {}
}
Users.init(
  {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    status: DataTypes.ENUM("Y", "N"),
    user_tipe: DataTypes.STRING,
    refresh_token: DataTypes.TEXT,
    phone_id: DataTypes.TEXT,
  },
  {
    sequelize: db,
    modelName: "Users",
    tableName: "users",
  }
);

export default Users;
