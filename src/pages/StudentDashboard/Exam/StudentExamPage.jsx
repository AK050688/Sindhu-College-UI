import { useEffect, useState } from "react";
import "./StudentExamPage.css";

const StudentExamPage = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="teacher-exam-pages">
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentExamPage;
