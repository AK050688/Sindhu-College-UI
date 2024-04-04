import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const TeacherScheduleCard = ({ key, schedule, onEdit, onDelete }) => {
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
      <div className="icon-container">
        <div>
          <AiOutlineEdit
            className="edit-icon"
            onClick={() => onEdit(schedule)}
          />
        </div>
        <div>
          <AiOutlineDelete
            className="delete-icon"
            onClick={() => onDelete(schedule._id)}
          />
        </div>
      </div>
    </div>
  );
};

export default TeacherScheduleCard;
