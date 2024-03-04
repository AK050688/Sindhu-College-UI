import React, { useState, useEffect } from "react";
import { FaSearch, FaTrash } from "react-icons/fa";
import Navbar from "../../components/AdminDashboard/Navbar";
import TeacherModal from "../../components/AdminDashboard/TeacherModal";
import "../../styles/AdminDashboard/Teacher.css";

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  useEffect(() => {
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
  }, []);

  const deleteTeacher = (rollNo) => {
    setTeachers(teachers.filter((teacher) => teacher.rollNo !== rollNo));
  };

  const handleRowClick = (teacher) => {
    setSelectedTeacher(teacher);
  };

  return (
    <div className="teacher-container">
      <div className="h-[60px] bg-black">
        <Navbar />
      </div>
      <div className="bg-login bg-cover h-[91vh]">
        <section className="flex flex-col md:flex-row justify-between items-center p-2 rounded-lg mb-4 border-0 border-white">
          <h1 className="text-3xl font-semibold text-white text-left">
            All Teacher Lists
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
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((teacher, index) => (
                    <tr
                      key={index}
                      className="bg-transparent"
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
                          onClick={() => deleteTeacher(teacher.rollNo)}
                          className="border-0 text-xs text-red-700 px-3 py-1 rounded-md ml-2 mt-0"
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

        {selectedTeacher && (
          <TeacherModal
            teacher={selectedTeacher}
            onClose={() => setSelectedTeacher(null)}
          />
        )}
      </div>
    </div>
  );
}

export default Teachers;
