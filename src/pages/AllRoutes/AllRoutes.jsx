import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../Home";
import AboutUs from "../AboutUs";
import Admission from "../Admission";
import Faculty from "../Faculty";
import OurCampus from "../OurCampus";
import ContactUs from "../ContactUs";
import StudentLogin from "../../Pages/StudentDashboard/Login";
import TeacherLogin from "../../Pages/TeacherDashboard/Login"
import AdminLogin from "../../Pages/AdminDashboard/Login";
import Sidebar from "../../Components/AdminDashboard/Sidebar";
import Dashboard from "../AdminDashboard/Dashboard";
import Student from "../AdminDashboard/Student/Student";
import Teachers from "../AdminDashboard/Teacher/Teachers";
import Registration from "../AdminDashboard/Registration/Registration";
import ChangePassword from "../../Components/AdminDashboard/ChangePassword";
import Notification from "../AdminDashboard/Notification";
import Courses from "../AdminDashboard/Courses";
import ProfileForm from "../../Components/AdminDashboard/ProfileForm";
import Exam from "../AdminDashboard/Exam";
import Calendar from "../AdminDashboard/Calendar";
import Fees from "../AdminDashboard/Fees";
import Attendance from "../AdminDashboard/Attendance";
import Schedule from "../AdminDashboard/Schedule/Schedule";
import Assignment from "../AdminDashboard/Assignment/Assignment";
import AdminAdmission from "../AdminDashboard/Admission/AdminAdmission";

import StudentSidebar from "../../Components/StudentDashboard/StudentSidebar/StudentSidebar";
import StudentNavbar from "../../Components/StudentDashboard/StudentNavbar/StudentNavbar";
import StudentDashboard from "../StudentDashboard/Dashboard/StudentDashboard";
import StudentSchedule from "../StudentDashboard/Schedule/StudentSchedule";
import Students from "../StudentDashboard/Student/Students";
import StudentAssignmentPage from "../StudentDashboard/Assignment/StudentAssignmentPage";
import StudentAttendancePage from "../StudentDashboard/Attendance/StudentAttendancePage";
import StudentMarksPage from "../StudentDashboard/Marks/StudentMarksPage";
import StudentNotification from "../StudentDashboard/Notification/StudentNotification";
import StudentExamPage from "../StudentDashboard/Exam/StudentExamPage";
import StudentCalendar from "../StudentDashboard/Calendar/StudentCalendar";
import StudentProfileForm from "../StudentDashboard/Profile/StudentProfileForm";
import StudentChangePassword from "../StudentDashboard/Profile/StudentChangePassword";
import StudentQuestionPaperPage from "../StudentDashboard/QuestionPaper/StudentQuestionPaperPage";
import StudentSyllabusPage from "../StudentDashboard/Syllabus/StudentSyllabusPage";
import StudentTestPage from "../StudentDashboard/Test/StudentTestPage";

import TeacherSidebar from "../../Components/TeacherDashboard/Sidebar/TeacherSidebar";
import TeacherNavbar from "../../Components/TeacherDashboard/Navbar/TeacherNavbar";
import TeacherDashboard from "../TeacherDashboard/Dashboard/TeacherDashboard";
import TeacherSchedule from "../TeacherDashboard/Schedule/TeacherSchedule";
import TeacherStudent from "../TeacherDashboard/Student/TeacherStudent";
import TeacherSyllabusPage from "../TeacherDashboard/Syllabus/TeacherSyllabusPage";
import TeacherAssignmentPage from "../TeacherDashboard/Assignment/TeacherAssignmentPage";
import TeacherAttandancePage from "../TeacherDashboard/Attandance/TeacherAttandancePage";
import TeacherMarksPage from "../TeacherDashboard/Marks/TeacherMarksPage";
import TeacherNewQuestion from "../TeacherDashboard/NewQuestion/TeacherNewQuestion";
import TeacherProfileForm from "../TeacherDashboard/Profile/TeacherProfileForm";
import TeacherChangePassword from "../TeacherDashboard/Profile/TeacherChangePassword";
import TeacherNotification from "../TeacherDashboard/Notification/TeacherNotification";
import TeacherCalendar from "../TeacherDashboard/Calendar/TeacherCalendar";
import TeacherExamPage from "../TeacherDashboard/Exam/TeacherExamPage";
import TeacherTestPage from "../TeacherDashboard/Test/TeacherTestPage";

