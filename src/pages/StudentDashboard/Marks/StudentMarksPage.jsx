import React, { useState } from "react";
import "./StudentMarksPage.css";

const StudentMarksPage = () => {
  // Dummy data for demonstration
  const assignmentMarks = [
    {
      subject: "Math",
      marks: 85,
      totalMarks: 100,
      date: "12-12-2015"
    },
    {
      subject: "Science",
      marks: 78,
      totalMarks: 100,
      date: "12-12-2015"
    },
    {
      subject: "History",
      marks: 90,
      totalMarks: 100,
      date: "12-12-2015"
    }
  ];

  const testMarks = [
    {
      subject: "Math",
      marks: 75,
      totalMarks: 100,
      date: "12-12-2015"
    },
    {
      subject: "Science",
      marks: 82,
      totalMarks: 100,
      date: "12-12-2015"
    },
    {
      subject: "History",
      marks: 88,
      totalMarks: 100,
      date: "12-12-2015"
    }
  ];

  const totalAssignmentMarks = assignmentMarks.reduce(
    (total, item) => total + item.marks,
    0
  );
  const totalTestMarks = testMarks.reduce(
    (total, item) => total + item.marks,
    0
  );

  // const totalMarksObtained = totalAssignmentMarks + totalTestMarks;

  const [selectedTab, setSelectedTab] = useState("assignment");

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="MarksPage">
      <div className="card" onClick={() => handleTabClick("assignment")}>
        <div className="card-header">Total Assignment Marks</div>
        <div className="card-body">
          Total: {totalAssignmentMarks} / {assignmentMarks.length * 100}
        </div>
      </div>
      <div className="card" onClick={() => handleTabClick("test")}>
        <div className="card-header">Total Test Marks</div>
        <div className="card-body">
          Total: {totalTestMarks} / {testMarks.length * 100}
        </div>
      </div>
      <div
        className="table-container"
        style={{ display: selectedTab === "assignment" ? "block" : "none" }}
      >
        <h2>Assignment Marks</h2>
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Marks</th>
              <th>Total Marks</th>
              <th>Date</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {assignmentMarks.map((item, index) => (
              <tr key={index}>
                <td>{item.subject}</td>
                <td>{item.marks}</td>
                <td>{item.totalMarks}</td>
                <td>{item.date}</td>
                <td>
                  <button>view</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        className="table-container"
        style={{ display: selectedTab === "test" ? "block" : "none" }}
      >
        <h2>Test Marks</h2>
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Marks</th>
              <th>Total Marks</th>
              <th>Date</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {testMarks.map((item, index) => (
              <tr key={index}>
                <td>{item.subject}</td>
                <td>{item.marks}</td>
                <td>{item.totalMarks}</td>
                <td>{item.date}</td>
                <td>
                  <button>view</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentMarksPage;
