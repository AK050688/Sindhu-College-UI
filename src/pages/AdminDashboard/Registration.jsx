import { useState } from "react";
import Navbar from "../../components/AdminDashboard/Navbar";
import StudentForm from "../../components/AdminDashboard/StudentForm";
import TeacherForm from "../../components/AdminDashboard/TeacherForm";

function Registration() {
  const [teacher, setTeacher] = useState(true);
  const [student, setStudent] = useState(false);

  const teacherBtn = () => {
    setTeacher(true);
    setStudent(false);
  };

  const studentBtn = () => {
    setStudent(true);
    setTeacher(false);
  };

  return (
    <div>
      <div className="h-[60px] bg-black">
        <Navbar />
      </div>
      <div className="bg-cover bg-login h-[91vh]">
        <div className="flex gap-3">
          <button
            className={`w-[70%] mb-6 text-[18px] mt-8 rounded-full text-blue-800 hover:bg-blue-600 hover:text-blue-800 py-2 transition-colors duration-300 ${
              teacher
                ? "bg-blue-400"
                : "bg-white border-1 rounder border-black ring-2 ring-black"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
            onClick={teacherBtn}
          >
            Teacher
          </button>
          <button
            className={`w-[70%] mb-6 text-[18px] mt-8 rounded-full text-blue-800 hover:bg-blue-600 hover:text-blue-800 py-1 transition-colors duration-300 ${
              student
                ? "bg-blue-300"
                : "bg-white border-1 rounder border-black ring-2 ring-black"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
            onClick={studentBtn}
          >
            Student
          </button>
        </div>

        {student && <StudentForm />}
        {teacher && <TeacherForm />}
      </div>
    </div>
  );
}

export default Registration;
