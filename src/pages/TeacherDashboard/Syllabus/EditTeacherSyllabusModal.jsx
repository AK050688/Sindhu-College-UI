import axios from "axios";
import React, { useState } from "react";
import { FiX } from "react-icons/fi";

const EditTeacherSyllabusModal = ({
  syllabusId,
  initialSyllabus,
  onUpdateTeacherSyllabus,
  setShowEditModal
}) => {
  const [formData, setFormData] = useState(initialSyllabus);
  const [loading, setLoading] = useState(false);
console.log(formData)
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
        `https://university-project-paresh.onrender.com/University/syllabusRoute/updateSyllabus/${syllabusId}`,
        formData
      );
      console.log("Syllabus updated successfully:", response.data);
      onUpdateTeacherSyllabus(syllabusId, formData);
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating schedule:", error);
    } finally {
      setLoading(false);
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
            <h2>Update Syllabus</h2>
          </div>
          <div className="closeButton">
            <button onClick={handleCloseForm}>
              <FiX />
            </button>
          </div>
        </div>
        <form className="add-schedule-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <div>
              <label htmlFor="branch">Branch:</label>
              <input
                id="branch"
                name="branch"
                className="form-input"
                type="text"
                placeholder="Branch"
                value={formData.branch}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="content">Content:</label>
              <input
                id="content"
                name="content"
                className="form-input"
                type="text"
                placeholder="Content"
                value={formData.content}
                onChange={handleInputChange}
              />
            </div>
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

export default EditTeacherSyllabusModal;
