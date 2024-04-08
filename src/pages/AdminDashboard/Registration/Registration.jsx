import { useState } from "react";
import Navbar from "../../../components/AdminDashboard/Navbar";
import StudentForm from "../../../components/AdminDashboard/Registration/StudentForm";
import TeacherForm from "../../../components/AdminDashboard/Registration/TeacherForm";
import "../../../styles/AdminDashboard/Registration.css";

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
    <>
      <Navbar />
      <div className="registrationContainer">
        <div className="buttonContainer">
          <button
            className={`button ${teacher ? "teacherActive" : ""}`}
            onClick={teacherBtn}
          >
            Teacher
          </button>
          <button
            className={`button ${student ? "studentActive" : ""}`}
            onClick={studentBtn}
          >
            Student
          </button>
        </div>

        {student && <StudentForm />}
        {teacher && <TeacherForm />}
      </div>
    </>
  );
}

export default Registration;
