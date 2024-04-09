import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Assignment.css";
import Navbar from "../../../components/AdminDashboard/Navbar";

function Assignment() {
  const [assignmentList, setAssignmentList] = useState([]);
  const [filterTitle, setFilterTitle] = useState("");
  const [filterAssignmentFor, setFilterAssignmentFor] = useState("");
  const [marks, setMarks] = useState({});
  const studentId = localStorage.getItem("studentId");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        "https://university-project-paresh.onrender.com/University/AssignmentRoute/allAssignments"
      )
      .then((response) => {
        setAssignmentList(response.data);
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
  };

  const handleAssignmentForFilterChange = (e) => {
    setFilterAssignmentFor(e.target.value);
  };

  useEffect(() => {
    getMarksForAllAssignments();
    // eslint-disable-next-line
  }, []);

  const getMarksForAllAssignments = () => {
    assignmentList.forEach((assignment) => {
      // console.log("id", assignment._id)
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
                    {assignmentList?.map((assignment, index) => (
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
      </div>
    </>
  );
}

export default Assignment;
