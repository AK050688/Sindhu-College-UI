import { useState } from "react";
import Navbar from "./Navbar";
import { RiAdminFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import style from "../../styles/AdminDashboard/ChangePassword.module.css";
import axios from "axios";

const ChangePassword = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        "https://university-project-paresh.onrender.com/University/Admin/changePassword-Admin",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      console.log(response.data);
      // localStorage.setItem("token", response.data.token);
      navigate("/admin-dashboard/profile");
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };

  return (
    <>
      <Navbar />
      <div className={style.adminChangePasswordContainer}>
        <div className={style.changePasswordContainer}>
          <div className={style.formWrapper}>
            {/* <div></div> */}
            <div className={style.title}>Update Password</div>
            <Link to={"/admin-dashboard/profile"}>
              <div className={style.link}>
                <RiAdminFill />
                <span>Admin Profile</span>
              </div>
            </Link>
          </div>

          <div className={style.formContainer}>
            <h2 className={style.formTitle}>Update Password</h2>
            <form onSubmit={handleSubmit} className={style.form}>
              <div className={style.inputGroup}>
                <label htmlFor="oldPassword" className={style.label}>
                  Old Password
                </label>
                <input
                  type="text"
                  id="oldPassword"
                  name="oldPassword"
                  value={formData.oldPassword}
                  onChange={handleChange}
                  className={style.input}
                  required
                />
              </div>
              <div className={style.inputGroup}>
                <label htmlFor="newPassword" className={style.label}>
                  New Password
                </label>
                <input
                  type="text"
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className={style.input}
                  required
                />
              </div>
              <div className={style.inputGroup}>
                <label htmlFor="confirmPassword" className={style.label}>
                  Confirm Password
                </label>
                <input
                  type="text"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={style.input}
                />
              </div>

              <button type="submit" className={style.button}>
                Update Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
