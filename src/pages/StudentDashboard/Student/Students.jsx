import React, { useState } from "react";
import "./Students.css";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const Students = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    studentName: "",
    fatherName: "",
    motherName: "",
    email: "",
    mobileNo: "",
    address: "",
    pin: "",
    state: "",
    cityORVillage: "",
    gender: "",
    bloodGroup: "",
    rollNo: "",
    courseTaken: "",
    branchName: "",
    admissionYear: ""
  });

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Do something with the form data, like submit it to a server
  //   console.log(formData);
  //   // Reset form data after submission
  //   setFormData({
  //     studentName: "",
  //     fatherName: "",
  //     motherName: "",
  //     email: "",
  //     mobileNo: "",
  //     address: "",
  //     pin: "",
  //     state: "",
  //     cityORVillage: "",
  //     gender: "",
  //     bloodGroup: "",
  //     rollNo: "",
  //     courseTaken: "",
  //     branchName: "",
  //     admissionYear: ""
  //   });
  //   // Close the popup
  //   togglePopup();
  // };

  return (
    <div className="student-conatiner">
      <div className="student-add-btn" onClick={togglePopup}>
        <div></div>
        <div>Add New Student</div>
      </div>
      <div className="student-class-group">
        <div className="student-class-card">
          <div className="student-class-title">
            <span>Class VII</span>
            <Link>View All</Link>
          </div>
          <div className="student-count">
            <span>{100}</span>
            <span>Students</span>
          </div>
        </div>
        <div className="student-class-card">
          <div className="student-class-title">
            <span>Class VIII</span>
            <Link>View All</Link>
          </div>
          <div className="student-count">
            <span>{111}</span>
            <span>Students</span>
          </div>
        </div>
        <div className="student-class-card">
          <div className="student-class-title">
            <span>Class IX</span>
            <Link>View All</Link>
          </div>
          <div className="student-count">
            <span>{132}</span>
            <span>Students</span>
          </div>
        </div>
        <div className="student-class-card">
          <div className="student-class-title">
            <span>Class X</span>
            <Link>View All</Link>
          </div>
          <div className="student-count">
            <span>{56}</span>
            <span>Students</span>
          </div>
        </div>
      </div>
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <div className="close" onClick={togglePopup}>
              <FaTimes /> {/* Close icon */}
            </div>
            <h2>Add New Student</h2>
            <form>
              <div className="flex">
                <div>
                  <label htmlFor="name">Student Name:</label>
                  <br />
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="name">Father Name:</label>
                  <br />
                  <input
                    type="text"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="name">Mother Name:</label>
                  <br />
                  <input
                    type="text"
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="flex">
                <div>
                  <label htmlFor="name">Email:</label>
                  <br />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="name">Mobile No:</label>
                  <br />
                  <input
                    type="number"
                    name="mobileNo"
                    value={formData.mobileNo}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="name">Address:</label>
                  <br />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="flex">
                <div>
                  <label htmlFor="name">City or Village:</label>
                  <br />
                  <input
                    type="text"
                    name="cityORVillage"
                    value={formData.cityORVillage}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="name">Pin:</label>
                  <br />
                  <input
                    type="number"
                    name="pin"
                    value={formData.pin}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="name">State:</label>
                  <br />
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="flex">
                <div>
                  <label htmlFor="name">Gender:</label>
                  <br />
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="name">Blood Group:</label>
                  <br />
                  <input
                    type="text"
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="name">Roll No:</label>
                  <br />
                  <input
                    type="text"
                    name="rollNo"
                    value={formData.rollNo}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="flex">
                <div>
                  <label htmlFor="name">Course Taken:</label>
                  <br />
                  <input
                    type="text"
                    name="courseTaken"
                    value={formData.courseTaken}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="name">Branch Name:</label>
                  <br />
                  <input
                    type="text"
                    name="branchName"
                    value={formData.branchName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="name">Admission Year:</label>
                  <br />
                  <input
                    type="number"
                    name="admissionYear"
                    value={formData.admissionYear}
                    onChange={handleChange}
                    required
                    min="2000"
                    max="2100"
                  />
                </div>
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;
