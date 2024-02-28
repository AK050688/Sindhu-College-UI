import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "./student.css";
import Navbar from "../../components/AdminDashboard/Navbar";

function Student() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowStatus, setRowStatus] = useState({});

  useEffect(() => {
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
        const initialRowStatus = {};
        data.Students.forEach((student) => {
          initialRowStatus[student.rollNo] = true;
        });
        setRowStatus(initialRowStatus);
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const toggleRowStatus = (index) => {
    const updatedTeachers = [...students];
    updatedTeachers[index].status = !updatedTeachers[index].status;
    setStudents(updatedTeachers);
  };

  const deleteRow = (rollNo) => {
    setStudents(students.filter((student) => student.rollNo !== rollNo));
  };

  return (
    <div className="student-container">
      <div className="h-[60px] bg-black">
        <Navbar />
      </div>

      <div className="student-heading">
        <div className="min-h-[90px] rounded flex justify-center items-center">
          <h1 className="text-3xl font-semibold text-blue-600">
            All Student Lists
          </h1>
        </div>
      </div>

      <section className="flex flex-col md:flex-row justify-between items-center px-4 py-2 mt-0 bg-gray-100 border-2">
        <div className="flex items-center md:mb-0">
          <label htmlFor="rowsPerPage" className="text-gray-600">
            Rows per page:
          </label>
          <select
            name="rowsPerPage"
            id="rowsPerPage"
            className="border p-2 px-4 md:px-9 text-gray-800 rounded-md"
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
              className="border p-2 px-4 md:px-28 rounded-md focus:outline-none"
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
                  <th>Enable/Disable</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={index}>
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
                        onClick={() => toggleRowStatus(index)}
                        className={`bg-transparent border rounded-md px-3 py-1 mt-0 text-sm ${
                          student.status
                            ? "border-green-500 bg-green-500 text-white"
                            : "border-red-500 bg-red-500 text-white"
                        }`}
                      >
                        {student.status ? "Enable" : "Disable"}
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => deleteRow(student.rollNo)}
                        className="bg-red-500 text-sm text-white px-3 py-1 rounded-md ml-2 mt-0"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Student;
