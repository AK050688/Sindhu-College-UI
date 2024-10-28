import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../Redux/features/userSlice"; // Adjust the path based on your file structure
import "../../styles/AdminDashboard/Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminLogin() {
  const [formData, setFormData] = useState({
    userName: "",
    password: ""
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user, loading, error } = useSelector((state) => state.users);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem("token", user.accessToken);
      toast.success("Login successful!");
      navigate("/admin-dashboard/profile");
    }
    if (error) {
      toast.error(error);
    }
  }, [user, error, navigate]);

  return (
    <section className="adminLoginContainer">
      <ToastContainer />
      <div className="login-container">
        <div className="circle circle-one"></div>
        <div className="form-container">
          <img
            src="https://logodix.com/logo/1707130.png"
            alt="illustration"
            className="illustration"
          />
          <h1 className="opacity"> Login</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="USERNAME"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="PASSWORD"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <button type="submit" className="opacity" disabled={loading}>
              {loading ? "Loading..." : "SUBMIT"}
            </button>
          </form>
          <div className="register-forget opacity">
            <div href="">REGISTER</div>
            <div href="">FORGOT PASSWORD</div>
          </div>
        </div>
        <div className="circle circle-two"></div>
      </div>
      <div className="theme-btn-container"></div>
    </section>
  );
}

export default AdminLogin;
