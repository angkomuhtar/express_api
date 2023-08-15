import ClockLocation from "./ClockLocationModel.js";
import Clock from "./ClockModel.js";
import Profiles from "./ProfilesModel.js";
import Users from "./UsersModel.js";
import WorkTime from "./WorkTimeModel.js";

Users.hasOne(Profiles, { foreignKey: "user_id" });
Profiles.belongsTo(Users, { foreignKey: "user_id" });

Users.hasMany(Clock, { foreignKey: "user_id" });
Clock.belongsTo(Users, { foreignKey: "user_id" });

export { Users, Profiles, Clock, WorkTime, ClockLocation };
