import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../../styles/StudentDashboard/StudentProfileForm.module.css";
import { RiLockPasswordFill, RiPencilFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const StudentProfileForm = () => {
  const [studentData, setStudentData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [image, setImage] = useState(null);

  useEffect(() => {
    handleGetData();
  }, []);

  const handleGetData = () => {
    const studentToken = localStorage.getItem("studentToken");
    axios
      .get(
        "https://university-project-paresh.onrender.com/University/Student/StudentProfile",
        {
          headers: {
            Authorization: `Bearer ${studentToken}`
          }
        }
      )
      .then((response) => {
        setStudentData(response.data.result);
        localStorage.setItem("studentImage", response.data.result.image);
      })
      .catch((error) => {
        console.error("Error fetching Student profile:", error);
      });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleSave = () => {
    const studentToken = localStorage.getItem("studentToken");
    const formData = new FormData();
    for (const key in editedData) {
      formData.append(key, editedData[key]);
    }
    if (image) {
      formData.append("image", image);
    }
    console.log("f", formData);
    axios
      .put(
        "https://university-project-paresh.onrender.com/University/Student/updateStudentProfile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${studentToken}`
          }
        }
      )
      .then((response) => {
        console.log("Profile updated successfully", response);
        setIsEditing(false);
        handleGetData();
      })
      .catch((error) => {
        console.error("Error updating Student profile:", error);
      });
  };

  return (
    <div className={styles.studentProfileContainer}>
      <div className={styles.header}>
        <div></div>
        <Link to={"/student-dashboard/profile/changepassword"}>
          <div className={styles.changePasswordButton}>
            <RiLockPasswordFill />
            <span>Change Password</span>
          </div>
        </Link>
      </div>
      {studentData && (
        <form className={styles.form}>
          <div className={styles.headingImage}>
            <h1>Student Profile</h1>
            <img
              src={studentData.image}
              alt="Profile"
              className={styles.profileImage}
            />
          </div>
          {isEditing && <input type="file" onChange={handleImageChange} />}
          <div className={styles.formRow}>
            <div className={styles.formItem}>
              <label>Name:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="Name"
                  value={editedData.Name || studentData.Name}
                  onChange={handleInputChange}
                />
              ) : (
                <div>{studentData.Name}</div>
              )}
            </div>
            <div className={styles.formItem}>
              <label>Father Name:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="fatherName"
                  value={editedData.fatherName || studentData.fatherName}
                  onChange={handleInputChange}
                />
              ) : (
                <div>{studentData.fatherName}</div>
              )}
            </div>
            <div className={styles.formItem}>
              <label>Mother Name:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="motherName"
                  value={editedData.motherName || studentData.motherName}
                  onChange={handleInputChange}
                />
              ) : (
                <div>{studentData.motherName}</div>
              )}
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formItem}>
              <label>UID:</label>
              <div>{studentData.UID}</div>
            </div>
            <div className={styles.formItem}>
              <label>Mobile No:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="mobileNo"
                  value={editedData.mobileNo || studentData.mobileNo}
                  onChange={handleInputChange}
                />
              ) : (
                <div>{studentData.mobileNo}</div>
              )}
            </div>
            <div className={styles.formItem}>
              <label>Email:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="email"
                  value={editedData.email || studentData.email}
                  onChange={handleInputChange}
                />
              ) : (
                <div>{studentData.email}</div>
              )}
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formItem}>
              <label>Address:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="address"
                  value={editedData.address || studentData.address}
                  onChange={handleInputChange}
                />
              ) : (
                <div>{studentData.address}</div>
              )}
            </div>
            <div className={styles.formItem}>
              <label>State:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="state"
                  value={editedData.state || studentData.state}
                  onChange={handleInputChange}
                />
              ) : (
                <div>{studentData.state}</div>
              )}
            </div>
            <div className={styles.formItem}>
              <label>City/Village:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="cityORVillage"
                  value={editedData.cityORVillage || studentData.cityORVillage}
                  onChange={handleInputChange}
                />
              ) : (
                <div>{studentData.cityORVillage}</div>
              )}
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formItem}>
              <label>Blood Group:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="bloodGroup"
                  value={editedData.bloodGroup || studentData.bloodGroup}
                  onChange={handleInputChange}
                />
              ) : (
                <div>{studentData.bloodGroup}</div>
              )}
            </div>
            <div className={styles.formItem}>
              <label>Pin:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="pin"
                  value={editedData.pin || studentData.pin}
                  onChange={handleInputChange}
                />
              ) : (
                <div>{studentData.pin}</div>
              )}
            </div>
            <div className={styles.formItem}>
              <label>Roll No:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="rollNo"
                  value={editedData.rollNo || studentData.rollNo}
                  onChange={handleInputChange}
                />
              ) : (
                <div>{studentData.rollNo}</div>
              )}
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formItem}>
              <label>Account Status:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="accountStatus"
                  value={editedData.accountStatus || studentData.accountStatus}
                  onChange={handleInputChange}
                />
              ) : (
                <div>{studentData.accountStatus}</div>
              )}
            </div>
            <div className={styles.formItem}>
              <label>Gender:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="gender"
                  value={editedData.gender || studentData.gender}
                  onChange={handleInputChange}
                />
              ) : (
                <div>{studentData.gender}</div>
              )}
            </div>
            <div className={styles.formItem}>
              <label>Admission Year:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="admissionYear"
                  value={editedData.admissionYear || studentData.admissionYear}
                  onChange={handleInputChange}
                />
              ) : (
                <div>{studentData.admissionYear}</div>
              )}
            </div>
          </div>
          {isEditing ? (
            <div className={styles.savebutton}>
              <button type="button" onClick={handleSave}>
                Save
              </button>
            </div>
          ) : (
            <div className={styles.pencils}>
              <RiPencilFill onClick={handleEdit} />
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default StudentProfileForm;
