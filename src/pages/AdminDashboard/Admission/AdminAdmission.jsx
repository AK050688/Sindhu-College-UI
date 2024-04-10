import React, { useState, useEffect } from "react";
import axios from "axios";
import "./../../../styles/AdminDashboard/AdminAdmission.css";
import Navbar from "../../../components/AdminDashboard/Navbar";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import AdmissionStudentModal from "../../../components/AdminDashboard/Admission/AdmissionStudentModal";

const AdminAdmission = () => {
  const [admission, setAdmission] = useState([]);
  const [filteredAdmission, setFilteredAdmission] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAdmission, setSelectedAdmission] = useState(null);
  // const [dayFilter, setDayFilter] = useState("");
  // const [sectionFilter, setSectionFilter] = useState("");
  const [courseOptions, setCourseOptions] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    fetchCourses();
    fetchAdmission();
  }, [currentPage, itemsPerPage]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        "https://university-project-paresh.onrender.com/University/Course/allCourses"
      );
      setCourseOptions(
        response.data.courses.map((course) => course.courseName)
      );
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
  const fetchAdmission = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://university-project-paresh.onrender.com/University/Admission/allAdmissionForms"
      );
      if (Array.isArray(response.data.applicationForms)) {
        console.log("Response is an array:", response.data.applicationForms);
        setFilteredAdmission(response.data.applicationForms);
        setAdmission(response.data.applicationForms);
      } else {
        console.error(
          "Response is not an array:",
          response.data.applicationForms
        );
      }
    } catch (error) {
      console.error("Error fetching Admission:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const filteredData = admission.filter(
      (entry) =>
        // entry.day === dayFilter &&
        entry.courseTaken.toLowerCase().includes(selectedCourse.toLowerCase())
      // entry.section === sectionFilter
    );
    setFilteredAdmission(filteredData);
  }, [selectedCourse, admission]);

  const indexOfLastRow = currentPage * itemsPerPage;
  const indexOfFirstRow = indexOfLastRow - itemsPerPage;
  const currentRows = filteredAdmission.slice(indexOfFirstRow, indexOfLastRow);

  // console.log("A", currentRows, filteredAdmission, admission);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleRowClick = (admission) => {
    setSelectedAdmission(admission);
  };

  return (
    <>
      <Navbar />
      <div className="adminAdmission">
        <div className="filter-section">
          {/* <div className="filter">
            <label htmlFor="dayFilter">Day:</label>
            <select
              id="dayFilter"
              value={dayFilter}
              onChange={(e) => setDayFilter(e.target.value)}
            >
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </div> */}
          <div className="filter">
            <label htmlFor="courseFilter">Branch:</label>
            <select
              id="courseFilter"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option value="">Select Branch</option>
              {courseOptions.map((course, index) => (
                <option key={index} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>
          {/* <div className="filter">
            <label htmlFor="sectionFilter">Section:</label>
            <select
              id="sectionFilter"
              value={sectionFilter}
              onChange={(e) => setSectionFilter(e.target.value)}
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
            </select>
          </div> */}
        </div>

        <h2>Admission List</h2>

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
                    <th>Name</th>
                    <th>Email</th>
                    <th>MobileNo</th>
                    <th>Gender</th>
                    <th>State Teacher</th>
                    <th>Branch Name</th>
                    <th>Course Taken</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRows?.map((admission, index) => (
                    <tr key={index} onClick={() => handleRowClick(admission)}>
                      <td>{index + 1}</td>
                      <td>{admission.Name}</td>
                      <td>{admission.email}</td>
                      <td> {admission.mobileNo}</td>
                      <td>{admission.gender}</td>
                      <td>{admission.state}</td>
                      <td>{admission.branchName}</td>
                      <td>{admission.courseTaken}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {selectedAdmission && (
          <AdmissionStudentModal
            admission={selectedAdmission}
            onClose={() => setSelectedAdmission(null)}
          />
        )}

        <div className="pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FaChevronLeft />
          </button>
          <span>{currentPage}</span> /{" "}
          <span>{Math.ceil(filteredAdmission.length / itemsPerPage)}</span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastRow >= filteredAdmission.length}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminAdmission;
