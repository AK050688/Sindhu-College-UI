import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TeacherAssignmentPage.css";
import AddAssignmentModal from "./AddAssignmentModal";
import ShowSubmittedDetailsModal from "./ShowSubmittedDetailsModal";
import EditTeacherAssignmentModal from "./EditTeacherAssignmentModal";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";


function TeacherAssignmentPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [assignmentList, setAssignmentList] = useState([]);
  const [filterTitle, setFilterTitle] = useState("");
  const [filterAssignmentFor, setFilterAssignmentFor] = useState("");
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [editTeacherAssignment, setEditTeacherAssignment] = useState(null);
  const [assignmentId, setAssignmentId] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://university-project-paresh.onrender.com/University/AssignmentRoute/allAssignments"
      )
      .then((response) => {
        setAssignmentList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching assignment data:", error);
      });
  }, []);

  const addTeacherAssignment = (newTeacherAssignment) => {
    console.log("new", newTeacherAssignment);
    setAssignmentList([
      ...assignmentList,
      newTeacherAssignment.AssignmentDetails
    ]);
  };

  const handleTitleFilterChange = (e) => {
    setFilterTitle(e.target.value);
  };

  const handleAssignmentForFilterChange = (e) => {
    setFilterAssignmentFor(e.target.value);
  };

  const handleShowSubmittedDetails = async (assignmentId) => {
    try {
      const response = await axios.get(
        `https://university-project-paresh.onrender.com/University/AssignmentRoute/assignmentSubmited/${assignmentId}`
      );
      setSelectedAssignment(response.data);
      setAssignmentId(assignmentId);
      setShowSubmitModal(true);
    } catch (error) {
      console.error("Error fetching submitted details:", error);
    }
  };

  const handleEditTeacherAssignment = (
    assignmentId,
    updatedTeacherAssignment
  ) => {
    setAssignmentList(
      assignmentList.map((assignment) => {
        if (assignment._id === assignmentId) {
          return { ...assignment, ...updatedTeacherAssignment };
        }
        return assignment;
      })
    );
  };

  const handleDeleteAssignment = async (assignmentId) => {
    try {
      await axios.delete(
        `https://university-project-paresh.onrender.com/University/AssignmentRoute/deleteAssignment/${assignmentId}`
      );
      const response = await axios.get(
        "https://university-project-paresh.onrender.com/University/AssignmentRoute/allAssignments"
      );
      setAssignmentList(response.data);
      console.log("Assignment deleted successfully");
    } catch (error) {
      console.error("Error deleting assignment:", error);
    }
  };

  const filteredAssignmentList = assignmentList.filter((assignment) => {
    if (filterTitle && filterAssignmentFor) {
      return (
        assignment.title.toLowerCase().includes(filterTitle.toLowerCase()) &&
        assignment.assignMent_for
          .toLowerCase()
          .includes(filterAssignmentFor.toLowerCase())
      );
    } else if (filterTitle) {
      return assignment.title.toLowerCase().includes(filterTitle.toLowerCase());
    } else if (filterAssignmentFor) {
      return assignment.assignMent_for
        .toLowerCase()
        .includes(filterAssignmentFor.toLowerCase());
    } else {
      return true;
    }
  });

  return (
    <div className="teacher-assignment-page">
      {showAddModal && (
        <AddAssignmentModal
          setShowAddModal={setShowAddModal}
          onAddTeacherAssignment={addTeacherAssignment}
        />
      )}
      {selectedAssignment && (
        <ShowSubmittedDetailsModal
          show={showSubmitModal}
          onClose={() => {
            setShowSubmitModal(false);
            setSelectedAssignment(null);
          }}
          submittedDetails={selectedAssignment}
          assignmentId={assignmentId}
        />
      )}

      <div className="filter-section">
        <label className="filter-label">Title</label>
        <input
          type="search"
          name="search"
          placeholder="Search Title"
          className="searchInput"
          value={filterTitle}
          onChange={handleTitleFilterChange}
        />
        <label className="filter-label">Assignment for:</label>
        <input
          type="search"
          name="search"
          placeholder="Search Assignment for"
          className="searchInput"
          value={filterAssignmentFor}
          onChange={handleAssignmentForFilterChange}
        />
        {/* <button
          className="filter-btn"
          onClick={() => {
            setFilterTitle("");
            setFilterAssignmentFor("");
          }}
        >
          Reset
        </button> */}

        <button
          className="add-assignment-btn"
          onClick={() => setShowAddModal(true)}
        >
          Add Assignment
        </button>
      </div>

      <div className="assignment-list">
        <h2 className="assignment-list-title">Assignment List</h2>
        <div className="card-container">
          {filteredAssignmentList.map((assignment, index) => (
            <div key={index} className="card">
              <div>
                <p>
                  <strong>Title:</strong> {assignment.title}
                </p>
                <p>
                  <strong>Assignment For:</strong> {assignment.assignMent_for}
                </p>
                <p>
                  <strong>Description:</strong> {assignment.description}
                </p>
                <p>
                  <strong>Deadline:</strong>
                  {new Date(assignment.deadline).toLocaleDateString("en-GB")}
                </p>
                <p>
                  <strong>Teacher:</strong> {assignment.teacherName}
                </p>
                <p>
                  <strong>File:</strong>{" "}
                  <a href={assignment.fileUrl} download>
                    Download
                  </a>
                </p>
                <div className="icon-container">
                  <div>
                    <AiOutlineEdit
                      onClick={() => {
                        setEditTeacherAssignment(assignment);
                        setShowEditModal(true);
                      }}
                      className="edit-icon"
                    />
                  </div>
                  <div>
                    <AiOutlineDelete
                      onClick={() => handleDeleteAssignment(assignment._id)}
                      className="delete-icon"
                    />
                  </div>
                  <div>
                    <button
                      onClick={() => handleShowSubmittedDetails(assignment._id)}
                    >
                      Show Submitted Student
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showEditModal && (
        <EditTeacherAssignmentModal
          assignmentId={editTeacherAssignment._id}
          initialTeacherAssignment={editTeacherAssignment}
          onEditTeacherAssignment={(assignmentId, updatedTeacherAssignment) =>
            handleEditTeacherAssignment(assignmentId, updatedTeacherAssignment)
          }
          setShowEditModal={setShowEditModal}
        />
      )}
    </div>
  );
}

export default TeacherAssignmentPage;
