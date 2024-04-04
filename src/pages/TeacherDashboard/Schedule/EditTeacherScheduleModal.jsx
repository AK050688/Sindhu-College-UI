import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiX } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";

const EditTeacherScheduleModal = ({
  scheduleId,
  initialSchedule,
  onUpdateTeacherSchedule,
  setShowEditModal
}) => {
  const [formData, setFormData] = useState(initialSchedule);
  const [loading, setLoading] = useState(false);
  const [courseOptions, setCourseOptions] = useState([]);

  useEffect(() => {
    fetchCourses();
  });
  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        "https://university-project-paresh.onrender.com/University/Course/allCourses"
      );
      setCourseOptions(
        response.data.courses.map((course) => course.courseName)
      );
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        `https://university-project-paresh.onrender.com/University/TimeTableRoute/updateTimeTable/${scheduleId}`,
        formData
      );
      console.log("Schedule updated successfully:", response.data);
      toast.success("Schedule updated successfully");
      onUpdateTeacherSchedule(scheduleId, formData);
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating schedule:", error);
      toast.error("Error updating schedule:");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseForm = () => {
    setShowEditModal(false);
  };

  return (
    <div className="modalOverlayContainer">
      <ToastContainer position="top-right" />
      <div className="modalContainer">
        <div className="formHeader">
          <div className="title">
            <h2>Update Schedule</h2>
          </div>
          <div className="closeButton">
            <button onClick={handleCloseForm}>
              <FiX />
            </button>
          </div>
        </div>
        <form className="add-schedule-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="day">Day:</label>
            <select
              id="day"
              name="day"
              className="form-input"
              value={formData.day}
              onChange={handleInputChange}
            >
              <option value="">Select Day</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </div>
          <div className="form-group">
            <div>
              <label htmlFor="time">Start Time:</label>
              <input
                id="startTime"
                name="startTime"
                className="form-input"
                type="time"
                placeholder="Start Time"
                value={formData.startTime}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="endTime">End Time:</label>
              <input
                id="endTime"
                name="endTime"
                className="form-input"
                type="time"
                placeholder="End Time"
                value={formData.endTime}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form-group">
            <div>
              <label htmlFor="subject">Subject:</label>
              <input
                id="subject"
                name="subject"
                className="form-input"
                type="text"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="subjectTeacher">Subject Teacher:</label>
              <input
                id="subjectTeacher"
                name="subjectTeacher"
                className="form-input"
                type="text"
                placeholder="Subject Teacher"
                value={formData.subjectTeacher}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form-group">
            <div>
              <label htmlFor="courseFilter">Branch:</label>
              <select
                id="courseFilter"
                name="branch"
                value={formData.branch}
                onChange={handleInputChange}
              >
                <option value="">Select Branch</option>
                {courseOptions.map((course, index) => (
                  <option key={index} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="section">Section:</label>
              <input
                id="section"
                name="section"
                className="form-input"
                type="text"
                placeholder="Section"
                value={formData.section}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {loading ? (
            <div className="spinner-container">
              <div className="spinner" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <button className="submit-btn" type="submit">
              Submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditTeacherScheduleModal;
