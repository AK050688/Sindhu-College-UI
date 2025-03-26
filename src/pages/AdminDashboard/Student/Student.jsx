import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../../../styles/AdminDashboard/student.css";
import Navbar from "../../../Components/AdminDashboard/Navbar";
import StudentModal from "./StudentModal";
import axios from "axios";

function Student() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    handleGetData();
  }, [currentPage, rowsPerPage]);

  const handleGetData = () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    fetch(
      "https://university-project-paresh.onrender.com/University/Admin/allStudents",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Student", data?.Students);
        setStudents(data?.Students);
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleRowClick = (student) => {
    setSelectedStudent(student);
  };

  const deleteRow = (id) => {
    if (window.confirm(`Are you sure you want to delete this student?`)) {
      setLoading(true);
      console.log("id", id);
      fetch(
        `https://university-project-paresh.onrender.com/University/Admin/deleteStudent/${id}`,
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

  const handlePaidClick = (rollNo) => {
    // Implement functionality for marking student as paid
    // You can perform API request here to mark the student as paid
  };

  const handleDisableStudent = (id) => {
    axios
      .put(
        `https://university-project-paresh.onrender.com/University/Admin/disableStudent/${id}`
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
        `https://university-project-paresh.onrender.com/University/Admin/enableStudent/${id}`
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
  const filteredStudents = students?.filter((student) =>
    Object?.values(student)?.some((value) =>
      value?.toString()?.toLowerCase()?.includes(searchQuery?.toLowerCase())
    )
  );

  const currentRows = filteredStudents?.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math?.ceil(filteredStudents?.length / rowsPerPage);

  return (
    <>
      <Navbar />
      <div className="adminStudentContainer">
        <div className="select-container">
          <h1>All Student Lists</h1>
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
                    <th>SNo.</th>
                    <th>Roll No.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>State</th>
                    <th>Course Taken</th>
                    <th>Branch Name</th>
                    <th>Admission Year</th>
                    <th>Fees</th>
                    <th>Delete</th>
                    <th>Enable</th>
                    <th>Disable</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRows?.map((student, index) => (
                    <tr
                      key={index}
                      className={
                        student.accountStatus === "disabled"
                          ? "disabled-row"
                          : ""
                      }
                      onClick={() => handleRowClick(student)}
                    >
                      <td>{index + 1}</td>
                      <td>{student.rollNo}</td>
                      <td>{student.Name}</td>
                      <td>{student.email}</td>
                      <td>{student.state}</td>
                      <td>{student.courseTaken}</td>
                      <td>{student.branchName}</td>
                      <td>{student.admissionYear}</td>
                      <td>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePaidClick(student._id);
                          }}
                          className="paidButton"
                        >
                          Paid
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteRow(student._id);
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
                            handleEnableStudent(student._id);
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
                            handleDisableStudent(student._id);
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

        {selectedStudent && (
          <StudentModal
            student={selectedStudent}
            onClose={() => setSelectedStudent(null)}
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
            disabled={indexOfLastRow >= filteredStudents?.length}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </>
  );
}

export default Student;
