import React, { useState } from "react";
import "../../styles/Login.css";
import Footer from "../../Components/Home/Footer";
import Navbar from "../../Components/Home/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TeacherLogin = () => {
    const navigate = useNavigate();
    const [UID, setUID] = useState("");
    const [password, setPassword] = useState("");

    const handleAdminLogin = () => {
        navigate("/admin/login");
    };

    const handleStudentLogin = () => {
        navigate("/student/login")
    }

    const role = 'teacher'
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InJvbGUiOiJ0ZWFjaGVyIn19.Mp0Pcwsz5VECK11Kf2ZZNF_SMKu5CgBeLN9ZOP04kZo'

    const handleSubmit = (e) => {
        e.preventDefault();

        if (UID && password) {
            localStorage.setItem("token", token);
            alert(`Login successful!`);
            navigate(`/${role}-dashboard`);
        } else {
            alert("Please enter both UID and Password.");
        }
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const response = await axios.post(
    //             "https://university-project-paresh.onrender.com/University/Student/signIn",
    //             { UID, password }
    //         );
    //         // console.log("res", response.data);
    //         // console.log("res", response.data.Teacher);
    //         if (response.data.loggedInFrom === "Student") {
    //             localStorage.setItem("studentToken", response.data.accessToken);
    //             localStorage.setItem("studentId", response.data.StudentId);
    //             // localStorage.setItem("studentName", response.data.Student.Name);
    //             alert(response.data.message);
    //             navigate("/student-dashboard/profile");
    //         } else if (response.data.loggedInFrom === "Teacher") {
    //             localStorage.setItem("teacherToken", response.data.accessToken);
    //             localStorage.setItem("teacherId", response.data.Teacher._id);
    //             localStorage.setItem("teacherName", response.data.Teacher.Name);
    //             alert(response.data.message);
    //             navigate("/teacher-dashboard/profile");
    //         } else {
    //             console.log(response.data);
    //             alert("Please, correct the UID");
    //         }
    //     } catch (error) {
    //         // Handle error
    //         console.error("Error:", error);
    //     }
    // };
    return (
        <>
            <Navbar />
            <div class="loginContainer">
                <div class="card">
                    <div class="card2">
                        <form class="form" onSubmit={handleSubmit}>
                            <p id="heading">Teacher Login</p>
                            <div class="field">
                                <i class="fas fa-envelope input-icon"></i>
                                <input
                                    class="input-field"
                                    placeholder="UID"
                                    autoComplete="off"
                                    value={UID}
                                    required
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
                                    required
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
                                <button class="button1" onClick={handleStudentLogin}>
                                    Login as Student
                                </button>
                            </div>
                            <div class="btn">
                                <button class="button1" onClick={handleAdminLogin}>
                                    Login as Admin
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

export default TeacherLogin;
