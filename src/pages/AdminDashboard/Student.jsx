import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaTrash,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";
import "../../styles/AdminDashboard/student.css";
import Navbar from "../../components/AdminDashboard/Navbar";
import StudentModal from "../../components/AdminDashboard/StudentModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Student() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
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
        setStudents(data.Students);
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
        toast.success(response.message);
      })
      .catch((error) => {
        console.error("Error deleting student:", error);
        toast.error("Failed to delete course. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handlePaidClick = (rollNo) => {
    // Implement functionality for marking student as paid
    // You can perform API request here to mark the student as paid
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  // Filter students based on search query
  const filteredStudents = students.filter((student) =>
    Object.values(student).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const currentRows = filteredStudents.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);

  return (
    <div className="student-container">
      <div className="h-[60px] bg-black">
        <Navbar />
      </div>
      <ToastContainer />
      <div className="bg-login bg-cover h-[89vh]">
        <section className="flex flex-col md:flex-row justify-between items-center p-2 rounded-lg mb-4 border-0 border-white mt-3">
          <h1 className="text-3xl font-semibold text-white text-center md:text-left mb-4 md:mb-0 md:mr-4 md:ml-0">
            All Student Lists
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
                    <th>Roll No.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>State</th>
                    <th>Course Taken</th>
                    <th>Branch Name</th>
                    <th>Admission Year</th>
                    <th>Fees</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRows.map((student, index) => (
                    <tr
                      key={index}
                      className="bg-transparent"
                      onClick={() => handleRowClick(student)}
                    >
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
                          className="border-0 text-blue-700 rounded-md border-white"
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
                          className="border-0 text-red-700 rounded-md border-white"
                        >
                          <FaTrash className="mr-1" />
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
            disabled={indexOfLastRow >= filteredStudents.length}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Student;
