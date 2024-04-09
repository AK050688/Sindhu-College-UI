import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Navbar from "../../../components/AdminDashboard/Navbar";
import TeacherModal from "./TeacherModal";
import "../../../styles/AdminDashboard/Teacher.css";
import axios from "axios";

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    handleGetData();
  }, [currentPage, rowsPerPage]);

  const handleGetData = () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    fetch(
      "https://university-project-paresh.onrender.com/University/Admin/allTeachers",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setTeachers(data.Teachers);
      })
      .catch((error) => {
        console.error("Error fetching teacher data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleRowClick = (teacher) => {
    setSelectedTeacher(teacher);
  };

  const deleteTeacher = (id) => {
    setLoading(true);
    if (window.confirm(`Are you sure you want to delete this student?`)) {
      setLoading(true);
      console.log("id", id);
      fetch(
        `https://university-project-paresh.onrender.com/University/Admin/deleteTeacher/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          handleGetData();
        })
        .catch((error) => {
          console.error("Error deleting student:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleDisableStudent = (id) => {
    axios
      .put(
        `https://university-project-paresh.onrender.com/University/Admin/disableTeacher/${id}`
      )
      .then((response) => {
        handleGetData();
      })
      .catch((error) => {
        console.error("Error disabling student:", error);
      });
  };

  const handleEnableStudent = (id) => {
    axios
      .put(
        `https://university-project-paresh.onrender.com/University/Admin/enableTeacher/${id}`
      )
      .then((response) => {
        handleGetData();
      })
      .catch((error) => {
        console.error("Error enabling student:", error);
      });
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const filteredTeachers = teachers?.filter((teacher) =>
    Object?.values(teacher)?.some((value) =>
      value?.toString()?.toLowerCase()?.includes(searchQuery.toLowerCase())
    )
  );

  const currentRows = filteredTeachers?.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math?.ceil(filteredTeachers?.length / rowsPerPage);

  return (
    <>
      <Navbar />
      <div className="adminTeacherContainer">
        <div className="select-container">
          <h1>All Teacher Lists</h1>
          <div>
            <label htmlFor="rowsPerPage" className="label">
              Rows per page:
            </label>
            <select
              name="rowsPerPage"
              id="rowsPerPage"
              className="select"
              onChange={(e) => setRowsPerPage(parseInt(e.target.value))}
              value={rowsPerPage}
            >
              <option value="5">5</option>
              <option value="10">10</option>
            </select>
          </div>

          <div className="relative">
            <input
              type="search"
              name="search"
              placeholder="Search here"
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

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
                    <th>#</th>
                    <th>Name</th>
                    <th>Guardian Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>State</th>
                    <th>Department</th>
                    <th>Joining Date</th>
                    <th>Delete</th>
                    <th>Enable</th>
                    <th>Disable</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRows?.map((teacher, index) => (
                    <tr
                      key={index}
                      className={
                        teacher.accountStatus === "Disabled"
                          ? "disabled-row"
                          : ""
                      }
                      onClick={() => handleRowClick(teacher)}
                    >
                      <td>{index + 1}</td>
                      <td>{teacher.Name}</td>
                      <td>{teacher.guardian_Name}</td>
                      <td>{teacher.email}</td>
                      <td>{teacher.mobileNo}</td>
                      <td>{teacher.state}</td>
                      <td>{teacher.Department}</td>
                      <td>
                        {new Date(teacher.joiningDate).toLocaleDateString(
                          "en-GB"
                        )}
                      </td>
                      <td>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteTeacher(teacher._id);
                          }}
                          className="deleteButton"
                        >
                          Delete
                          {/* <FaTrash className="mr-1" /> */}
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEnableStudent(teacher._id);
                          }}
                          className="enableButton"
                        >
                          Enable
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDisableStudent(teacher._id);
                          }}
                          className="disableButton"
                        >
                          Disable
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedTeacher && (
          <TeacherModal
            teacher={selectedTeacher}
            onClose={() => setSelectedTeacher(null)}
          />
        )}

        <div className="pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FaChevronLeft />
          </button>
          <span>{currentPage}</span> / <span>{totalPages}</span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastRow >= filteredTeachers.length}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </>
  );
}

export default Teachers;
