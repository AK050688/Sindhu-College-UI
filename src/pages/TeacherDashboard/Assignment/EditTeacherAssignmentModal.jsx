import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TeacherAssignmentPage.css";
import { FiX } from "react-icons/fi";

const EditTeacherAssignmentModal = ({
  assignmentId,
  initialTeacherAssignment,
  onEditTeacherAssignment,
  setShowEditModal
}) => {
  const [formData, setFormData] = useState(initialTeacherAssignment);
//   const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData(initialTeacherAssignment);
  }, [initialTeacherAssignment]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    try {
      const response = await axios.put(
        `https://university-project-paresh.onrender.com/University/AssignmentRoute/updateAssignment/${assignmentId}`,
        formData
      );
      console.log("Assignment updated successfully:", response.data);
      onEditTeacherAssignment(assignmentId, formData);
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating assignment:", error);
    } finally {
    //   setLoading(false);
    }
  };

  const handleCloseForm = () => {
    setShowEditModal(false);
  };

  return (
    <div className="modalOverlayContainer">
      <div className="modalContainer">
        <div className="formHeader">
          <div className="title">
            <h2>Edit Course</h2>
          </div>
          <div className="closeButton">
            <button onClick={handleCloseForm}>
              <FiX />
            </button>
          </div>
        </div>
        <form className="edit-assignment-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              id="title"
              name="title"
              className="form-input"
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input
              id="description"
              name="description"
              className="form-input"
              type="text"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="deadline">Deadline:</label>
            <input
              id="deadline"
              name="deadline"
              className="form-input"
              type="date"
              value={formData.deadline}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="assignMent_for">Assignment For:</label>
            <input
              id="assignMent_for"
              name="assignMent_for"
              className="form-input"
              type="text"
              placeholder="Assignment for"
              value={formData.assignMent_for}
              onChange={handleInputChange}
            />
          </div>
          <button className="submit-btn" type="submit">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTeacherAssignmentModal;
