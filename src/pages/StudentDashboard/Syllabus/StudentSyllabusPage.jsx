import React, { useState, useEffect } from "react";
import axios from "axios";
import "./StudentSyllabus.css";


function StudentSyllabusPage() {
  const [syllabusList, setSyllabusList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterBranch, setFilterBranch] = useState("Computer Science");
  const [courseOptions, setCourseOptions] = useState([]);

  useEffect(() => {
    fetchCourses();
    fetchSyllabus();
  }, []);

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

  const fetchSyllabus = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://university-project-paresh.onrender.com/University/syllabusRoute/allSyllabus"
      );
      setSyllabusList(response.data.syllabusList);
    } catch (error) {
      console.error("Error fetching syllabus:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBranchFilter = (e) => {
    setFilterBranch(e.target.value);
  };

  const filteredSyllabusList = syllabusList.filter(
    (syllabus) => syllabus.branch === filterBranch
  );

  return (
    <div className="student-syllabus-page">
      <div className="filter-section">
        <label className="filter-label">Filter by Branch:</label>
        <select
          id="courseFilter"
          value={filterBranch}
          onChange={handleBranchFilter}
        >
          <option value="">Select Branch</option>
          {courseOptions.map((course, index) => (
            <option key={index} value={course}>
              {course}
            </option>
          ))}
        </select>
      </div>

      <h2 className="syllabus-list-title">Syllabus List</h2>
      <div className="syllabus-list">
        {loading ? (
          <div>Loading...</div>
        ) : (
          filteredSyllabusList.map((syllabus, index) => (
            <div key={index} className="card">
              <p>
                <strong>Branch:</strong> {syllabus.branch}
              </p>
              <p>
                <strong>Content:</strong> {syllabus.content}
              </p>
              <p>
                <strong>Subject:</strong> {syllabus.subject}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default StudentSyllabusPage;
