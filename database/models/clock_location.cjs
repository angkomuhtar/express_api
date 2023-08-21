"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Clock_Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Clock_Location.init(
    {
      latitude: DataTypes.STRING,
      longitude: DataTypes.STRING,
      location: DataTypes.STRING,
      status: DataTypes.ENUM,
    },
    {
      sequelize,
      modelName: "Clock_Location",
    }
  );
  return Clock_Location;
};
