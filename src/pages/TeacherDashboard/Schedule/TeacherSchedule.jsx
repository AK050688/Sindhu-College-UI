import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TeacherSchedule.css";
import AddScheduleModal from "./AddScheduleModal";
import EditTeacherScheduleModal from "./EditTeacherScheduleModal";
import TeacherScheduleCard from "./TeacherScheduleCard";
import { ToastContainer, toast } from "react-toastify";

const TeacherSchedule = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [schedule, setSchedule] = useState([]);
  const [filteredSchedule, setFilteredSchedule] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dayFilter, setDayFilter] = useState("Tuesday");
  const [sectionFilter, setSectionFilter] = useState("A");
  const [courseOptions, setCourseOptions] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("B.tech");
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  useEffect(() => {
    fetchCourses();
    fetchSchedule();
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
  const fetchSchedule = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://university-project-paresh.onrender.com/University/TimeTableRoute/timeTableDetails"
      );
      if (Array.isArray(response.data.timetableEntries)) {
        // console.log("Response is not an array:",response.data.timetableEntries);
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

  const addTeacherSchedule = (newSchedule) => {
    setSchedule([...schedule, newSchedule.timeTableDetails]);
  };

  const updateTeacherSchedule = (scheduleId, updatedSchedule) => {
    setSchedule(
      schedule.map((item) =>
        item._id === scheduleId ? { ...item, ...updatedSchedule } : item
      )
    );
  };

  const handleEditSchedule = (schedule) => {
    setSelectedSchedule(schedule);
    setShowEditModal(true);
  };

  const handleDeleteSchedule = async (scheduleId) => {
    try {
      await axios.delete(
        `https://university-project-paresh.onrender.com/University/TimeTableRoute/deleteTimeTable/${scheduleId}`
      );
      const response = await axios.get(
        "https://university-project-paresh.onrender.com/University/TimeTableRoute/timeTableDetails"
      );
      setSchedule(response.data.timetableEntries);
      toast.success("Schedule deleted successfully");
      console.log("Schedule deleted successfully");
    } catch (error) {
      console.error("Error deleting schedule:", error);
      console.error("Error deleting schedule:", error);
    }
  };

  return (
    <div className="teacherSchedule">
      <ToastContainer position="top-right" />
      {showAddModal && (
        <AddScheduleModal
          setShowAddModal={setShowAddModal}
          onAddTeacherAssignment={addTeacherSchedule}
        />
      )}
      {showEditModal && (
        <EditTeacherScheduleModal
          scheduleId={selectedSchedule._id}
          initialSchedule={selectedSchedule}
          onUpdateTeacherSchedule={updateTeacherSchedule}
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
        <button
          className="add-schedule-btn"
          onClick={() => setShowAddModal(true)}
        >
          Add Schedule
        </button>
      </div>

      <h2>Schedule</h2>
      <div className="schedule-grid">
        {loading ? (
          <div>Loading...</div>
        ) : (
          filteredSchedule.map((schedule, index) => (
            <TeacherScheduleCard
              key={index}
              schedule={schedule}
              onEdit={handleEditSchedule}
              onDelete={handleDeleteSchedule}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TeacherSchedule;
