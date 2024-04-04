import React from "react";

const StudentTestCard = ({ key, test }) => {
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
    </div>
  );
};

export default StudentTestCard;
