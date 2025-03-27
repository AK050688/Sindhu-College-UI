import React, { useEffect, useState } from "react";
import "./StudentNavbar.css";
import { RiMenu2Line } from "react-icons/ri";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdNotifications } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { logout } from "../../../Utils/auth";

const StudentNavbar = ({ toggleSidbarStudent, setToggelSidebarStudent }) => {
  const [toggleProfile, setToggleProfile] = useState(false);
  const [studentImage, setStudentImage] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [calendar, setCalendar] = useState([]);
  const [studentName, setStudentName] = useState("");

  useEffect(() => {
    const studentImageFromStorage = localStorage.getItem("studentImage");
    setStudentImage(studentImageFromStorage);
    const studentNameFromStorage = localStorage.getItem("studentName");
    setStudentName(studentNameFromStorage);
    fetchNotifications();
  }, []);

  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }


  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        "https://university-project-paresh.onrender.com/University/Notification/notifications"
      );
      const res = await axios.get(
        "https://university-project-paresh.onrender.com/University/CalenderRoute/events"
      );
      setNotifications(response.data);
      console.log(response.data, res.data.Events);
      setCalendar(res.data.Events);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  return (
    <div className="studentNavbarContainer">
      <div className="left_section">
        <span onClick={() => setToggelSidebarStudent(!toggleSidbarStudent)}>
          <RiMenu2Line />
        </span>
        <span>Student Dashboard</span>
      </div>
      <div className="middle_section">
        <span className="student-name" style={{ fontSize: "20px" }}>
          Welcome Back, {studentName}
        </span>
      </div>
      <div className="right_section">
        <div className="navbar-icons">
          <Link to={"/student-calendar"}>
            <span className="calendar-icon">
              <FaRegCalendarAlt />
              {calendar.length > 0 && (
                <span className="calendar-badge">{calendar.length}</span>
              )}
            </span>
          </Link>
          <Link to={"/student-notification"}>
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
            <Link to={"/student-dashboard/profile"}>Profile</Link>
          </li>

          <li onClick={handleLogout}>Log Out</li>

        </ul>
      </div>
    </div>
  );
};

export default StudentNavbar;
