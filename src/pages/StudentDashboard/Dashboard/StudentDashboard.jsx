import React from "react";
import Assignment from "../../../img/assignment.png";
import Course from "../../../img/book.png";
import TotalClass from "../../../img/teacher.png";
import Quiz from "../../../img/ideas.png";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-first-section">
        <div>
          <span>
            <img src={Course} alt="" />
          </span>
          <span>Enrolled Courses</span>
        </div>
        <div>
          <span>
            <img src={TotalClass} alt="" />
          </span>
          <span>Total Class</span>
        </div>
        <div>
          <span>
            <img src={Assignment} alt="" />
          </span>
          <span>Assignment</span>
        </div>
        <div>
          <span>
            <img src={Quiz} alt="" />
          </span>
          <span>Quiz</span>
        </div>
        <div>
          <span>
            <img src={Assignment} alt="" />
          </span>
          <span>Add account</span>
        </div>
      </div>
      <div className="dashboard-second-section">
        <div className="dashboard-search-box">
          <span>My Groups</span>
          <input type="text" placeholder="Search groups" />
        </div>
        <div className="dashboard-group-card">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
