import React, { useState } from "react";
import "./TeacherMarksPage.css";

const TeacherMarksPage = () => {
  const [students, setStudents] = useState([
    {
      name: "John Doe",
      class: "Class A",
      assignmentMarks: { math: 85, science: 90, english: 88, history: 92 },
      testMarks: { math: 90, science: 85, english: 92, history: 80 }
    }
  ]);

  const [selectedClass, setSelectedClass] = useState("All");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedMarksType, setSelectedMarksType] = useState("All");

  const [mathInput, setMathInput] = useState("");
  const [scienceInput, setScienceInput] = useState("");
  const [englishInput, setEnglishInput] = useState("");
  const [historyInput, setHistoryInput] = useState("");
  console.log(setHistoryInput, setEnglishInput, setScienceInput);

  const updateMarks = (studentIndex) => {
    const updatedStudents = [...students];
    updatedStudents[studentIndex].assignmentMarks[selectedSubject] =
      parseInt(mathInput);
    setStudents(updatedStudents);
  };

  const filteredStudents = students.filter((student) => {
    if (selectedClass !== "All" && student.class !== selectedClass) {
      return false;
    }
    if (
      selectedSubject !== "All" &&
      !Object.keys(student.assignmentMarks).includes(selectedSubject)
    ) {
      return false;
    }
    if (selectedMarksType === "Assignment") {
      return true;
    }
    if (selectedMarksType === "Test") {
      return true;
    }
    return true;
  });

  return (
    <div>
      <h1>Student Marks</h1>
      <div>
        <label>Filter by Class:</label>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Class A">Class A</option>
          <option value="Class B">Class B</option>
        </select>
      </div>
      <div>
        <label>Filter by Subject:</label>
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          <option value="All">All</option>
          <option value="math">Math</option>
          <option value="science">Science</option>
          <option value="english">English</option>
          <option value="history">History</option>
        </select>
      </div>
      <div>
        <label>Filter by Marks Type:</label>
        <select
          value={selectedMarksType}
          onChange={(e) => setSelectedMarksType(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Assignment">Assignment</option>
          <option value="Test">Test</option>
        </select>
      </div>
      <h3>Student Marks</h3>
      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Class</th>
            <th>Math</th>
            <th>Science</th>
            <th>History</th>
            <th>Geo</th>
            <th>Button</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.class}</td>
              <td>
                <input
                  type="number"
                  value={
                    selectedSubject === "math"
                      ? mathInput
                      : selectedSubject === "science"
                      ? scienceInput
                      : selectedSubject === "english"
                      ? englishInput
                      : historyInput
                  }
                  onChange={(e) => setMathInput(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={
                    selectedSubject === "math"
                      ? mathInput
                      : selectedSubject === "science"
                      ? scienceInput
                      : selectedSubject === "english"
                      ? englishInput
                      : historyInput
                  }
                  onChange={(e) => setMathInput(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={
                    selectedSubject === "math"
                      ? mathInput
                      : selectedSubject === "science"
                      ? scienceInput
                      : selectedSubject === "english"
                      ? englishInput
                      : historyInput
                  }
                  onChange={(e) => setMathInput(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={
                    selectedSubject === "math"
                      ? mathInput
                      : selectedSubject === "science"
                      ? scienceInput
                      : selectedSubject === "english"
                      ? englishInput
                      : historyInput
                  }
                  onChange={(e) => setMathInput(e.target.value)}
                />
              </td>
              <td>
                <button onClick={() => updateMarks(index)}>Save</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherMarksPage;
