import React, { useState, useEffect } from "react";
import axios from "axios";
import "./../../../styles/AdminDashboard/Schedule.css";
import Navbar from "../../../components/AdminDashboard/Navbar";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Schedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [filteredSchedule, setFilteredSchedule] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dayFilter, setDayFilter] = useState("Tuesday");
  const [sectionFilter, setSectionFilter] = useState("A");
  const [courseOptions, setCourseOptions] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("B.tech");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    fetchCourses();
    fetchSchedule();
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
  const fetchSchedule = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://university-project-paresh.onrender.com/University/TimeTableRoute/timeTableDetails"
      );
      if (Array.isArray(response.data.timetableEntries)) {
        // console.log(
        //   "Response is not an array:",
        //   response.data.timetableEntries
        // );
        setSchedule(response.data.timetableEntries);
        setFilteredSchedule(response.data.timetableEntries);
      } else {
        console.error(
          "Response is not an array:",
          response.data.timetableEntries
        );
      }
    } catch (error) {
      console.error("Error fetching schedule:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const filteredData = schedule.filter(
      (entry) =>
        entry.day === dayFilter &&
        entry.branch.toLowerCase().includes(selectedCourse.toLowerCase()) &&
        entry.section === sectionFilter
    );
    setFilteredSchedule(filteredData);
  }, [dayFilter, selectedCourse, sectionFilter, schedule]);

  const indexOfLastRow = currentPage * itemsPerPage;
  const indexOfFirstRow = indexOfLastRow - itemsPerPage;
  const currentVendors = filteredSchedule.slice(
    indexOfFirstRow,
    indexOfLastRow
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Navbar />
      <div className="adminSchedule">
        <div className="filter-section">
          <div className="filter">
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
          </div>
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
          <div className="filter">
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
          </div>
        </div>

        <h2>Time Tables</h2>

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
                    <th>Day</th>
                    <th>Time</th>
                    <th>Subject</th>
                    <th>Subject Teacher</th>
                    <th>Branch Name</th>
                    <th>Section</th>
                  </tr>
                </thead>
                <tbody>
                  {currentVendors?.map((schedule, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{schedule.day}</td>
                      <td>
                        {schedule.startTime} - {schedule.endTime}
                      </td>
                      <td> {schedule.subject}</td>
                      <td>{schedule.subjectTeacher}</td>
                      <td>{schedule.branch}</td>
                      <td>{schedule.section}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FaChevronLeft />
          </button>
          <span>{currentPage}</span> /{" "}
          <span>{Math.ceil(filteredSchedule.length / itemsPerPage)}</span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastRow >= filteredSchedule.length}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </>
  );
};

export default Schedule;
