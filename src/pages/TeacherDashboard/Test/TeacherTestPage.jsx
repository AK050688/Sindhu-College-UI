import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TeacherTestPage.css";
import AddTeacherTestModal from "./AddTeacherTestModal";
import EditTeacherTestModal from "./EditTeacherTestModal";
import TeacherTestCard from "./TeacherTestCard";

const TeacherTest = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [test, setTest] = useState([]);
  const [filteredTest, setFilteredTest] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dayFilter, setDayFilter] = useState("Monday");
  const [courseOptions, setCourseOptions] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("B.tech");
  const [selectedTest, setSelectedTest] = useState(null);

  useEffect(() => {
    fetchCourses();
    fetchTest();
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
  const fetchTest = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://university-project-paresh.onrender.com/University/TestRoute/allTests"
      );
      if (Array.isArray(response.data.allTests)) {
        // console.log("Response is an array:", response.data.allTests);
        setTest(response.data.allTests);
        setFilteredTest(response.data.allTests);
      } else {
        console.error("Response is not an array:", response.data.allTests);
      }
    } catch (error) {
      console.error("Error fetching Test:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const filteredData = test.filter(
      (entry) =>
        entry.day === dayFilter &&
        entry.branch.toLowerCase().includes(selectedCourse.toLowerCase()) 
    );
    setFilteredTest(filteredData);
  }, [dayFilter, selectedCourse, test]);

  const addTeacherTest = (newTest) => {
    console.log(newTest.testDetails);
    setTest([...test, newTest.testDetails]);
  };

  const updateTeacherTest = (testId, updatedTest) => {
    setTest(
      test.map((item) =>
        item._id === testId ? { ...item, ...updatedTest } : item
      )
    );
  };

  const handleEditTest = (test) => {
    setSelectedTest(test);
    setShowEditModal(true);
  };

  const handleDeleteTest = async (testId) => {
    try {
      await axios.delete(
        `https://university-project-paresh.onrender.com/University/TestRoute/deleteTest/${testId}`
      );
      const response = await axios.get(
        "https://university-project-paresh.onrender.com/University/TestRoute/allTests"
      );
      setTest(response.data.allTests);
      console.log("Test deleted successfully");
    } catch (error) {
      console.error("Error deleting Test:", error);
    }
  };

  return (
    <div className="teacherTest">
      {showAddModal && (
        <AddTeacherTestModal
          setShowAddModal={setShowAddModal}
          onAddTeacherAssignment={addTeacherTest}
        />
      )}
      {showEditModal && (
        <EditTeacherTestModal
          testId={selectedTest._id}
          initialTest={selectedTest}
          onUpdateTeacherTest={updateTeacherTest}
          setShowEditModal={setShowEditModal}
        />
      )}
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
        <button className="add-test-btn" onClick={() => setShowAddModal(true)}>
          Add Test
        </button>
      </div>

      <h2>Test</h2>
      <div className="test-grid">
        {loading ? (
          <div>Loading...</div>
        ) : (
          filteredTest.map((test, index) => (
            <TeacherTestCard
              key={index}
              test={test}
              onEdit={handleEditTest}
              onDelete={handleDeleteTest}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TeacherTest;
