import ApplCourse from "./ApplCourseModel";
import ApplEducation from "./ApplEducationModel";
import Applicants from "./ApplicantsModel";
import UsersGroup from "./UsersGroupModel";
import Users from "./UsersModel";

Users.hasMany(UsersGroup, {
  as: "group",
  foreignKey: "user_tipe",
  sourceKey: "user_tipe",
});

Applicants.hasMany(ApplCourse);
ApplCourse.belongsTo(Applicants, {
  foreignKey: "appl_id",
  as: "applicants",
});

Applicants.hasMany(ApplEducation);
ApplEducation.belongsTo(Applicants, {
  foreignKey: "appl_id",
  as: "applicants",
});
