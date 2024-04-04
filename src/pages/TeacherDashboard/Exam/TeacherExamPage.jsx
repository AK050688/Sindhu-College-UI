import { useEffect, useState } from "react";
import "./TeacherExamPage.css";
import ExamFormModel from "./ExamFormModel";
import ExamEditModel from "./ExamEditModel";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import axios from "axios";


const TeacherExamPage = () => {
  const [exams, setExams] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedSchedule, setSelectedExam] = useState(null);

  useEffect(() => {
    handleGetData();
  }, []);

  const handleGetData = () => {
    fetch(
      "https://university-project-paresh.onrender.com/University/ExamRoute/exams",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log("examData", data);
        setExams(data);
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateTeacherExam = (examId, updatedExamData) => {
    setExams(
      exams.map((exam) => {
        if (exam._id === examId) {
          return { ...exam, ...updatedExamData };
        }
        return exam;
      })
    );
  };

  const handleEditExam = (exam) => {
    setSelectedExam(exam);
    setShowEditForm(true);
  };

  const deleteRow = async (examId) => {
    try {
      await axios.delete(
        `https://university-project-paresh.onrender.com/University/ExamRoute/exams/${examId}`
      );
      const response = await axios.get(
        "https://university-project-paresh.onrender.com/University/ExamRoute/exams"
      );
      setExams(response.data);
      console.log("Schedule deleted successfully", response);
    } catch (error) {
      console.error("Error deleting schedule:", error);
    }
  };

  const addExam = (newExam) => {
    console.log("new", newExam);
    setExams([...exams, newExam.examDetails]);
  };

  return (
    <div className="teacher-exam-pages">
      <div className="filter-section">
        {/* <div className="filter">
          <label htmlFor="dayFilter">Day:</label>
          <select
            id="dayFilter"
            value={dayFilter}
            onChange={(e) => setDayFilter(e.target.value)}
          >
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
        </div>
        <div className="filter">
          <label htmlFor="courseFilter">Branch:</label>
          <select
            id="courseFilter"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">Select Branch</option>
            {courseOptions.map((course, index) => (
              <option key={index} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>
        <div className="filter">
          <label htmlFor="sectionFilter">Section:</label>
          <select
            id="sectionFilter"
            value={sectionFilter}
            onChange={(e) => setSectionFilter(e.target.value)}
          >
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
          </select>
        </div> */}
        <button className="add-exam-btn" onClick={() => setShowForm(true)}>
          Add Exam
        </button>
      </div>

      {showForm && (
        <ExamFormModel onAddExam={addExam} setShowForm={setShowForm} />
      )}

      {showEditForm && (
        <ExamEditModel
          examId={selectedSchedule._id}
          initialExamData={selectedSchedule}
          onEditExam={updateTeacherExam}
          setShowEditForm={setShowEditForm}
        />
      )}

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="exam-grid">
          {exams.map((exam, index) => (
            <div key={index} className="exam-card">
              <p>
                <strong>Exam Branch:</strong> {exam.examBranch}
              </p>
              <p>
                <strong>Exam Type:</strong> {exam.examType}
              </p>
              <p>
                <strong>Subject:</strong> {exam.examSubject}
              </p>
              <p>
                <strong>Year:</strong> {exam.examYear}
              </p>
              <p>
                <strong>Timing:</strong> {exam.examTiming}
              </p>
              <p>
                <strong>Marks:</strong> {exam.examMarks}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(exam.examDate).toLocaleDateString("en-GB")}
              </p>
              <div className="icon-container">
                <div>
                  <AiOutlineEdit
                    className="edit-icon"
                    onClick={() => handleEditExam(exam)}
                  />
                </div>
                <div>
                  <AiOutlineDelete
                    className="delete-icon"
                    onClick={() => deleteRow(exam._id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeacherExamPage;
