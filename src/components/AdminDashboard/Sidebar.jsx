import { useState } from "react";
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaCommentAlt,
  FaUserCheck,
  FaFileAlt
} from "react-icons/fa";
import { MdNotificationsActive } from "react-icons/md";
import { GrCertificate } from "react-icons/gr";
import "../../styles/AdminDashboard/Sidebar.css";
import { NavLink } from "react-router-dom";
import { PiExamFill } from "react-icons/pi";
import { RiCalendarFill, RiMoneyDollarCircleFill } from "react-icons/ri";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/admin-dashboard",
      name: "Dashboard",
      icon: <FaTh />
    },
    {
      path: "/admin-student",
      name: "Students",
      icon: <FaUserAlt />
    },
    {
      path: "/admin-teacher",
      name: "Teachers",
      icon: <FaUserAlt />
    },
    {
      path: "/admin-schedule",
      name: "Schedule",
      icon: <FaFileAlt />
    },
    {
      path: "/admin-registration",
      name: "Registration",
      icon: <FaCommentAlt />
    },
    {
      path: "/admin-notifications",
      name: "Notifications",
      icon: <MdNotificationsActive />
    },
    {
      path: "/admin-courses",
      name: "Courses",
      icon: <GrCertificate />
    },
    {
      path: "/admin-exam",
      name: "Exam",
      icon: <PiExamFill />
    },
    {
      path: "/admin-calendar",
      name: "Calendar",
      icon: <RiCalendarFill />
    },
    {
      path: "/admin-fees",
      name: "Fees",
      icon: <RiMoneyDollarCircleFill />
    },
    {
      path: "/admin-attendance",
      name: "Attendance",
      icon: <FaUserCheck />
    },
    {
      path: "/admin-assignment",
      name: "Assignment",
      icon: <FaFileAlt />
    }
  ];
  return (
    <div className="adminSidebarContainer">
      <div
        style={{ width: isOpen ? "190px" : "50px" }}
        className="sidebar-section"
      >
        <div className="top_section">
          <img
            src="https://yt3.googleusercontent.com/BD6jdwY4iosy_AvzawaKCceFVt-5otehbbOgLWIlL_EVpAf1iXadeNQEuMzUEokKNPQy8QKq5A=s900-c-k-c0x00ffffff-no-rj"
            alt=""
            style={{ display: isOpen ? "block" : "none" }}
            className="logo"
          />
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeclassname="active"
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      <div className="adminMain">{children}</div>
    </div>
  );
};

export default Sidebar;
