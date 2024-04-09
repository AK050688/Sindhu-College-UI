import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/AdminDashboard/Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminLogin() {
  const [formData, setFormData] = useState({
    userName: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setLoading(true);

    fetch(
      `https://university-project-paresh.onrender.com/University/Admin/signIn`,
      {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        toast.error(res.error);
        // alert(res.error);
        if (res.message) {
          localStorage.setItem("token", res.accessToken);
          toast.success(res.message);
          alert(res.message);
          navigate("/admin-dashboard/profile");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      })
      .finally(() => {
        setLoading(false);
      });

    setFormData({
      userName: "",
      password: ""
    });
  };

  const { userName, password } = formData;

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
              value={userName}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="PASSWORD"
              name="password"
              value={password}
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
