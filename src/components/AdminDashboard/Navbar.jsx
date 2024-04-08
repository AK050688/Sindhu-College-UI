import React, { useState, useRef } from "react";
import { CgProfile } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { IoMdLogOut } from "react-icons/io";
import { Link } from "react-router-dom";
import "../../styles/AdminDashboard/Navbar.css";

const Navbar = () => {
  const [profile, setProfile] = useState(false);
  const profileRef = useRef(null);

  const toggleProfile = () => {
    setProfile(!profile);
  };

  const handleClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setProfile(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className="adminNavbarContainer">
      <div></div>
      <div className="title">Admin Dashboard</div>
      <div ref={profileRef} onClick={toggleProfile} className="profileIcon">
        <CgProfile />
      </div>
      {profile && (
        <div className="profileDropdown">
          <div className="dropdownContent">
            <Link to={"/dashboard"}>
              <div className="dropdownItem">
                <MdDashboard /> <span>Dashboard</span>
              </div>
            </Link>
            <Link to={"/dashboard/profile"}>
              <div className="dropdownItem">
                <ImProfile /> <span>Profile</span>
              </div>
            </Link>
            <Link to={"/"}>
              <div className="dropdownItem">
                <IoMdLogOut /> <span>Logout</span>
              </div>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
