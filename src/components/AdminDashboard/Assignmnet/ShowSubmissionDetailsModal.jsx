import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import axios from "axios";
import "../../../pages/AdminDashboard/Assignment/Assignment.css";

const ShowSubmissionDetailsModal = ({
  show,
  onClose,
  submittedDetails,
  assignmentId
}) => {
  const [marks, setMarks] = useState(0);
  const studentId = localStorage.getItem("studentId");
  //   console.log("id", assignmentId, submittedDetails);

  useEffect(() => {
    getMarks();
    // eslint-disable-next-line
  }, [studentId]);

  const getMarks = () => {
    // console.log(studentId, assignmentId, marks);
    axios
      .get(
        `https://university-project-paresh.onrender.com/University/MarksRoute/getMyMark/${studentId}/${assignmentId}`
      )
      .then((response) => {
        // console.log("Marks get:", response.data.marks);
        setMarks(response.data.marks);
      })
      .catch((error) => {
        console.error("Error adding marks:", error);
      });
  };
  if (!show) {
    return null;
  }

  return (
    <div className="showSubmissionDetailsModal">
      <div className="modalOverlay">
        <div className="modalContainer" style={{ maxWidth: "800px" }}>
          <div className="formHeader">
            <h2>Submitted Student Details</h2>
            <button onClick={onClose}>
              <FiX />
            </button>
          </div>
          <div className="tableContainer">
            <div className="tableSection">
              <table>
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Submission Status</th>
                    <th>Answer</th>
                    <th>Marks</th>
                  </tr>
                </thead>
                <tbody>
                  {submittedDetails.map((submission, index) => (
                    <tr key={index}>
                      <td>{submission.studentName}</td>
                      <td>{submission.submissionStatus}</td>
                      <td>{submission.submittedAnswers.answer}</td>
                      <td>{marks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowSubmissionDetailsModal;
