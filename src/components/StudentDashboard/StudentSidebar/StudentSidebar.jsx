import React, { useState } from "react";
import { MdEventAvailable, MdNotificationsNone } from "react-icons/md";
import { Link } from "react-router-dom";
import { GrSchedule } from "react-icons/gr";
import { FaBook, FaRegCalendarAlt } from "react-icons/fa";
import { MdSupervisorAccount } from "react-icons/md";
import logoImage from "../../../assets/logo.png";

import "./StudentSidebar.css";
import { PiExamBold } from "react-icons/pi";

const StudentSidebar = ({ toggleSidbarStudent }) => {
  const [activeItem, setActiveItem] = useState("StudentDashboard");

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };

  return (
    <>
      <div
        className={`studentSidebarContainer ${
          toggleSidbarStudent ? "" : "hide"
        }`}
      >
        <div className="sidebar_header">
          <span>
            <img src={logoImage} alt="" />
          </span>
          <span>SIDHU COLLEGE OF EDUCATION</span>
        </div>
        <div className="sidebar_contain">
          {/* <Link to={"/student-dashboard"}>
            <div
              className={`sidebar_items ${
                activeItem === "StudentDashboard" ? "active" : ""
              }`}
              onClick={() => handleItemClick("StudentDashboard")}
            >
              <span className="sidebar_icon">
                <MdSpaceDashboard />
              </span>
              <span>Dashboard</span>
            </div>
          </Link> */}
          <Link to={"/student-attendance"}>
            <div
              className={`sidebar_items ${
                activeItem === "StudentAttendancePage" ? "active" : ""
              }`}
              onClick={() => handleItemClick("StudentAttendancePage")}
            >
              <span className="sidebar_icon">
                <MdSupervisorAccount />
              </span>
              <span>Attendance</span>
            </div>
          </Link>
          <Link to={"/student-notification"}>
            <div
              className={`sidebar_items ${
                activeItem === "StudentNotification" ? "active" : ""
              }`}
              onClick={() => handleItemClick("StudentNotification")}
            >
              <span className="sidebar_icon">
                <MdNotificationsNone />
              </span>
              <span>Notification</span>
            </div>
          </Link>
          <Link to={"/student-calendar"}>
            <div
              className={`sidebar_items ${
                activeItem === "StudentCalendar" ? "active" : ""
              }`}
              onClick={() => handleItemClick("StudentCalendar")}
            >
              <span className="sidebar_icon">
                <FaRegCalendarAlt />
              </span>
              <span>Calendar</span>
            </div>
          </Link>
          <Link to={"/student-schedule"}>
            <div
              className={`sidebar_items ${
                activeItem === "StudentSchedule" ? "active" : ""
              }`}
              onClick={() => handleItemClick("StudentSchedule")}
            >
              <span className="sidebar_icon">
                <GrSchedule />
              </span>
              <span>Schedule</span>
            </div>
          </Link>
          <Link to={"/student-syllabus"}>
            <div
              className={`sidebar_items ${
                activeItem === "StudentSyllabusPage" ? "active" : ""
              }`}
              onClick={() => handleItemClick("StudentSyllabusPage")}
            >
              <span className="sidebar_icon">
                <FaBook />
              </span>
              <span>Syllabus</span>
            </div>
          </Link>
          <Link to={"/student-assignment"}>
            <div
              className={`sidebar_items ${
                activeItem === "StudentAssignmentPage" ? "active" : ""
              }`}
              onClick={() => handleItemClick("StudentAssignmentPage")}
            >
              <span className="sidebar_icon">
                <MdEventAvailable />
              </span>
              <span>Assignment</span>
            </div>
          </Link>
          <Link to={"/student-test"}>
            <div
              className={`sidebar_items ${
                activeItem === "StudentTestPage" ? "active" : ""
              }`}
              onClick={() => handleItemClick("StudentTestPage")}
            >
              <span className="sidebar_icon">
                <MdSupervisorAccount />
              </span>
              <span>Test</span>
            </div>
          </Link>
          {/* <Link to={"/student-marks"}>
            <div
              className={`sidebar_items ${
                activeItem === "StudentMarksPage" ? "active" : ""
              }`}
              onClick={() => handleItemClick("StudentMarksPage")}
            >
              <span className="sidebar_icon">
                <PiStudentFill />
              </span>
              <span>Marks</span>
            </div>
          </Link> */}
          {/* <Link to={"/student-questionpaper"}>
            <div
              className={`sidebar_items ${
                activeItem === "StudentQuestionPaperPage" ? "active" : ""
              }`}
              onClick={() => handleItemClick("StudentQuestionPaperPage")}
            >
              <span className="sidebar_icon">
                <SlNotebook />
              </span>
              <span>Question</span>
            </div>
          </Link> */}
          <Link to={"/student-exam"}>
            <div
              className={`sidebar_items ${
                activeItem === "StudentExamPage" ? "active" : ""
              }`}
              onClick={() => handleItemClick("StudentExamPage")}
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

export default StudentSidebar;
