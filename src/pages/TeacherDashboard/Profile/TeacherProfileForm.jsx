import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../../styles/TeacherDashboard//TeacherProfileForm.module.css";
import { RiLockPasswordFill, RiPencilFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const TeacherProfileForm = () => {
  const [teacherData, setTeacherData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [image, setImage] = useState(null);

  useEffect(() => {
    handleGetData();
  }, []);

  const handleGetData = () => {
    const teacherToken = localStorage.getItem("teacherToken");
    axios
      .get(
        "https://university-project-paresh.onrender.com/University/Teacher/TeacherProfile",
        {
          headers: {
            Authorization: `Bearer ${teacherToken}`
          }
        }
      )
      .then((response) => {
        setTeacherData(response.data.result);
        localStorage.setItem("teacherImage", response.data.result.image);
      })
      .catch((error) => {
        console.error("Error fetching teacher profile:", error);
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
    const teacherToken = localStorage.getItem("teacherToken");
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
        "https://university-project-paresh.onrender.com/University/Teacher/updateTeacherProfile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${teacherToken}`
          }
        }
      )
      .then((response) => {
        console.log("Profile updated successfully", response);

        setIsEditing(false);
        handleGetData();
      })
      .catch((error) => {
        console.error("Error updating teacher profile:", error);
      });
  };

  return (
    <div className={styles.teacherProfileContainer}>
      <div className={styles.header}>
        <div></div>
        <Link to={"/teacher-dashboard/profile/changepassword"}>
          <div className={styles.changePasswordButton}>
            <RiLockPasswordFill />
            <span>Change Password</span>
          </div>
        </Link>
      </div>
      {teacherData && (
        <form className={styles.form}>
          <div className={styles.headingImage}>
            <h1>Teacher Profile</h1>
            <img
              src={teacherData.image}
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
                  value={editedData.Name || teacherData.Name}
                  onChange={handleInputChange}
                />
              ) : (
                <div>{teacherData.Name}</div>
              )}
            </div>
            <div className={styles.formItem}>
              <label>Guardian Name:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="guardianName"
                  value={editedData.guardianName || teacherData.guardian_Name}
                  onChange={handleInputChange}
                />
              ) : (
                <div>{teacherData.guardian_Name}</div>
              )}
            </div>
            <div className={styles.formItem}>
              <label>UID:</label>
              <div>{teacherData.UID}</div>
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formItem}>
              <label>Mobile No:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="mobileNo"
                  value={editedData.mobileNo || teacherData.mobileNo}
                  onChange={handleInputChange}
                />
              ) : (
                <div>{teacherData.mobileNo}</div>
              )}
            </div>
            <div className={styles.formItem}>
              <label>Email:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="email"
                  value={editedData.email || teacherData.email}
                  onChange={handleInputChange}
                />
              ) : (
                <div>{teacherData.email}</div>
              )}
            </div>
            <div className={styles.formItem}>
              <label>Department:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="Department"
                  value={editedData.Department || teacherData.Department}
                  onChange={handleInputChange}
                />
              ) : (
                <div>{teacherData.Department}</div>
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
                  value={editedData.address || teacherData.address}
                  onChange={handleInputChange}
                />
              ) : (
                <div>{teacherData.address}</div>
              )}
            </div>
            <div className={styles.formItem}>
              <label>State:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="state"
                  value={editedData.state || teacherData.state}
                  onChange={handleInputChange}
                />
              ) : (
                <div>{teacherData.state}</div>
              )}
            </div>
            <div className={styles.formItem}>
              <label>City/Village:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="cityORVillage"
                  value={editedData.cityORVillage || teacherData.cityORVillage}
                  onChange={handleInputChange}
                />
              ) : (
                <div>{teacherData.cityORVillage}</div>
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
                  value={editedData.bloodGroup || teacherData.bloodGroup}
                  onChange={handleInputChange}
                />
              ) : (
                <div>{teacherData.bloodGroup}</div>
              )}
            </div>
            <div className={styles.formItem}>
              <label>Pin:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="pin"
                  value={editedData.pin || teacherData.pin}
                  onChange={handleInputChange}
                />
              ) : (
                <div>{teacherData.pin}</div>
              )}
            </div>
            <div className={styles.formItem}>
              <label>Account Status:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="accountStatus"
                  value={editedData.accountStatus || teacherData.accountStatus}
                  onChange={handleInputChange}
                />
              ) : (
                <div>{teacherData.accountStatus}</div>
              )}
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formItem}>
              <label>Gender:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="gender"
                  value={editedData.gender || teacherData.gender}
                  onChange={handleInputChange}
                />
              ) : (
                <div>{teacherData.gender}</div>
              )}
            </div>
            <div className={styles.formItem}>
              <label>Joining Date:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="joiningDate"
                  value={editedData.joiningDate || teacherData.joiningDate}
                  onChange={handleInputChange}
                />
              ) : (
                <div>{teacherData.joiningDate}</div>
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

export default TeacherProfileForm;
