import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TeacherSyllabus.css";
import AddTeacherSyllabusModal from "./AddTeacherSyllabusModal";
import EditTeacherSyllabusModal from "./EditTeacherSyllabusModal";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";


function TeacherSyllabusPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [syllabusList, setSyllabusList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSyllabus, setSelectedSyllabus] = useState(null);
  const [filterBranch, setFilterBranch] = useState("Computer Science");
  const [courseOptions, setCourseOptions] = useState([]);

  useEffect(() => {
    fetchCourses();
    fetchSyllabus();
  }, []);

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

  const fetchSyllabus = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://university-project-paresh.onrender.com/University/syllabusRoute/allSyllabus"
      );
      setSyllabusList(response.data.syllabusList);
    } catch (error) {
      console.error("Error fetching syllabus:", error);
    } finally {
      setLoading(false);
    }
  };

  const addTeacherSchedule = (newSyllabus) => {
    setSyllabusList([...syllabusList, newSyllabus.syllabusEntry]);
  };

  const updateTeacherSyllabus = (syllabusId, updatedSyllabus) => {
    setSyllabusList(
      syllabusList.map((item) =>
        item._id === syllabusId ? { ...item, ...updatedSyllabus } : item
      )
    );
  };

  const handleEditSyllabus = (syllabus) => {
    setSelectedSyllabus(syllabus);
    setShowEditModal(true);
  };

  const handleDeleteSyllabus = async (syllabusId) => {
    try {
      await axios.delete(
        `https://university-project-paresh.onrender.com/University/syllabusRoute/deleteSyllabus/${syllabusId}`
      );
      const response = await axios.get(
        "https://university-project-paresh.onrender.com/University/syllabusRoute/allSyllabus"
      );
      setSyllabusList(response.data.syllabusList);
    } catch (error) {
      console.error("Error deleting schedule:", error);
    }
  };

  const handleBranchFilter = (e) => {
    setFilterBranch(e.target.value);
  };

  const filteredSyllabusList = syllabusList.filter(
    (syllabus) => syllabus.branch === filterBranch
  );

  return (
    <div className="teacher-syllabus-page">
      {showAddModal && (
        <AddTeacherSyllabusModal
          setShowAddModal={setShowAddModal}
          onAddTeacherAssignment={addTeacherSchedule}
        />
      )}

      {showEditModal && (
        <EditTeacherSyllabusModal
          syllabusId={selectedSyllabus._id}
          initialSyllabus={selectedSyllabus}
          onUpdateTeacherSyllabus={updateTeacherSyllabus}
          setShowEditModal={setShowEditModal}
        />
      )}

      <div className="filter-section">
        <div>
          <label className="filter-label">Filter by Branch:</label>
          <select
            id="courseFilter"
            value={filterBranch}
            onChange={handleBranchFilter}
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
          <button
            className="add-syllabus-btn"
            onClick={() => setShowAddModal(true)}
          >
            Add Syllabus
          </button>
        </div>
      </div>

      <h2 className="syllabus-list-title">Syllabus List</h2>
      <div className="syllabus-list">
        {loading ? (
          <div>Loading...</div>
        ) : (
          filteredSyllabusList.map((syllabus, index) => (
            <div key={index} className="card">
              <p>
                <strong>Branch:</strong> {syllabus.branch}
              </p>
              <p>
                <strong>Content:</strong> {syllabus.content}
              </p>
              <p>
                <strong>Subject:</strong> {syllabus.subject}
              </p>
              <div className="icon-container">
                <div>
                  <AiOutlineEdit
                    className="edit-icon"
                    onClick={() => handleEditSyllabus(syllabus)}
                  />
                </div>
                <div>
                  <AiOutlineDelete
                    className="delete-icon"
                    onClick={() => handleDeleteSyllabus(syllabus._id)}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TeacherSyllabusPage;
