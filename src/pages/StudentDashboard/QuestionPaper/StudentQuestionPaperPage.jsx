import React, { useState } from "react";
import "./StudentQuestionPaperPage.css";

function StudentQuestionPaperPage() {
  const [questionPaperList, setQuestionPaperList] = useState([
    { subject: "Mathematics", class: "8", year: "2023", fileUrl: "#file1" },
    { subject: "English", class: "10", year: "2023", fileUrl: "#file2" },
    { subject: "Science", class: "7", year: "2023", fileUrl: "#file3" },
    { subject: "Mathematics", class: "9", year: "2022", fileUrl: "#file4" }
  ]);
  const [filterSubject, setFilterSubject] = useState("");

  console.log(setQuestionPaperList);

  const handleSubjectFilterChange = (e) => {
    setFilterSubject(e.target.value);
  };

  const filteredQuestionPaperList = filterSubject
    ? questionPaperList.filter((question) => question.subject === filterSubject)
    : questionPaperList;

  return (
    <div className="question-paper-page">
      <div className="filter-section">
        <label className="filter-label">Filter by Subject:</label>
        <select
          className="filter-select"
          value={filterSubject}
          onChange={handleSubjectFilterChange}
        >
          <option value="">All</option>
          <option value="Mathematics">Mathematics</option>
          <option value="English">English</option>
          <option value="Science">Science</option>
          {/* Add more options for subjects */}
        </select>
        <button
          className="filter-btn"
          onClick={() => {
            setFilterSubject("");
          }}
        >
          Reset
        </button>
      </div>

      <div className="question-paper-list">
        <h2 className="question-paper-list-title">Question Paper List</h2>
        {filteredQuestionPaperList.map((questionPaper, index) => (
          <div key={index} className="card">
            <p>
              <strong>Subject:</strong> {questionPaper.subject}
            </p>
            <p>
              <strong>Class:</strong> {questionPaper.class}
            </p>
            <p>
              <strong>Year:</strong> {questionPaper.year}
            </p>
            <p>
              <strong>File:</strong>{" "}
              <a href={questionPaper.fileUrl} download>
                Download
              </a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentQuestionPaperPage;
