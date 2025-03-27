import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { MdNotifications } from "react-icons/md";
import "../../styles/AdminDashboard/Navbar.css";
import { logout } from "../../Utils/auth";

const Navbar = () => {


  const [adminName, setAdminName] = useState("");
  const [toggleProfile, setToggleProfile] = useState(false);
  const [adminImage, setAdminImage] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const adminImageFromStorage = localStorage.getItem("adminImage");
    setAdminImage(adminImageFromStorage);
    const adminNameFromStorage = localStorage.getItem("adminName");
    setAdminName(adminNameFromStorage);
    fetchNotifications();
  }, []);

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

    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  return (
    <div className="adminNavbarContainer">
      <div className="leftSection">
        <span>Admin Dashboard</span>
      </div>
      <div className="middleSection">
        <span className="adminName">Welcome Back, {adminName}</span>
      </div>
      <div className="rightSection">
        <div className="navbarIcons">

          <Link to={"/admin-notifications"}>
            <span className="notificationIcon">
              <MdNotifications />
              {notifications.length > 0 && (
                <span className="notificationBadge">
                  {notifications.length}
                </span>
              )}
            </span>
          </Link>
          <span onClick={() => setToggleProfile(!toggleProfile)}>
            <img src={adminImage} alt="Profile" className="adminProfileImage" />
          </span>
        </div>
      </div>
      <div className={`navPopup ${toggleProfile ? "show" : ""}`}>
        <ul>
          <li>
            <Link to={"/admin-dashboard"}>Dashboard</Link>
          </li>
          <li>
            <Link to={"/admin-dashboard/profile"}>Profile</Link>
          </li>

          <li onClick={handleLogout}>
            Log Out
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
