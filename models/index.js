import ApplContact from "./ApplContactModel.js";
import ApplCourse from "./ApplCourseModel.js";
import ApplEducation from "./ApplEducationModel.js";
import ApplExperience from "./ApplExperienceModel.js";
import ApplFamily from "./ApplFamilyModel.js";
import ApplLanguage from "./ApplLanguageModel.js";
import ApplQuestion from "./ApplQuestionModel.js";
import Applicants from "./ApplicantsModel.js";
import UsersGroup from "./UsersGroupModel.js";
import Users from "./UsersModel.js";

export const index = async () => {
  try {
    Applicants.sync({ alter: true });
    ApplContact.sync({ alter: true });
    ApplCourse.sync({ alter: true });
    ApplEducation.sync({ alter: true });
    ApplExperience.sync({ alter: true });
    ApplFamily.sync({ alter: true });
    ApplLanguage.sync({ alter: true });
    ApplQuestion.sync({ alter: true });
    // User.sync({ alter: true });
    // UsersGroup.sync({ alter: true });
  } catch (error) {
    console.log(error);
  }
};
