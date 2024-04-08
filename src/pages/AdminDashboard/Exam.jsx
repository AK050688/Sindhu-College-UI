import { useEffect, useState } from "react";
import Navbar from "../../components/AdminDashboard/Navbar";
import ExamFormModel from "../../components/AdminDashboard/Exam/ExamFormModel copy";
import ExamEditModel from "../../components/AdminDashboard/Exam/ExamEditModel";
import "../../styles/AdminDashboard/Exam.css";

const Exam = () => {
  const [exams, setExams] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editExamData, setEditExamData] = useState(null);

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

  const handleEditExam = (examId, updatedExamData) => {
    setExams(
      exams.map((exam) => {
        if (exam._id === examId) {
          return { ...exam, ...updatedExamData };
        }
        return exam;
      })
    );
  };

  const deleteRow = (examId) => {
    fetch(
      `https://university-project-paresh.onrender.com/University/ExamRoute/exams/${examId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log("Deleted exam:", data);
        alert(`${data.message}`);
      })
      .catch((error) => {
        console.error("Error deleting exam:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const addExam = (newExam) => {
    // console.log("new", newExam);
    setExams([...exams, newExam.examDetails]);
  };

  return (
    <>
      <Navbar />

      <div className="examList">
        <div className="header">
          <h1 className="title">All Exam Lists</h1>
          <button className="addButton" onClick={() => setShowForm(true)}>
            Add Exam
          </button>
        </div>
        {showForm && (
          <ExamFormModel onAddExam={addExam} setShowForm={setShowForm} />
        )}
        {showEditForm && (
          <ExamEditModel
            examId={editExamData._id}
            initialExamData={editExamData}
            onEditExam={(examId, updatedExamData) =>
              handleEditExam(examId, updatedExamData)
            }
            setShowEditForm={setShowEditForm}
          />
        )}
        {loading ? (
          <div className="spinner" role="status">
            <span className="loader"></span>
          </div>
        ) : (
          <div className="tableContainer">
            <div className="tableSection">
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Exam Branch</th>
                    <th>Exam Type</th>
                    <th>Subject</th>
                    <th>Year</th>
                    <th>Timing</th>
                    <th>Marks</th>
                    <th>Date</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {exams?.map((exam, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{exam.examBranch}</td>
                      <td>{exam.examType}</td>
                      <td>{exam.examSubject}</td>
                      <td>{exam.examYear}</td>
                      <td>{exam.examTiming}</td>
                      <td>{exam.examMarks}</td>
                      <td>{exam.examDate}</td>
                      <td>
                        <button
                          className="editButton"
                          onClick={() => {
                            setEditExamData(exam);
                            setShowEditForm(true);
                          }}
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          className="deleteButton"
                          onClick={() => deleteRow(exam._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Exam;
