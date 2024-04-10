import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Assignment.css";
import Navbar from "../../../components/AdminDashboard/Navbar";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Assignment() {
  const [assignmentList, setAssignmentList] = useState([]);
  const [filteredAssignments, setFilteredAssignments] = useState([]);
  const [filterTitle, setFilterTitle] = useState("");
  const [filterAssignmentFor, setFilterAssignmentFor] = useState("");
  const [marks, setMarks] = useState({});
  const studentId = localStorage.getItem("studentId");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        "https://university-project-paresh.onrender.com/University/AssignmentRoute/allAssignments"
      )
      .then((response) => {
        setAssignmentList(response.data);
        setFilteredAssignments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching assignment data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleTitleFilterChange = (e) => {
    setFilterTitle(e.target.value);
    filterAssignments(e.target.value, filterAssignmentFor);
  };

  const handleAssignmentForFilterChange = (e) => {
    setFilterAssignmentFor(e.target.value);
    filterAssignments(filterTitle, e.target.value);
  };

  useEffect(() => {
    getMarksForAllAssignments();
    // eslint-disable-next-line
  }, []);

  const getMarksForAllAssignments = () => {
    assignmentList.forEach((assignment) => {
      axios
        .get(
          `https://university-project-paresh.onrender.com/University/MarksRoute/getMyMark/${studentId}/${assignment._id}`
        )
        .then((response) => {
          setMarks((prevMarks) => ({
            ...prevMarks,
            [assignment._id]: response.data.marks
          }));
        })
        .catch((error) => {
          console.error("Error fetching marks:", error);
          setMarks((prevMarks) => ({
            ...prevMarks,
            [assignment._id]: 0
          }));
        });
    });
  };

  const filterAssignments = (title, assignmentFor) => {
    const filtered = assignmentList.filter((assignment) => {
      const titleMatch = assignment.title.toLowerCase().includes(title.toLowerCase());
      const assignmentForMatch = assignment.assignMent_for.toLowerCase().includes(assignmentFor.toLowerCase());
      return titleMatch && assignmentForMatch;
    });
    setFilteredAssignments(filtered);
    setCurrentPage(1);
  };

  const indexOfLastRow = currentPage * itemsPerPage;
  const indexOfFirstRow = indexOfLastRow - itemsPerPage;
  const currentAssignment = filteredAssignments.slice(
    indexOfFirstRow,
    indexOfLastRow
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  return (
    <>
      <Navbar />
      <div className="admin-assignment-page">
        <div className="filter-section">
          <div>
            <label className="filter-label">Title</label>
            <input
              type="search"
              name="search"
              placeholder="Search Title"
              className="searchInput"
              value={filterTitle}
              onChange={handleTitleFilterChange}
            />
          </div>
          <div>
            <label className="filter-label">Assignment for:</label>
            <input
              type="search"
              name="search"
              placeholder="Search Assignment for"
              className="searchInput"
              value={filterAssignmentFor}
              onChange={handleAssignmentForFilterChange}
            />
          </div>
        </div>

        <div className="assignment-list">
          <h2 className="assignment-list-title">Assignment List</h2>
          {loading ? (
            <div className="spinner" role="status">
              <span className="loader"></span>
            </div>
          ) : (
            <div className="table-container">
              <div className="table-section">
                <table>
                  <thead>
                    <tr>
                      <th>SNo.</th>
                      <th>Title</th>
                      <th>Assignment For</th>
                      <th>Description</th>
                      <th>Deadline</th>
                      <th>Teacher Name</th>
                      <th>Download</th>
                      <th>Marks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentAssignment?.map((assignment, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{assignment.title}</td>
                        <td>{assignment.assignMent_for}</td>
                        <td> {assignment.description}</td>
                        <td>
                          {new Date(assignment.deadline).toLocaleDateString(
                            "en-GB"
                          )}
                        </td>
                        <td>{assignment.teacherName}</td>
                        <td>
                          {" "}
                          <a href={assignment.fileUrl} download>
                            Download
                          </a>
                        </td>
                        <td>{marks[assignment._id] || 0}/100</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
        <div className="pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FaChevronLeft />
          </button>
          <span>{currentPage}</span> /{" "}
          <span>{Math.ceil(filteredAssignments.length / itemsPerPage)}</span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastRow >= filteredAssignments.length}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </>
  );
}

export default Assignment;
