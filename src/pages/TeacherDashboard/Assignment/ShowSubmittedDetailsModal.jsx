import axios from "axios";
import React, { useState } from "react";
import { FiX } from "react-icons/fi";

const ShowSubmittedDetailsModal = ({
  show,
  onClose,
  submittedDetails,
  assignmentId
}) => {
  const [marksModalOpen, setMarksModalOpen] = useState(false);
  const [marks, setMarks] = useState(0);
  const studentId = localStorage.getItem("studentId");
  console.log("id", assignmentId, submittedDetails);
  const handleMarksChange = (event) => {
    setMarks(event.target.value);
  };

  const handleSubmitMarks = () => {
    console.log(studentId, assignmentId, marks);
    axios
      .post(
        "https://university-project-paresh.onrender.com/University/MarksRoute/addAssignmentMarks",
        {
          studentId: studentId,
          assignmentId: assignmentId,
          marks: marks
        }
      )
      .then((response) => {
        console.log("Marks added successfully:", response.data);
        setMarksModalOpen(false);
      })
      .catch((error) => {
        console.error("Error adding marks:", error);
      });
  };

  const handleOpenMarksModal = () => {
    setMarksModalOpen(true);
  };

  const handleCloseMarksModal = () => {
    setMarksModalOpen(false);
  };

  if (!show) {
    return null;
  }

  return (
    <div className="teacher-assignment-page">
      <div className="modalOverlayContainer">
        <div className="modalContainer" style={{ maxWidth: "800px" }}>
          <div className="formHeader">
            <div
              className="title"
              style={{ fontSize: "11px", marginLeft: "250px" }}
            >
              <h2>Submitted Student Details</h2>
            </div>
            <div className="closeButton">
              <button onClick={onClose}>
                <FiX />
              </button>
            </div>
          </div>
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
                  <td>
                    <button
                      onClick={() => {
                        handleOpenMarksModal();
                      }}
                      style={{ background: "green", padding: "5px" }}
                    >
                      Submit Marks
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {marksModalOpen && (
        <div className="modal-overlay">
          <div className="modal" style={{ maxWidth: "150px" }}>
            <div className="formHeader">
              {/* <div className="title" style={{ fontSize: "16px", fontWeight: "bold" }}>
      Submit Marks
    </div> */}
              <div className="closeButton">
                <button
                  onClick={handleCloseMarksModal}
                  style={{
                    // background: "none",
                    // border: "none",
                    cursor: "pointer"
                  }}
                >
                  <FiX />
                </button>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px"
              }}
            >
              <label style={{ fontSize: "14px", fontWeight: "bold" }}>
                Marks:
              </label>
              <input
                type="number"
                name="marks"
                value={marks}
                onChange={handleMarksChange}
                style={{
                  width: "100%",
                  margin: "auto",
                  padding: "4px",
                  borderRadius: "4px",
                  border: "1px solid #ccc"
                }}
              />
              <button
                onClick={handleSubmitMarks}
                style={{
                  background: "#28a745",
                  color: "#fff",
                  padding: "5px",
                  borderRadius: "4px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "bold"
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowSubmittedDetailsModal;
