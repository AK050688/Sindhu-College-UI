import { useState } from "react";
import { RiAdminFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import style from "../../../styles/StudentDashboard/StudentChangePassword.module.css";
import axios from "axios";


const StudentChangePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const navigate = useNavigate();

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
        "https://university-project-paresh.onrender.com/University/Student/changePassword-Student",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("studentToken")}`
          }
        }
      );

      console.log(response.data);
      // localStorage.setItem("token", response.data.token);
      navigate("/student-dashboard/profile");
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };

  return (
    <>
      <div
        className={`${style.background} ${style.studentChangePasswordCOntainer}`}
      >
        <div className="changePasswordContainer">
          <div className={style.formWrapper}>
            <div></div>
            {/* <div className={style.title}>Update Password</div> */}
            <Link to={"/teacher-dashboard/profile"}>
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

export default StudentChangePassword;
