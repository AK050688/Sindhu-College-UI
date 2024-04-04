import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "../../../style/AdminDashboard/Exam.css";

const ExamEditModel = ({
  examId,
  initialExamData,
  onEditExam,
  setShowEditForm
}) => {
  const [formData, setFormData] = useState(initialExamData);
  const [loading, setLoading] = useState(false);
  console.log(formData);

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
        console.log("Updated Exam:", data);
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
    <div className="form-container">
      <ToastContainer />
      <div className="form-content">
        <div className="form-header">
          <div className="title">
            <h2 className="form-title">Edit Exam</h2>
          </div>
          <div className="close-button">
            <button className="close-icon" onClick={handleCloseForm}>
              <FiX />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-fields">
            <div className="form-field">
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
            <div className="form-field">
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
          </div>
          <div className="form-fields">
            <div className="form-field">
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
            <div className="form-field">
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
          </div>
          <div className="form-fields">
            <div className="form-field">
              <label htmlFor="exam-marks" className="label">
                Exam Timing:
              </label>
              <input
                type="time"
                id="exam-times"
                name="examTiming"
                value={formData.examTiming}
                onChange={handleChange}
                className="input"
              />
            </div>
            <div className="form-field">
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
          </div>
          <div className="form-fields">
            <div className="form-field">
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

            <div className="form-field">
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
          </div>
          <button type="submit" className="submit-button">
            {loading ? (
              <div className="spinner">
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExamEditModel;
