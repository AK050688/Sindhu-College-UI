import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../Home";
import AboutUs from "../AboutUs";
import Admission from "../Admission";
import Faculty from "../Faculty";
import OurCampus from "../OurCampus";
import ContactUs from "../ContactUs";
import Login from "../Login";

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
        <Route path="/login" element={<Login />} />
        <Route path="/admin-Login" element={<AdminLogin />} />
        <Route
          path="/admin-dashboard"
          element={
            <Sidebar>
              <Dashboard />
            </Sidebar>
          }
        />
        <Route
          path="/admin-student"
          element={
            <Sidebar>
              <Student />
            </Sidebar>
          }
        />
        <Route
          path="/admin-teacher"
          element={
            <Sidebar>
              <Teachers />
            </Sidebar>
          }
        />
        <Route
          path="/admin-registration"
          element={
            <Sidebar>
              <Registration />
            </Sidebar>
          }
        />
        <Route
          path="/admin-admission"
          element={
            <Sidebar>
              <AdminAdmission />
            </Sidebar>
          }
        />
        <Route
          path="/admin-dashboard/profile"
          element={
            <Sidebar>
              <ProfileForm />
            </Sidebar>
          }
        />
        <Route
          path="/admin-dashboard/profile/changepassword"
          element={
            <Sidebar>
              <ChangePassword />
            </Sidebar>
          }
        />
        <Route
          path="/admin-notifications"
          element={
            <Sidebar>
              <Notification />
            </Sidebar>
          }
        />
        <Route
          path="/admin-courses"
          element={
            <Sidebar>
              <Courses />
            </Sidebar>
          }
        />
        <Route
          path="/admin-exam"
          element={
            <Sidebar>
              <Exam />
            </Sidebar>
          }
        />
        <Route
          path="/admin-calendar"
          element={
            <Sidebar>
              <Calendar />
            </Sidebar>
          }
        />
        <Route
          path="/admin-fees"
          element={
            <Sidebar>
              <Fees />
            </Sidebar>
          }
        />
        <Route
          path="/admin-attendance"
          element={
            <Sidebar>
              <Attendance />
            </Sidebar>
          }
        />
        <Route
          path="/admin-assignment"
          element={
            <Sidebar>
              <Assignment />
            </Sidebar>
          }
        />
        <Route
          path="/admin-schedule"
          element={
            <Sidebar>
              <Schedule />
            </Sidebar>
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
              <Route path="/student-dashboard" element={<StudentDashboard />} />
              <Route path="/student-schedule" element={<StudentSchedule />} />
              <Route path="/student-student" element={<Students />} />
              <Route
                path="/student-syllabus"
                element={<StudentSyllabusPage />}
              />
              <Route
                path="/student-assignment"
                element={<StudentAssignmentPage />}
              />
              <Route
                path="/student-questionpaper"
                element={<StudentQuestionPaperPage />}
              />
              <Route
                path="/student-attendance"
                element={<StudentAttendancePage />}
              />
              <Route path="/student-test" element={<StudentTestPage />} />
              <Route path="/student-marks" element={<StudentMarksPage />} />
              <Route
                path="/student-dashboard/profile"
                element={<StudentProfileForm />}
              />
              <Route
                path="/student-dashboard/profile/changepassword"
                element={<StudentChangePassword />}
              />
              <Route
                path="/student-notification"
                element={<StudentNotification />}
              />
              <Route path="/student-exam" element={<StudentExamPage />} />
              <Route path="/student-calendar" element={<StudentCalendar />} />
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
              <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
              <Route path="/teacher-schedule" element={<TeacherSchedule />} />
              <Route path="/teacher-student" element={<TeacherStudent />} />
              <Route
                path="/teacher-syllabus"
                element={<TeacherSyllabusPage />}
              />
              <Route
                path="/teacher-assignment"
                element={<TeacherAssignmentPage />}
              />
              <Route
                path="/teacher-attendance"
                element={<TeacherAttandancePage />}
              />
              <Route path="/teacher-test" element={<TeacherTestPage />} />
              <Route
                path="/teacher-studentmarks"
                element={<TeacherMarksPage />}
              />
              <Route path="/teacher-exam" element={<TeacherExamPage />} />
              <Route
                path="/teacher-newquestion"
                element={<TeacherNewQuestion />}
              />
              <Route
                path="/teacher-dashboard/profile"
                element={<TeacherProfileForm />}
              />
              <Route
                path="/teacher-dashboard/profile/changepassword"
                element={<TeacherChangePassword />}
              />
              <Route
                path="/teacher-notification"
                element={<TeacherNotification />}
              />
              <Route path="/teacher-calendar" element={<TeacherCalendar />} />
            </Routes>
          </div>
        </div>
      )}
    </div>
  );
};
export default Allroutes;
