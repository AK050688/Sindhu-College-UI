import React, { useState, useEffect } from "react";
import axios from "axios";
import "./StudentAttendancePage.css";
import AttendanceSummary from "./AttendanceSummary";

function StudentAttendancePage() {
  const [attendanceList, setAttendanceList] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [attendancePercentage, setAttendancePercentage] = useState(0);

  useEffect(() => {
    axios
      .get(
        "https://university-project-paresh.onrender.com/University/Student/getAttendanceReport/65c0da0ea77027ead7edc5fe"
      )
      .then((response) => {
        // console.log(response.data.attendance);
        setAttendanceList(response.data.attendance);
        setAttendancePercentage(response.data.attendancePercentage);
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      });
  }, []);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const filteredAttendanceList = selectedDate
    ? attendanceList.filter(
        (attendance) =>
          new Date(attendance.date).toISOString().slice(0, 10) === selectedDate
      )
    : attendanceList;

  return (
    <div className="student-attendance-page">
      <div className="filter-section">
        <label>Select Date:</label>
        <input type="date" value={selectedDate} onChange={handleDateChange} />
      </div>
      <AttendanceSummary
        attendanceList={filteredAttendanceList}
        attendancePercentage={attendancePercentage}
      />
      <div className="attendance-list">
        <div className="card-container">
          {filteredAttendanceList.map((attendance, index) => (
            <div key={index} className="card">
              <p>
                <strong>Date:</strong> {formatDateString(attendance.date)}
              </p>
              <p>
                <strong>Attendance:</strong>{" "}
                {attendance.present ? "Present" : "Absent"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StudentAttendancePage;
