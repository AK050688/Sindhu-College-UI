import React, { useState, useEffect } from "react";
import "./TeacherNavbar.css";
import { RiMenu2Line } from "react-icons/ri";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdNotifications } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";

const TeacherNavbar = ({ toggleSidbarTeacher, setToggelSidebarTeacher }) => {
  const [toggleProfile, setToggleProfile] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [calendar, setCalendar] = useState([]);
  const [teacherName, setTeacherName] = useState("");
  const [studentImage, setStudentImage] = useState(null);

  useEffect(() => {
    const studentImageFromStorage = localStorage.getItem("teacherImage");
    // console.log("studentImageFromStorage",studentImageFromStorage)

    setStudentImage(studentImageFromStorage);
    const teacherNameFromStorage = localStorage.getItem("teacherName");
    setTeacherName(teacherNameFromStorage);
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        "https://university-project-paresh.onrender.com/University/Notification/notifications"
      );
      const res = await axios.get(
        "https://university-project-paresh.onrender.com/University/CalenderRoute/events"
      );
      setNotifications(response.data);
      // console.log(response.data, res.data.Events);
      setCalendar(res.data.Events);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  return (
    <div className="teacherNavbarContainer">
      <div className="left_section">
        <span onClick={() => setToggelSidebarTeacher(!toggleSidbarTeacher)}>
          <RiMenu2Line />
        </span>
        <span>Teacher Dashboard</span>
      </div>
      <div className="middle_section">
        <span className="student-name" style={{ fontSize: "20px" }}>
          Welcome Back, {teacherName}
        </span>
      </div>
      <div className="right_section">
        <div className="navbar-icons">
          <Link to={"/teacher-calendar"}>
            <span className="calendar-icon">
              <FaRegCalendarAlt />
              {calendar.length > 0 && (
                <span className="calendar-badge">{calendar.length}</span>
              )}
            </span>
          </Link>
          <Link to={"/teacher-notification"}>
            <span className="notification-icon">
              <MdNotifications />
              {notifications.length > 0 && (
                <span className="notification-badge">
                  {notifications.length}
                </span>
              )}
            </span>
          </Link>
          <span onClick={() => setToggleProfile(!toggleProfile)}>
            <img
              src={studentImage}
              alt="Profile"
              className="student-profile-image"
            />
          </span>
        </div>
      </div>
      <div className={`nav-popup ${toggleProfile ? "show" : ""}`}>
        <ul>
          <li>
            <Link to={"/teacher-dashboard/profile"}>Profile</Link>
          </li>
          <li>Log In</li>
          <li>Sign Up</li>
        </ul>
      </div>
    </div>
  );
};

export default TeacherNavbar;
