import { FaSearch } from "react-icons/fa";
import Navbar from "../../components/AdminDashboard/Navbar";
import { useEffect, useState } from "react";

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

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
        console.log("teacherData", data.Teachers);
        setTeachers(data.Teachers);
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const toggleTeacherStatus = (index) => {
    const updatedTeachers = [...teachers];
    updatedTeachers[index].status = !updatedTeachers[index].status;
    setTeachers(updatedTeachers);
  };

  const deleteRow = (rollNo) => {
    setTeachers(teachers.filter((teacher) => teacher.rollNo !== rollNo));
  };

  return (
    <div className="teacher-container">
      <div className="h-[60px] bg-black">
        <Navbar />
      </div>
      <div className="student-heading">
        <div className="min-h-[90px] rounded flex justify-center items-center">
          <h1 className="text-3xl font-semibold text-blue-600">
            All Teachers List
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
                  <th>Enable/Disable</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher, index) => (
                  <tr key={index}>
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
                        onClick={() => toggleTeacherStatus(index)}
                        className={`border rounded-md px-3 py-1 mt-0 text-sm ${
                          teacher.status
                            ? "border-red-500 bg-red-500 text-white"
                            : "border-green-500 bg-green-500 text-white"
                        }`}
                      >
                        {teacher.status ? "Disable" : "Enable"}
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => deleteRow(teacher.index)}
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

export default Teachers;
