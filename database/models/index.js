import Clock from "./clock.js";
import Profile from "./profile.js";
import Users from "./users.js";

Users.hasOne(Profile, { foreignKey: "user_id" });
Profile.belongsTo(Users, { foreignKey: "user_id" });

Users.hasMany(Clock, { foreignKey: "user_id" });
Clock.belongsTo(Users, { foreignKey: "user_id" });

export { Users, Profile, Clock };
