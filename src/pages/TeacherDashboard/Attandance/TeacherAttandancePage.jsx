import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TeacherAttandancePage.css";
import { FiX } from "react-icons/fi";


function TeacherAttandancePage() {
  const [studentList, setStudentList] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [filterRollNo, setFilterRollNo] = useState("");
  const [filterBranch, setFilterBranch] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [attendanceDate, setAttendanceDate] = useState("");
  const [attendancePresent, setAttendancePresent] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get(
        "https://university-project-paresh.onrender.com/University/Teacher/allStudents"
      )
      .then((response) => {
        setStudentList(response.data.Students);
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      });
  }, []);

  const handleNameFilterChange = (e) => {
    setFilterName(e.target.value);
  };

  const handleRollNoFilterChange = (e) => {
    setFilterRollNo(e.target.value);
  };

  const handleBranchFilterChange = (e) => {
    setFilterBranch(e.target.value);
  };

  const handleAttendanceDateChange = (e) => {
    setAttendanceDate(e.target.value);
  };

  const handleAttendancePresentChange = (e) => {
    setAttendancePresent(e.target.checked);
  };

  const handleTakeAttendance = (studentId) => {
    setSelectedStudentId(studentId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    // Reset attendance data when modal closes
    setAttendanceDate("");
    setAttendancePresent(true);
  };

  const handleUpdateAttendance = () => {
    // Call API to update attendance
    axios
      .put(
        `https://university-project-paresh.onrender.com/University/Student/updateAttendance/${selectedStudentId}`,
        {
          date: attendanceDate,
          present: attendancePresent
        }
      )
      .then((response) => {
        console.log("Attendance updated successfully:", response.data);
        setShowModal(false);
        // Reset attendance data after successful update
        setAttendanceDate("");
        setAttendancePresent(true);
      })
      .catch((error) => {
        console.error("Error updating attendance:", error);
      });
  };

  const filteredStudentList = studentList.filter((student) => {
    return (
      student.Name.toLowerCase().includes(filterName.toLowerCase()) &&
      student.rollNo.toLowerCase().includes(filterRollNo.toLowerCase()) &&
      student.branchName.toLowerCase().includes(filterBranch.toLowerCase())
    );
  });

  return (
    <div className="teacher-attandance-page">
      <div className="filter-section">
        <div>
          <label className="filter-label">Name:</label>
          <input
            type="search"
            name="search"
            placeholder="Search Name"
            className="searchInput"
            value={filterName}
            onChange={handleNameFilterChange}
          />
        </div>
        <div>
          <label className="filter-label">Roll No:</label>
          <input
            type="search"
            name="search"
            placeholder="Search Roll No"
            className="searchInput"
            value={filterRollNo}
            onChange={handleRollNoFilterChange}
          />
        </div>
        <div>
          <label className="filter-label">Branch:</label>
          <input
            type="search"
            name="search"
            placeholder="Search Branch"
            className="searchInput"
            value={filterBranch}
            onChange={handleBranchFilterChange}
          />
        </div>
      </div>

      <div className="attandance-list">
        <div className="card-container">
          {filteredStudentList.map((student, index) => (
            <div key={index} className="card">
              <p>
                <strong>Roll No:</strong> {student.rollNo}
              </p>
              <p>
                <strong>UID:</strong> {student.UID}
              </p>
              <p>
                <strong>Branch Name:</strong> {student.branchName}
              </p>
              <p>
                <strong>Name:</strong> {student.Name}
              </p>
              <button onClick={() => handleTakeAttendance(student._id)}>
                Take Attendance
              </button>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="modalOverlayContainer">
          <div className="modalContainer">
            <div className="formHeader">
              <div className="title">
                <h2>Update Attendance</h2>
              </div>
              <div className="closeButton">
                <button onClick={handleCloseModal}>
                  <FiX />
                </button>
              </div>
            </div>
            <div className="form-group">
              <label>Date:</label>
              <input
                className="form-input"
                type="date"
                value={attendanceDate}
                onChange={handleAttendanceDateChange}
              />
            </div>
            <div className="form-group">
              <label>Present:</label>
              <input
                className="form-input"
                type="checkbox"
                checked={attendancePresent}
                onChange={handleAttendancePresentChange}
              />
            </div>
            <button className="submit-btn" onClick={handleUpdateAttendance}>
              Update Attendance
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherAttandancePage;
