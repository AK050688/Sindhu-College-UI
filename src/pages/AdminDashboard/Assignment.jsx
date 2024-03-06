// Student.js
import React, { useState, useEffect } from "react";
import Navbar from "../../components/AdminDashboard/Navbar";
import "../../styles/AdminDashboard/Attendance.css";

function Assignment() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="student-container">
      <div className="h-[60px] bg-black">
        <Navbar />
      </div>
      <div className="bg-login bg-cover h-[91vh]">
        <h1 className="text-xl font-semibold text-white text-left">
          Masrks Student Assignment
        </h1>
        <section className="flex flex-col md:flex-row justify-between items-center p-2 rounded-lg mb-4 border-0 border-white gap-1">
          <div className="flex items-center gap-4">
            <label className="text-white text-md">Date:</label>
            <input
              type="date"
              name="Date"
              className="border p-1 px-3 md:px-28 rounded-md focus:outline-none bg-blue-300 text-black"
            />
          </div>
          <div className="flex items-center gap-4">
            <label htmlFor="rowsPerPage" className="text-white text-lg">
              Status:
            </label>
            <select
              name="rowsPerPage"
              id="rowsPerPage"
              className="border p-1 text-gray-800 rounded-md bg-blue-300"
            >
              <option>Select a choice</option>
              <option value="notSubmitted">Not Submitted</option>
              <option value="pending">Pending</option>
              <option value="submitted">Submitted</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <label htmlFor="rowsPerPage" className="text-white text-sm">
              Brance Name:
            </label>
            <input
              type="search"
              name="search"
              placeholder="Search Brance Name"
              className="border p-1 px-4 md:px-28 rounded-md focus:outline-none bg-blue-300 text-black"
            />
          </div>

          <div className="flex items-center">
            <button className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition duration-300 mt-0 text-sm">
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
                    <th>SNo.</th>
                    <th>Roll No.</th>
                    <th>Name</th>
                    <th>Course Taken</th>
                    <th>Branch Name</th>
                    <th className="text-center">Attendance</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={index} className="bg-transparent">
                      <td>{index + 1}</td>
                      <td>{student.rollNo}</td>
                      <td>{student.Name}</td>
                      <td>{student.courseTaken}</td>
                      <td>{student.branchName}</td>
                      <td className="attendance-options">
                        <div className="attendance-radio">
                          <input
                            type="radio"
                            id={`present-${index}`}
                            name={`attendance-${index}`}
                            value="present"
                          />
                          <label htmlFor={`present-${index}`}>
                            Not Submitted
                          </label>
                        </div>
                        <div className="attendance-radio">
                          <input
                            type="radio"
                            id={`absent-${index}`}
                            name={`attendance-${index}`}
                            value="absent"
                          />
                          <label htmlFor={`absent-${index}`}>Pending</label>
                        </div>
                        <div className="attendance-radio">
                          <input
                            type="radio"
                            id={`absent-${index}`}
                            name={`attendance-${index}`}
                            value="absent"
                          />
                          <label htmlFor={`absent-${index}`}>Submitted</label>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Assignment;
