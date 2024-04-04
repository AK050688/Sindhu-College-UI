import React from "react";
import { FiX } from "react-icons/fi";
import "./SubmitModal.css";

function SubmitModal({
  showModal,
  setShowModal,
  selectedAssignmentId,
  submissionText,
  handleSubmissionTextChange,
  handleSubmission
}) {
  return (
    <>
      {showModal && (
        <div className="submitModal">
          <div className="modalOverlayContainer">
            <div className="modalContainer" style={{ border: "1px solid red" }}>
              <div className="formHeader">
                <div className="title">
                  <h2>Submit Assignment</h2>
                </div>
                <div className="closeButton">
                  <button onClick={() => setShowModal(false)}>
                    <FiX />
                  </button>
                </div>
              </div>
              <div className="formGroup">
                <label>Assignment ID:</label>
                <input
                  id="selectedAssignmentId"
                  className="formInput"
                  type="text"
                  placeholder="Assignment Id"
                  value={selectedAssignmentId}
                  readOnly
                />
              </div>
              <div className="formGroup">
                <label>Submission Text:</label>
                <textarea
                  className="formInput"
                  rows="4"
                  value={submissionText}
                  onChange={handleSubmissionTextChange}
                />
              </div>
              <button className="submitBtn" onClick={handleSubmission}>
                Assignment Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SubmitModal;
