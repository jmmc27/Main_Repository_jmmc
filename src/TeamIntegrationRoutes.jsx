/* eslint-disable no-unused-vars */
import React, { Suspense, lazy } from "react";

// TEAM A IMPORTS
import Landing from "../src/TeamAComponents/components/Landing";
import Login from "../src/TeamAComponents/components/Login";
import Register from "../src/TeamAComponents/components/Register";
import Forgot from "../src/TeamAComponents/components/Forgot";
import Dashboard from "../src/TeamAComponents/components/Dashboard";
import Profile from "../src/TeamAComponents/components/Profile";
import { Route, Routes } from "react-router-dom";
import Navigation from "../src/TeamAComponents/components/Navigation";
import ProfileEdit from "../src/TeamAComponents/components/ProfileEdit";
import Verification from "../src/TeamAComponents/components/Verification";
import ChangePassword from "../src/TeamAComponents/components/ChangePassword";
import About from "../src/TeamAComponents/components/About";
import Footer from "./TeamAComponents/components/Footer";
import Email from "./TeamAComponents/components/Email";
import ProfileModal from "./TeamAComponents/components/ProfileModal";

// TEAM B IMPORTS

//2/4/2024 junite, routes integration, added code splitting for app optimization

import TeamB_Fallbackloading from "./TeamBComponents/components/FallbackLoading";
const TeamB_Profile = lazy(() =>
  import("./TeamBComponents/components/Profile/Profile")
);
const TeamB_Dashboard = lazy(() =>
  import("./TeamBComponents/components/DashBoard/Dashboard")
);
const TeamB_CourseList = lazy(() =>
  import("./TeamBComponents/components/CourseList & AddCourseList/CourseList")
);
const TeamB_AddNewCourse = lazy(() =>
  import("./TeamBComponents/components/CourseList & AddCourseList/AddNewCourse")
);
const TeamB_CourseOverview = lazy(() =>
  import(
    "./TeamBComponents/components/CourseList & AddCourseList/CourseOverview"
  )
);
const TeamB_EditChapterTitle = lazy(() =>
  import(
    "./TeamBComponents/components/CourseList & AddCourseList/EditChapterTitle"
  )
);
const TeamB_CreateNewChapterTitle = lazy(() =>
  import(
    "./TeamBComponents/components/CourseList & AddCourseList/CreateNewChapterTitle"
  )
);
const TeamB_CreateNewCourseCopy = lazy(() =>
  import(
    "./TeamBComponents/components/CourseList & AddCourseList/CreateCourse/CreateNewCourse"
  )
);
const TeamB_TopicPage = lazy(() =>
  import("./TeamBComponents/components/Topic/TopicPages/TopicPage")
);
import TeamB_EditTopic from "./TeamBComponents/components/Topic/TopicPages/EditTopic";

// TEAM C IMPORT

import TeamC_Dashboard from "./TeamCComponents/pages/dashboard";
import TeamC_Assessments from "./TeamCComponents/pages/assessment";
import TeamC_Course from "./TeamCComponents/pages/course";
import TeamA_NewPass from "./TeamAComponents/components/NewPass";
import ForumF from "./TeamCComponents/pages/ForumF";
import ForumFInstructor from "./TeamCComponents/pages/ForumFInstructor";
import ForumD from "./TeamCComponents/pages/ForumD";
import ChapterList from "./TeamCComponents/components/chapter_list";
import TeamC_MainContent from "./TeamCComponents/components/course_maincontent";
import AddQuiz from "./TeamCComponents/pages/AddQuiz";
import TeamC_Topics from "./TeamCComponents/pages/Topics";
import TeamC_QuizForm from "./TeamCComponents/pages/quizForm";
import AssessmentQuiz from "./TeamCComponents/pages/AssessmentQuiz";
import Component_MainContent from "./TeamCComponents/components/quiz_form";
import StudentExamPage from "./TeamCComponents/pages/examination/student/s_examPage";
import InstructorExamPage from "./TeamCComponents/pages/examination/instructor/i_examPage";
import AddQuizDesc from './TeamCComponents/pages/QuizDesc';

