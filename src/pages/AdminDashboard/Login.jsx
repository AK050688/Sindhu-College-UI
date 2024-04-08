import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoLockOpenOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/AdminDashboard/Login.module.css";
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
    <div className={styles.container}>
      <ToastContainer />
      <div className={styles.formContainer}>
        <h1 className={styles.heading}>Login</h1>
        <form action="" onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <label htmlFor="username" className={styles.label}>
              Username
            </label>
            <input
              type="text"
              id="username"
              name="userName"
              value={userName}
              className={styles.input}
              onChange={handleChange}
            />
            <FaUserCircle className={styles.icon} />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              className={styles.input}
              onChange={handleChange}
            />
            <IoLockOpenOutline className={styles.icon} />
          </div>
          <div className={styles.checkboxContainer}>
            <input type="checkbox" />
            <label htmlFor="remember"> Remember me</label>
            <span>Forgot password?</span>
          </div>
          <button className={styles.button} type="submit" disabled={loading}>
            {loading ? (
              <div className={styles.spinner} role="status">
                <div className={styles.loader}></div> {/* Animation here */}
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
