import React, { useState } from "react";
import {
  // MdSpaceDashboard,
  MdEventAvailable,
  MdNotificationsNone
} from "react-icons/md";
import { PiExamBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import { GrSchedule } from "react-icons/gr";
import { FaBook, FaRegCalendarAlt } from "react-icons/fa";
import { MdSupervisorAccount } from "react-icons/md";
import "./TeacherSidebar.css";
import logoImage from "../../../assets/logo.png";

const TeacherSidebar = ({ toggleSidbarTeacher }) => {
  const [activeItem, setActiveItem] = useState("TeacherDashboard");

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };

  return (
    <>
      <div
        className={`techerSidebarContainer ${
          toggleSidbarTeacher ? "" : "hide"
        }`}
      >
        <div className="sidebar_header">
          <span>
            <img src={logoImage} alt="" />
          </span>
          <span>SIDHU COLLEGE OF EDUCATION</span>
        </div>
        <div className="sidebar_contain">
          {/* <Link to={"/teacher-dashboard"}>
            <div
              className={`sidebar_items ${
                activeItem === "TeacherDashboard" ? "active" : ""
              }`}
              onClick={() => handleItemClick("TeacherDashboard")}
            >
              <span className="sidebar_icon">
                <MdSpaceDashboard />
              </span>
              <span>Dashboard</span>
            </div>
          </Link> */}
          <Link to={"/teacher-schedule"}>
            <div
              className={`sidebar_items ${
                activeItem === "TeacherSchedule" ? "active" : ""
              }`}
              onClick={() => handleItemClick("TeacherSchedule")}
            >
              <span className="sidebar_icon">
                <GrSchedule />
              </span>
              <span>Schedule</span>
            </div>
          </Link>
          <Link to={"/teacher-syllabus"}>
            <div
              className={`sidebar_items ${
                activeItem === "TeacherSyllabusPage" ? "active" : ""
              }`}
              onClick={() => handleItemClick("TeacherSyllabusPage")}
            >
              <span className="sidebar_icon">
                <FaBook />
              </span>
              <span>Syllabus</span>
            </div>
          </Link>
          <Link to={"/teacher-assignment"}>
            <div
              className={`sidebar_items ${
                activeItem === "TeacherAssignmentPage" ? "active" : ""
              }`}
              onClick={() => handleItemClick("TeacherAssignmentPage")}
            >
              <span className="sidebar_icon">
                <MdEventAvailable />
              </span>
              <span>Assignment</span>
            </div>
          </Link>
          <Link to={"/teacher-attendance"}>
            <div
              className={`sidebar_items ${
                activeItem === "TeacherAttendancePage" ? "active" : ""
              }`}
              onClick={() => handleItemClick("TeacherAttendancePage")}
            >
              <span className="sidebar_icon">
                <MdSupervisorAccount />
              </span>
              <span>Attendance</span>
            </div>
          </Link>
          <Link to={"/teacher-notification"}>
            <div
              className={`sidebar_items ${
                activeItem === "TeacherNotification" ? "active" : ""
              }`}
              onClick={() => handleItemClick("TeacherNotification")}
            >
              <span className="sidebar_icon">
                <MdNotificationsNone />
              </span>
              <span>Notification</span>
            </div>
          </Link>
          <Link to={"/teacher-calendar"}>
            <div
              className={`sidebar_items ${
                activeItem === "TeacherCalendar" ? "active" : ""
              }`}
              onClick={() => handleItemClick("TeacherCalendar")}
            >
              <span className="sidebar_icon">
                <FaRegCalendarAlt />
              </span>
              <span>Calendar</span>
            </div>
          </Link>
          {/* <Link to={"/teacher-studentmarks"}>
            <div
              className={`sidebar_items ${
                activeItem === "TeacherMarksPage" ? "active" : ""
              }`}
              onClick={() => handleItemClick("TeacherMarksPage")}
            >
              <span className="sidebar_icon">
                <PiStudentFill />
              </span>
              <span>Student Marks</span>
            </div>
          </Link> */}
          <Link to={"/teacher-test"}>
            <div
              className={`sidebar_items ${
                activeItem === "TeacherTestPage" ? "active" : ""
              }`}
              onClick={() => handleItemClick("TeacherTestPage")}
            >
              <span className="sidebar_icon">
                <MdSupervisorAccount />
              </span>
              <span>Test</span>
            </div>
          </Link>
          {/* <Link to={"/teacher-newquestion"}>
            <div
              className={`sidebar_items ${
                activeItem === "TeacherNewQuestion" ? "active" : ""
              }`}
              onClick={() => handleItemClick("TeacherNewQuestion")}
            >
              <span className="sidebar_icon">
                <SlNotebook />
              </span>
              <span>New Question</span>
            </div>
          </Link> */}
          <Link to={"/teacher-exam"}>
            <div
              className={`sidebar_items ${
                activeItem === "TeacherExamPage" ? "active" : ""
              }`}
              onClick={() => handleItemClick("TeacherExamPage")}
            >
              <span className="sidebar_icon">
                <PiExamBold />
              </span>
              <span>Exam</span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default TeacherSidebar;
