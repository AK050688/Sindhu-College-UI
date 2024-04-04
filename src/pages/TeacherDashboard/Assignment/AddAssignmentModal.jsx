import React, { useState } from "react";
import axios from "axios";
import "./TeacherAssignmentPage.css";
import { FiX } from "react-icons/fi";

const AddAssignmentModal = ({ onAddTeacherAssignment, setShowAddModal }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    assignMent_for: ""
    // file: null
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  //   const handleFileChange = (e) => {
  //     setFormData({
  //       ...formData,
  //       file: e.target.files[0]
  //     });
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const teacherId = localStorage.getItem("teacherId");
    const teacherName = localStorage.getItem("teacherName");
    const teacherToken = localStorage.getItem("teacherToken");
    try {
      const formDataToSend = {
        title: formData.title,
        description: formData.description,
        deadline: formData.deadline,
        assignMent_for: formData.assignMent_for,
        // file: formData.file,
        createdBy: teacherId,
        teacherName: teacherName
      };
      console.log("formData", formDataToSend);

      const response = await axios.post(
        "https://university-project-paresh.onrender.com/University/AssignmentRoute/addAssignment",
        formDataToSend,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${teacherToken}`
          }
        }
      );
      console.log("Assignment added successfully:", response.data);
      onAddTeacherAssignment(response.data);
      setShowAddModal(false);
    } catch (error) {
      console.error("Error adding assignment:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleCloseForm = () => {
    setShowAddModal(false);
  };

  return (
    <div className="modalOverlayContainer">
      <div className="modalContainer">
        <div className="formHeader">
          <div className="title">
            <h2>Add Assignment</h2>
          </div>
          <div className="closeButton">
            <button onClick={handleCloseForm}>
              <FiX />
            </button>
          </div>
        </div>
        <form className="add-assignment-form" onSubmit={handleSubmit}>
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
            <label htmlFor="deadlines">Deadlines:</label>
            <input
              id="deadline"
              name="deadline"
              className="form-input"
              type="date"
              placeholder="Deadlines"
              value={formData.deadlines}
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
          <div className="form-group">
            <label htmlFor="file">File:</label>
            <input
              id="file"
              name="file"
              className="form-input"
              type="file"
              //   onChange={handleFileChange}
            />
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

export default AddAssignmentModal;
