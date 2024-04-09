import React, { useEffect, useState } from "react";
import styles from "../../styles/AdminDashboard/Attendance.module.css";
import Navbar from "../../components/AdminDashboard/Navbar";

function Attendance() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [date, setDate] = useState("");
  const [searchName, setSearchName] = useState("Paresh");
  const [searchRollNo, setSearchRollNo] = useState("");
  const [loading, setLoading] = useState(true);
  console.log("f", filteredStudents);

  useEffect(() => {
    handleGetData();
  }, []);

  const handleGetData = () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    fetch(
      "https://university-project-paresh.onrender.com/University/Admin/allStudents",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setStudents(data.Students);
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleFilter = () => {
    let filteredData = students;

    if (date) {
      filteredData = filteredData.filter((student) =>
        student.attendance.some(
          (attendance) => attendance.date.split("T")[0] === date
        )
      );
    }

    if (searchName) {
      filteredData = filteredData.filter((student) =>
        student.Name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    if (searchRollNo) {
      filteredData = filteredData.filter((student) =>
        student.rollNo.toLowerCase().includes(searchRollNo.toLowerCase())
      );
    }

    setFilteredStudents(filteredData);
  };

  useEffect(() => {
    handleFilter();
    // eslint-disable-next-line
  }, [date, searchName, searchRollNo, filteredStudents]);

  return (
    <>
      <Navbar />
      <div className={styles.adminAttendanceContainer}>
        <div className={styles.container}>
          <h1 className={styles.title}> Student Attendance</h1>
        </div>
        <section className={styles.section}>
          <div className={styles.dateInput}>
            <label className={styles.label}>Date:</label>
            <input
              type="date"
              name="date"
              className={styles.input}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className={styles.searchInput}>
            <label className={styles.label}>Search by Name:</label>
            <input
              type="text"
              name="searchName"
              className={styles.input}
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="Enter Name"
            />
          </div>
          <div className={styles.searchInput}>
            <label className={styles.label}>Search by Roll No:</label>
            <input
              type="text"
              name="searchRollNo"
              className={styles.input}
              value={searchRollNo}
              onChange={(e) => setSearchRollNo(e.target.value)}
              placeholder="Enter Roll No"
            />
          </div>
        </section>

        {loading ? (
          <div className="spinner" role="status">
            <span className="loader"></span>
          </div>
        ) : (
          <div className={styles.tableContainer}>
            <div className={styles.tableSection}>
              <table>
                <thead>
                  <tr>
                    <th>SNo.</th>
                    <th>Name</th>
                    <th>Roll No.</th>
                    <th>Date</th>
                    <th className={styles.attendance}>Attendance</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student, index) => (
                    <React.Fragment key={index}>
                      {student.attendance.length === 0 && (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{student.Name}</td>
                          <td>{student.rollNo}</td>
                          <td colSpan="2">No attendance recorded</td>
                        </tr>
                      )}
                      {student.attendance.map((attendance, idx) => (
                        <tr key={idx}>
                          {idx === 0 && (
                            <>
                              <td rowSpan={student.attendance.length}>
                                {index + 1}
                              </td>
                              <td rowSpan={student.attendance.length}>
                                {student.Name}
                              </td>
                              <td rowSpan={student.attendance.length}>
                                {student.rollNo}
                              </td>
                            </>
                          )}
                          <td>
                            {new Date(attendance.date).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric"
                              }
                            )}
                          </td>
                          <td>{attendance.present ? "Present" : "Absent"}</td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Attendance;