import "./AllRoutes.css";
import PrivateRoute from "./PrivateRoute";
import Unauthorized from "../Unauthorized";
import AuthGuard from "../../Utils/AuthGuard";

const Allroutes = () => {
  const [toggleSidbarStudent, setToggelSidebarStudent] = useState(false);
  const [toggleSidbarTeacher, setToggelSidebarTeacher] = useState(false);
  const location = useLocation();
  const isStudentDashboard = location.pathname.includes("/student");
  const isTeacherDashboard = location.pathname.includes("/teacher");

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/admission" element={<Admission />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/our-campus" element={<OurCampus />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path='/admin/login' element={<AuthGuard><AdminLogin /></AuthGuard>} />
        <Route path='/student/login' element={<AuthGuard><StudentLogin /></AuthGuard>} />
        <Route path='/teacher/login' element={<AuthGuard><TeacherLogin /></AuthGuard>} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <Sidebar>
                <Dashboard />
              </Sidebar>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-student"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <Sidebar>
                <Student />
              </Sidebar>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-teacher"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <Sidebar>
                <Teachers />
              </Sidebar>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-registration"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <Sidebar>
                <Registration />
              </Sidebar>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-admission"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <Sidebar>
                <AdminAdmission />
              </Sidebar>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-dashboard/profile"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <Sidebar>
                <ProfileForm />
              </Sidebar>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-dashboard/profile/changepassword"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <Sidebar>
                <ChangePassword />
              </Sidebar>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-notifications"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <Sidebar>
                <Notification />
              </Sidebar>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-courses"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <Sidebar>
                <Courses />
              </Sidebar>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-exam"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <Sidebar>
                <Exam />
              </Sidebar>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-calendar"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <Sidebar>
                <Calendar />
              </Sidebar>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-fees"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <Sidebar>
                <Fees />
              </Sidebar>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-attendance"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <Sidebar>
                <Attendance />
              </Sidebar>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-assignment"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <Sidebar>
                <Assignment />
              </Sidebar>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-schedule"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <Sidebar>
                <Schedule />
              </Sidebar>
            </PrivateRoute>
          }
        />
      </Routes>
      {isStudentDashboard && (
        <div className="containerDashboard">
          <div>
            <StudentSidebar toggleSidbarStudent={toggleSidbarStudent} />
          </div>
          <div className="content">
            <StudentNavbar
              toggleSidbarStudent={toggleSidbarStudent}
              setToggelSidebarStudent={setToggelSidebarStudent}
            />
            <Routes>
              <Route
                path="/student-dashboard"
                element={
                  <PrivateRoute allowedRoles={["student", "admin"]}>
                    <StudentDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/student-schedule"
                element={
                  <PrivateRoute allowedRoles={["student", "admin"]}>
                    <StudentSchedule />
                  </PrivateRoute>
                }
              />
              <Route
                path="/student-student"
                element={
                  <PrivateRoute allowedRoles={["student", "admin"]}>
                    <Students />
                  </PrivateRoute>
                }
              />
              <Route
                path="/student-syllabus"
                element={
                  <PrivateRoute allowedRoles={["student", "admin"]}>
                    <StudentSyllabusPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/student-assignment"
                element={
                  <PrivateRoute allowedRoles={["student", "admin"]}>
                    <StudentAssignmentPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/student-questionpaper"
                element={
                  <PrivateRoute allowedRoles={["student", "admin"]}>
                    <StudentQuestionPaperPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/student-attendance"
                element={
                  <PrivateRoute allowedRoles={["student", "admin"]}>
                    <StudentAttendancePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/student-test"
                element={
                  <PrivateRoute allowedRoles={["student", "admin"]}>
                    <StudentTestPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/student-marks"
                element={
                  <PrivateRoute allowedRoles={["student", "admin"]}>
                    <StudentMarksPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/student-dashboard/profile"
                element={
                  <PrivateRoute allowedRoles={["student", "admin"]}>
                    <StudentProfileForm />
                  </PrivateRoute>
                }
              />
              <Route
                path="/student-dashboard/profile/changepassword"
                element={
                  <PrivateRoute allowedRoles={["student", "admin"]}>
                    <StudentChangePassword />
                  </PrivateRoute>
                }
              />
              <Route
                path="/student-notification"
                element={
                  <PrivateRoute allowedRoles={["student", "admin"]}>
                    <StudentNotification />
                  </PrivateRoute>
                }
              />
              <Route
                path="/student-exam"
                element={
                  <PrivateRoute allowedRoles={["student", "admin"]}>
                    <StudentExamPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/student-calendar"
                element={
                  <PrivateRoute allowedRoles={["student", "admin"]}>
                    <StudentCalendar />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </div>
      )}

      {isTeacherDashboard && (
        <div className="containerDashboard">
          <div>
            <TeacherSidebar toggleSidbarTeacher={toggleSidbarTeacher} />
          </div>
          <div className="content">
            <TeacherNavbar
              toggleSidbarTeacher={toggleSidbarTeacher}
              setToggelSidebarTeacher={setToggelSidebarTeacher}
            />
            <Routes>
              <Route
                path="/teacher-dashboard"
                element={
                  <PrivateRoute allowedRoles={["teacher", "admin"]}>
                    <TeacherDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/teacher-schedule"
                element={
                  <PrivateRoute allowedRoles={["teacher", "admin"]}>
                    <TeacherSchedule />
                  </PrivateRoute>
                }
              />
              <Route
                path="/teacher-student"
                element={
                  <PrivateRoute allowedRoles={["teacher", "admin"]}>
                    <TeacherStudent />
                  </PrivateRoute>
                }
              />
              <Route
                path="/teacher-syllabus"
                element={
                  <PrivateRoute allowedRoles={["teacher", "admin"]}>
                    <TeacherSyllabusPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/teacher-assignment"
                element={
                  <PrivateRoute allowedRoles={["teacher", "admin"]}>
                    <TeacherAssignmentPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/teacher-attendance"
                element={
                  <PrivateRoute allowedRoles={["teacher", "admin"]}>
                    <TeacherAttandancePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/teacher-test"
                element={
                  <PrivateRoute allowedRoles={["teacher", "admin"]}>
                    <TeacherTestPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/teacher-studentmarks"
                element={
                  <PrivateRoute allowedRoles={["teacher", "admin"]}>
                    <TeacherMarksPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/teacher-exam"
                element={
                  <PrivateRoute allowedRoles={["teacher", "admin"]}>
                    <TeacherExamPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/teacher-newquestion"
                element={
                  <PrivateRoute allowedRoles={["teacher", "admin"]}>
                    <TeacherNewQuestion />
                  </PrivateRoute>
                }
              />
              <Route
                path="/teacher-dashboard/profile"
                element={
                  <PrivateRoute allowedRoles={["teacher", "admin"]}>
                    <TeacherProfileForm />
                  </PrivateRoute>
                }
              />
              <Route
                path="/teacher-dashboard/profile/changepassword"
                element={
                  <PrivateRoute allowedRoles={["teacher", "admin"]}>
                    <TeacherChangePassword />
                  </PrivateRoute>
                }
              />
              <Route
                path="/teacher-notification"
                element={
                  <PrivateRoute allowedRoles={["teacher", "admin"]}>
                    <TeacherNotification />
                  </PrivateRoute>
                }
              />
              <Route
                path="/teacher-calendar"
                element={
                  <PrivateRoute allowedRoles={["teacher", "admin"]}>
                    <TeacherCalendar />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </div>
      )}
    </div>
  );
};
export default Allroutes;
