//Sidebar.jsx
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
      path: "/dashboard",
      name: "Dashboard",
      icon: <FaTh />
    },
    {
      path: "/student",
      name: "Students",
      icon: <FaUserAlt />
    },
    {
      path: "/teacher",
      name: "Teachers",
      icon: <FaUserAlt />
    },
    {
      path: "/registration",
      name: "Registration",
      icon: <FaCommentAlt />
    },
    {
      path: "/notifications",
      name: "Notifications",
      icon: <MdNotificationsActive />
    },
    {
      path: "/courses",
      name: "Courses",
      icon: <GrCertificate />
    },
    {
      path: "/exam",
      name: "Exam",
      icon: <PiExamFill />
    },
    {
      path: "/calendar",
      name: "Calendar",
      icon: <RiCalendarFill />
    },
    {
      path: "/fees",
      name: "Fees",
      icon: <RiMoneyDollarCircleFill />
    },
    {
      path: "/attendance",
      name: "Attendance",
      icon: <FaUserCheck />
    },
    {
      path: "/assignment",
      name: "Assignment",
      icon: <FaFileAlt />
    }
  ];
  return (
    <>
      <div className="flex mt-0">
        <div style={{ width: isOpen ? "230px" : "50px" }} className="sidebar">
          <div className="top_section">
            <img
              src="https://yt3.googleusercontent.com/BD6jdwY4iosy_AvzawaKCceFVt-5otehbbOgLWIlL_EVpAf1iXadeNQEuMzUEokKNPQy8QKq5A=s900-c-k-c0x00ffffff-no-rj"
              alt=""
              style={{ display: isOpen ? "block" : "none" }}
              className="logo w-20 h-20 rounded-full"
            />
            <div
              style={{ marginLeft: isOpen ? "50px" : "0px" }}
              className="bars"
            >
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
        <main className="h-[100vh]">{children}</main>
      </div>
    </>
  );
};

export default Sidebar;
