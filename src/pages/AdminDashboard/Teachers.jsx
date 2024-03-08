import React, { useState, useEffect } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
  FaTrash
} from "react-icons/fa";
import Navbar from "../../components/AdminDashboard/Navbar";
import TeacherModal from "../../components/AdminDashboard/TeacherModal";
import "../../styles/AdminDashboard/Teacher.css";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

  const filteredTeachers = teachers.filter((teacher) =>
    Object.values(teacher).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const currentRows = filteredTeachers.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredTeachers.length / rowsPerPage);

  return (
    <div className="teacher-container">
      <div className="h-[60px] bg-black">
        <Navbar />
      </div>
      {/* <ToastContainer /> */}
      <div className="bg-login bg-cover h-[88.2vh]">
        <section className="flex flex-col md:flex-row justify-between items-center p-2 rounded-lg mb-4 border-0 border-white mt-3">
          <h1 className="text-3xl font-semibold text-white text-center md:text-left mb-4 md:mb-0 md:mr-4 md:ml-0">
            All Teachers Lists
          </h1>
          <div className="flex flex-col md:flex-row items-center md:gap-4 -mt-2">
            <label htmlFor="rowsPerPage" className="text-white text-lg">
              Rows per page:
            </label>
            <select
              name="rowsPerPage"
              id="rowsPerPage"
              className="border p-1 text-gray-800 rounded-md bg-blue-300"
              onChange={(e) => setRowsPerPage(parseInt(e.target.value))}
              value={rowsPerPage}
            >
              <option value="5">5</option>
              <option value="10">10</option>
            </select>
          </div>

          <div className="flex flex-col md:flex-row items-center md:mt-0">
            <div className="relative">
              <input
                type="search"
                name="search"
                placeholder="Search here"
                className="border p-2 px-4 md:px-10 rounded-md focus:outline-none bg-blue-300 text-black"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute top-3 right-2 md:right-4 text-gray-500">
                <FaSearch />
              </div>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 mt-1 md:mt-0">
              Search
            </button>
          </div>
        </section>

        {loading ? (
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="visually-hidden">Loading...</span>
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
                    <th>Gender</th>
                    <th>Blood Group</th>
                    <th>Department</th>
                    <th>Joining Date</th>
                    <th>Delete</th>
                    <th>Disable</th>
                    <th>Enable</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRows.map((teacher, index) => (
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
                      <td>{teacher.gender}</td>
                      <td>{teacher.bloodGroup}</td>
                      <td>{teacher.Department}</td>
                      <td>{teacher.joiningDate}</td>
                      <td>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteTeacher(teacher._id);
                          }}
                          className="border-0 text-red-700 rounded-md border-white"
                        >
                          <FaTrash className="mr-1" />
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDisableStudent(teacher._id);
                          }}
                          className="border-0 text-red-700 rounded-md border-white"
                        >
                          Disable
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEnableStudent(teacher._id);
                          }}
                          className="border-0 text-red-700 rounded-md border-white"
                        >
                          Enable
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
    </div>
  );
}

export default Teachers;
