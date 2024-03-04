// Student.js
import React, { useState, useEffect } from "react";
import { FaSearch, FaTrash } from "react-icons/fa";
import "../../styles/AdminDashboard/student.css";
import Navbar from "../../components/AdminDashboard/Navbar";
import StudentModal from "../../components/AdminDashboard/StudentModal";

function Student() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    handleGetData();
  }, []);

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
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
        setLoading(false);
      });
  };

  const handleRowClick = (student) => {
    setSelectedStudent(student);
  };

  const deleteRow = (rollNo) => {
    setStudents(students.filter((student) => student.rollNo !== rollNo));
  };

  return (
    <div className="student-container">
      <div className="h-[60px] bg-black">
        <Navbar />
      </div>
      <div className="bg-login bg-cover h-[91vh]">
        <section className="flex flex-col md:flex-row justify-between items-center p-2 rounded-lg mb-4 border-0 border-white">
          <h1 className="text-3xl font-semibold text-white text-left">
            All Student Lists
          </h1>
          <div className="flex items-center gap-4">
            <label htmlFor="rowsPerPage" className="text-white text-lg">
              Rows per page:
            </label>
            <select
              name="rowsPerPage"
              id="rowsPerPage"
              className="border p-1 text-gray-800 rounded-md bg-blue-300"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
          </div>

          <div className="flex items-center">
            <div className="relative">
              <input
                type="search"
                name="search"
                placeholder="Search here"
                className="border p-2 px-4 md:px-28 rounded-md focus:outline-none bg-blue-300 text-black"
              />
              <div className="absolute top-3 right-2 text-gray-500">
                <FaSearch />
              </div>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 mt-0">
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
                    <th>Father&apos;s Name</th>
                    <th>Email</th>
                    <th>State</th>
                    <th>Gender</th>
                    <th>Course Taken</th>
                    <th>Branch Name</th>
                    <th>Admission Year</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr
                      key={index}
                      className="bg-transparent"
                      onClick={() => handleRowClick(student)} // Handle row click
                    >
                      <td>{student.rollNo}</td>
                      <td>{student.Name}</td>
                      <td>{student.fatherName}</td>
                      <td>{student.email}</td>
                      <td>{student.state}</td>
                      <td>{student.gender}</td>
                      <td>{student.courseTaken}</td>
                      <td>{student.branchName}</td>
                      <td>{student.admissionYear}</td>
                      <td>
                        <button
                          onClick={() => deleteRow(student.rollNo)}
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
      </div>
    </div>
  );
}

export default Student;
