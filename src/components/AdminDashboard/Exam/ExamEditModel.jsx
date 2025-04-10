// ExamEditModel.jsx
import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ExamEditModel = ({
  examId,
  initialExamData,
  onEditExam,
  setShowEditForm
}) => {

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialExamData);

  useEffect(() => {
    setFormData(initialExamData);
  }, [initialExamData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(
      `https://university-project-paresh.onrender.com/University/ExamRoute/exams/${examId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log("Updated Exam:", data);
        onEditExam(examId, formData);
        toast.success("Exam updated successfully");
        setShowEditForm(false);
      })
      .catch((error) => {
        toast.error("Failed to update Exam. Please try again later.");
        console.error("Error updating Exam:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCloseForm = () => {
    setShowEditForm(false);
  };

  return (
    <div className="addExamForm">
      <ToastContainer />
      <div className="modalContent">
        <div className="header">
          <h2 className="title">Add Exam</h2>
          <button className="closeButton" onClick={handleCloseForm}>
            <FiX />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="formGrid">
          <div className="inputGroup">
            <label htmlFor="exam-branch" className="label">
              Exam Branch:
            </label>
            <input
              type="text"
              id="exam-branch"
              name="examBranch"
              value={formData.examBranch}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="exam-year" className="label">
              Exam Year:
            </label>
            <input
              type="text"
              id="exam-year"
              name="examYear"
              value={formData.examYear}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="exam-type" className="label">
              Exam Type:
            </label>
            <input
              type="text"
              id="exam-type"
              name="examType"
              value={formData.examType}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="exam-subject" className="label">
              Exam Subject:
            </label>
            <input
              type="text"
              id="exam-subject"
              name="examSubject"
              value={formData.examSubject}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="exam-timing" className="label">
              Exam Timing:
            </label>
            <input
              type="time"
              id="exam-timing"
              name="examTiming"
              value={formData.examTiming}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="exam-marks" className="label">
              Exam Marks:
            </label>
            <input
              type="text"
              id="exam-marks"
              name="examMarks"
              value={formData.examMarks}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="exam-date" className="label">
              Exam Date:
            </label>
            <input
              type="date"
              id="exam-date"
              name="examDate"
              value={formData.examDate}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="exam-question-paper" className="label">
              Exam Question Paper (PDF):
            </label>
            <input
              type="file"
              id="exam-question-paper"
              accept=".pdf"
              onChange={handleChange}
              className="input"
            />
          </div>
          <button type="submit" className="submitButton">
            {loading ? (
              <div className="spinner" role="status">
                <span className="loader">Loading...</span>
              </div>
            ) : (
              "Save"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExamEditModel;
