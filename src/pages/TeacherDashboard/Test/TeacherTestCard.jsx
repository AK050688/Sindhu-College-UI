import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const TeacherTestCard = ({ key, test, onEdit, onDelete }) => {
  return (
    <div key={key} className="test-card">
      <div>
        <strong>Day:</strong> {test.day}
      </div>
      <div>
        <strong>Time:</strong> {test.startTime} - {test.endTime}
      </div>
      <div>
        <strong>Date:</strong> {test.date}
      </div>
      <div>
        <strong>Subject:</strong> {test.subject}
      </div>
      <div>
        <strong>Test Added By:</strong> {test.testAddedBy}
      </div>
      <div>
        <strong>Branch:</strong> {test.branch}
      </div>
      <div>
        <strong>Test Type:</strong> {test.testType}
      </div>
      <div className="icon-container">
        <div>
          <AiOutlineEdit className="edit-icon" onClick={() => onEdit(test)} />
        </div>
        <div>
          <AiOutlineDelete
            className="delete-icon"
            onClick={() => onDelete(test._id)}
          />
        </div>
      </div>
    </div>
  );
};

export default TeacherTestCard;
