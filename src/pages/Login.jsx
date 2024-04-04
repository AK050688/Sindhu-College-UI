import React, { useState } from "react";
import "../styles/Login.css";
import Footer from "../components/Home/Footer";
import Navbar from "../components/Home/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [UID, setUID] = useState("");
  const [password, setPassword] = useState("");

  const handleAdminLogin = () => {
    navigate("/admin-Login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://university-project-paresh.onrender.com/University/Student/signIn",
        { UID, password }
      );
      // console.log("res", response.data);
      // console.log("res", response.data.Teacher);
      if (response.data.loggedInFrom === "Student") {
        localStorage.setItem("studentToken", response.data.accessToken);
        localStorage.setItem("studentId", response.data.StudentId);
        // localStorage.setItem("studentName", response.data.Student.Name);
        alert(response.data.message);
        navigate("/student-dashboard/profile");
      } else if (response.data.loggedInFrom === "Teacher") {
        localStorage.setItem("teacherToken", response.data.accessToken);
        localStorage.setItem("teacherId", response.data.Teacher._id);
        localStorage.setItem("teacherName", response.data.Teacher.Name);
        alert(response.data.message);
        navigate("/teacher-dashboard/profile");
      } else {
        console.log(response.data);
        alert("Please, correct the UID");
      }
    } catch (error) {
      // Handle error
      console.error("Error:", error);
    }
  };
  return (
    <>
      <Navbar />
      <div class="loginContainer">
        <div class="card">
          <div class="card2">
            <form class="form" onSubmit={handleSubmit}>
              <p id="heading">Login</p>
              <div class="field">
                <i class="fas fa-envelope input-icon"></i>
                <input
                  class="input-field"
                  placeholder="UID"
                  autoComplete="off"
                  value={UID}
                  onChange={(e) => setUID(e.target.value)}
                />
              </div>
              <div class="field">
                <i class="fas fa-lock input-icon"></i>
                <input
                  type="password"
                  class="input-field"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <p class="forgot">Forgot Password?</p>
              <div class="btn">
                <button class="button1" type="submit">
                  Login
                </button>
              </div>
              <div class="btn">
                <button class="button1" onClick={handleAdminLogin}>
                  Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
