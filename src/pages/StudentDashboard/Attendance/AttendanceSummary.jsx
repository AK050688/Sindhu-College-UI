import React from "react";

const AttendanceSummary = ({ attendanceList, attendancePercentage }) => {
  const totalPresent = attendanceList.filter(
    (attendance) => attendance.present
  ).length;
  const totalAbsent = attendanceList.length - totalPresent;

  return (
    <div className="attendance-summary-container">
      <div className="attendance-summary">
        <div className="summary-item">
          <div className="summary-value">{totalPresent}</div>
          <div className="summary-label">Present</div>
        </div>
        <div className="summary-item">
          <div className="summary-value">{totalAbsent}</div>
          <div className="summary-label">Absent</div>
        </div>
        <div className="summary-item">
          <div className="summary-value">
            {attendancePercentage.toFixed(2)}%
          </div>
          <div className="summary-label">Attendance Percentage</div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceSummary;
