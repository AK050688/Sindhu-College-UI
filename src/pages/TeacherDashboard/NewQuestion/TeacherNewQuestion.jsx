import React, { useState } from "react";
import "./TeacherNewQuestion.css";

function TeacherNewQuestion() {
  const [showForm, setShowForm] = useState(false);
  const [questionPaperList, setQuestionPaperList] = useState([
    { subject: "Mathematics", class: "8", year: "2023", fileUrl: "#file1" },
    { subject: "English", class: "10", year: "2023", fileUrl: "#file2" },
    { subject: "Science", class: "7", year: "2023", fileUrl: "#file3" },
    { subject: "Mathematics", class: "9", year: "2022", fileUrl: "#file4" }
  ]);
  const [filterClass, setFilterClass] = useState("");
  const [filterSubject, setFilterSubject] = useState("");
  console.log(setQuestionPaperList);

  const handleAddQuestionPaperClick = () => {
    setShowForm(true);
  };

  const handleClassFilterChange = (e) => {
    setFilterClass(e.target.value);
  };

  const handleSubjectFilterChange = (e) => {
    setFilterSubject(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowForm(false);
  };

  const filteredQuestionPaperList = questionPaperList.filter(
    (questionPaper) => {
      if (filterClass && filterSubject) {
        return (
          questionPaper.class === filterClass &&
          questionPaper.subject === filterSubject
        );
      } else if (filterClass) {
        return questionPaper.class === filterClass;
      } else if (filterSubject) {
        return questionPaper.subject === filterSubject;
      } else {
        return true;
      }
    }
  );

  return (
    <div className="question-paper-page">
      <button
        className="add-question-paper-btn"
        onClick={handleAddQuestionPaperClick}
      >
        Add Question Paper
      </button>
      {showForm && (
        <form className="add-question-paper-form" onSubmit={handleFormSubmit}>
          <input className="form-input" type="text" placeholder="Subject" />
          <input className="form-input" type="text" placeholder="Class" />
          <input className="form-input" type="text" placeholder="Year" />
          <input className="form-input" type="file" />
          <button className="submit-btn" type="submit">
            Submit
          </button>
        </form>
      )}

      <div className="filter-section">
        <label className="filter-label">Course Taken:</label>
        <select
          className="filter-select"
          value={filterSubject}
          onChange={handleSubjectFilterChange}
        >
          <option value="">All</option>
          <option value="Mathematics">B.Tech</option>
          <option value="English">B.com</option>
          <option value="Science">BA</option>
          {/* Add more options for subjects */}
        </select>

        <label className="filter-label">Branch Name:</label>
        <select
          className="filter-select"
          value={filterSubject}
          onChange={handleSubjectFilterChange}
        >
          <option value="">All</option>
          <option value="Mathematics">CS</option>
          <option value="English">English</option>
          <option value="Science">Science</option>
        </select>
        <button
          className="filter-btn"
          onClick={() => {
            setFilterClass("");
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

export default TeacherNewQuestion;
