import React from "react";

const StudentScheduleCard = ({ key, schedule }) => {
  return (
    <div key={key} className="schedule-card">
      <div>
        <strong>Day:</strong> {schedule.day}
      </div>
      <div>
        <strong>Time:</strong> {schedule.startTime} - {schedule.endTime}
      </div>
      <div>
        <strong>Subject:</strong> {schedule.subject}
      </div>
      <div>
        <strong>Subject Teacher:</strong> {schedule.subjectTeacher}
      </div>
      <div>
        <strong>Branch:</strong> {schedule.branch}
      </div>
      <div>
        <strong>Section:</strong> {schedule.section}
      </div>
    </div>
  );
};

export default StudentScheduleCard;
