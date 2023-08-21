import { DataTypes, Model } from "sequelize";
import db from "../connection.js";

class Profile extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  // static associate(models) {}
}
Profile.init(
  {
    user_id: DataTypes.INTEGER,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone: DataTypes.STRING,
    gender: DataTypes.ENUM("M", "F"),
    avatar: DataTypes.TEXT,
  },
  {
    sequelize: db,
    modelName: "Profile",
  }
);

export default Profile;
