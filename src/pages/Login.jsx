import React from "react";
import "../styles/Login.css";
import Footer from "../components/Home/Footer";
import Navbar from "../components/Home/Navbar";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const handleAdminLogin = () => {
    navigate("/admin-dashboard");
  };
  return (
    <>
      <Navbar />
      <div class="login">
        <div class="card">
          <div class="card2">
            <form class="form">
              <p id="heading">Login</p>
              <div class="field">
                <i class="fas fa-envelope input-icon"></i>
                <input
                  class="input-field"
                  placeholder="Email"
                  autocomplete="off"
                />
              </div>
              <div class="field">
                <i class="fas fa-lock input-icon"></i>
                <input
                  type="password"
                  class="input-field"
                  placeholder="Password"
                />
              </div>
              <p class="forgot">Forgot Password?</p>
              <div class="btn">
                <button class="button1">Login</button>
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
