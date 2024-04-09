import React, { useState, useEffect } from "react";
import Navbar from "../../components/AdminDashboard/Navbar";
import {
  FaBell,
  FaBook,
  FaChalkboardTeacher,
  FaClipboardCheck,
  FaClipboardList,
  FaUserGraduate
} from "react-icons/fa";
import "../../styles/AdminDashboard/Dashboard.css";
import { Link } from "react-router-dom";

function Dashboard() {
  const [studentCount, setStudentCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);
  const [admissionCount, setAdmissionCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);
  const [examCount, setExamCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const responses = await Promise.all([
          fetch(
            "https://university-project-paresh.onrender.com/University/Admin/allStudents",
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          ),
          fetch(
            "https://university-project-paresh.onrender.com/University/Admin/allTeachers",
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          ),
          fetch(
            "https://university-project-paresh.onrender.com/University/Notification/notifications"
          ),
          fetch(
            "https://university-project-paresh.onrender.com/University/Admission/allAdmissionForms"
          ),
          fetch(
            "https://university-project-paresh.onrender.com/University/Course/allCourses"
          ),
          fetch(
            "https://university-project-paresh.onrender.com/University/ExamRoute/exams"
          )
        ]);

        const data = await Promise?.all(responses?.map((res) => res.json()));
        // console.log(data);

        setStudentCount(data[0]?.Students?.length);
        setTeacherCount(data[1]?.Teachers?.length);
        setNotificationCount(data[2]?.length);
        setAdmissionCount(data[3]?.applicationForms?.length);
        setCourseCount(data[4]?.courses?.length);
        setExamCount(data[5]?.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="adminDashboardContainer">
        <div className="grid-container">
          {[
            {
              path: "/admin-student",
              icon: <FaUserGraduate size={70} />,
              label: "Student Registered",
              count: studentCount
            },
            {
              path: "/admin-teacher",
              icon: <FaChalkboardTeacher size={70} />,
              label: "Teacher Registered",
              count: teacherCount
            },
            {
              path: "/admin-notifications",
              icon: <FaBell size={70} />,
              label: "Notification",
              count: notificationCount
            },
            {
              path: "/admin-admission",
              icon: <FaClipboardList size={80} />,
              label: "Admission Forms",
              count: admissionCount
            },
            {
              path: "/admin-courses",
              icon: <FaBook size={70} />,
              label: "Course",
              count: courseCount
            },
            {
              path: "/admin-exam",
              icon: <FaClipboardCheck size={70} />,
              label: "Exam",
              count: examCount
            }
          ].map((item, index) => (
            <Link to={item.path} key={index} className="grid-item">
              <div className="icon">{item.icon}</div>
              <div className="label">
                <div>{item.label}</div>
                <div className="count">{item.count}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
