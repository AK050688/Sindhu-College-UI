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
      <div className="bg-black">
        <Navbar />
      </div>
      <div className="bg-cover bg-login h-screen md:h-[88.5vh]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 justify-center gap-4 w-full p-4 md:p-8 lg:p-16 xl:p-32 pt-14">
          {[
            {
              icon: <FaUserGraduate size={70} />,
              label: "Student Registered",
              count: studentCount
            },
            {
              icon: <FaChalkboardTeacher size={70} />,
              label: "Teacher Registered",
              count: teacherCount
            },
            {
              icon: <FaBell size={70} />,
              label: "Notification",
              count: notificationCount
            },
            {
              icon: <FaClipboardList size={80} />,
              label: "Admission Forms",
              count: admissionCount
            },
            { icon: <FaBook size={70} />, label: "Course", count: courseCount },
            {
              icon: <FaClipboardCheck size={70} />,
              label: "Exam",
              count: examCount
            }
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-800 text-white rounded-lg flex flex-col items-center p-4 md:p-12"
            >
              <div>{item.icon}</div>
              <div className="mt-4">
                <span className="text-xl">{item.label}</span>
                <span className="text-xl block">{item.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