// team D
import Team_D_View from "./TeamDComponents/Team_D_View";
import Team_D_Verification from "./TeamDComponents/Team_D_Verification";
import Team_D_Verif_nonuser from "./TeamDComponents/Team_D_Verif_nonuser";
import Team_D_Content from "./TeamDComponents/Team_D_Content";
import Home from "./TeamAComponents/components/Home";
import ForumDInstructor from "./TeamCComponents/pages/ForumDInstructor";
import CertificateGenerator from "./TeamCComponents/pages/CertificateGenerator";


function TeamIntegrationRoutes() {
  return (
    <>
      <Suspense fallback={<TeamB_Fallbackloading />}>
        <Routes>
          {/* TEAM A */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/verify" element={<Verification />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/update" element={<ProfileEdit />} />
          <Route path="/navigation" element={<Navigation />} />
          <Route path="/change" element={<ChangePassword />} />
          <Route path="/about" element={<About />} />
          <Route path="/email" element={<Email />} />
          <Route path="new" element={<TeamA_NewPass />} />
          <Route path="ProfileModal" element={<ProfileModal />} />

          {/* TEAM B */}
          <Route path="/teambdashboard" element={<TeamB_Dashboard />} />
          {/* <Route path="/teambprofile" element={<TeamB_Profile />} /> */}
          <Route path="/teambcourselist" element={<TeamB_CourseList />} />
          <Route path="/teambaddnewcourse" element={<TeamB_AddNewCourse />} />
          <Route
            path="/teambcourseoverview/:id"
            element={<TeamB_CourseOverview />}
          />
          <Route
            path="/teambeditchaptertitle/:id"
            element={<TeamB_EditChapterTitle />}
          />
          <Route
            path="/teambcreatenewchaptertitle"
            element={<TeamB_CreateNewChapterTitle />}
          />
          <Route path="/teambtopicpage/:id" element={<TeamB_TopicPage />} />
          <Route
            path="teambcreatenewcoursecopy"
            element={<TeamB_CreateNewCourseCopy />}
          />

          <Route path="teambtopicedit/:id" element={<TeamB_EditTopic />} />

          {/* TEAM C */}
          <Route path="/teamcdashboard" element={<TeamC_Dashboard />} />
          <Route path="/assessment" element={<TeamC_Assessments />} />
          <Route path="/course" element={<TeamC_Course />} />
          <Route path="/ForumF" element={<ForumF />} />
          <Route path="/AddQuiz/:quiz_id" element={<AddQuiz />} />
          <Route path="/QuizDesc/:chapter_id" element={<AddQuizDesc />} />
          <Route path="/AssessmentQuiz" element={<AssessmentQuiz />} />
          <Route path="/ForumFInstructor" element={<ForumFInstructor />} />
          <Route path="/forum_discussion" element={<ForumD />} />
          <Route
            path="/forum_discussion_instructor"
            element={<ForumDInstructor />}
          />
          <Route path="/api/v1/auth/chapters/:id" element={<ChapterList />} />
          <Route path="/api/v1/auth/topics/:id" element={<TeamC_Topics />} />
          <Route path="/quizform" element={<TeamC_QuizForm />} />
          <Route path="/api/v1/auth/studentexam/:id" element={<StudentExamPage />}
          />
          <Route path="/instructorexam" element={<InstructorExamPage />} />

          {/* Team D */}
          <Route path="/CertGen" element={<CertificateGenerator />} />
          <Route path="/certificate" element={<Team_D_Content />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/viewCert" element={<Team_D_View />} />
          <Route path="/verification" element={<Team_D_Verification />} />
          <Route path="/verif_nonuser" element={<Team_D_Verif_nonuser />} />

          <Route path="/about" element={<About />} />
          <Route
            path="*"
            element={
              <h1
                style={{
                  color: "red",
                  textAlign: "center",
                  marginTop: "20%",
                  fontSize: "5rem",
                }}
              >
                404 - Page Not Found
              </h1>
            }
          />
        </Routes>
      </Suspense>
    </>
  );
}

export default TeamIntegrationRoutes;
