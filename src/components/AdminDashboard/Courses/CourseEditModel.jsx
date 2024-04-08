// CourseEditModel.jsx
import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CourseEditModel = ({
  courseId,
  initialCourseData,
  onEditCourse,
  setShowEditForm
}) => {
  const [formData, setFormData] = useState(initialCourseData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData(initialCourseData);
  }, [initialCourseData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(
      `https://university-project-paresh.onrender.com/University/Course/updateCourse/${courseId}`,
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
        // console.log("Updated course:", data);
        onEditCourse(courseId, formData);
        toast.success("Course updated successfully");
        setShowEditForm(false);
      })
      .catch((error) => {
        toast.error("Failed to update course. Please try again later.");
        console.error("Error updating course:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCloseForm = () => {
    setShowEditForm(false);
  };

  return (
    <div className="addCourseModal">
      <ToastContainer />
      <div className="modalContent">
        <div className="modalHeader">
          <div className="modalTitle">
            <h2>Add Course</h2>
          </div>
          <div className="modalCloseButton">
            <button className="closeButton" onClick={handleCloseForm}>
              <FiX />
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="modalForm">
          <div className="fornGroup">
            <label htmlFor="course-name">Course Name:</label>
            <input
              type="text"
              id="course-name"
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              className="inputField"
            />
          </div>
          <div className="fornGroup">
            <label htmlFor="course-fee">Course Fee:</label>
            <input
              type="number"
              id="course-fee"
              name="courseFees"
              value={formData.courseFees}
              onChange={handleChange}
              className="inputField"
            />
          </div>
          <div className="fornGroup">
            <label htmlFor="course-date">Course Year:</label>
            <input
              type="date"
              id="course-date"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="inputField"
            />
          </div>
          <button type="submit" className="submitButton">
            {loading ? (
              <div className="spinner" role="status">
                <span className="loader">Loading...</span>
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

export default CourseEditModel;
