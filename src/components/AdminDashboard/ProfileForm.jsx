import { useState, useEffect } from "react";
import { RiLockPasswordFill, RiPencilFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import styles from "../../styles/AdminDashboard/ProfileForm.module.css";
import Navbar from "./Navbar";
import axios from "axios";

const ProfileForm = () => {
 
  const [adminData, setAdminData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [image, setImage] = useState(null);


  useEffect(() => {
    handleGetData();
  }, []);

  const handleGetData = () => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(
          "https://university-project-paresh.onrender.com/University/Admin/AdminProfile",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        .then((response) => {
          // console.log("data", response.data.result.Name);
          localStorage.setItem("adminImage", response.data.result.image);
          localStorage.setItem("adminName", response.data.result.Name);
          setAdminData(response.data.result);
        })
        .catch((error) => {
          console.error("Error fetching teacher profile:", error);
        });
    }
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
    const token = localStorage.getItem("token");
    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    }
    formData.append("Name", editedData.Name || adminData.Name);
    formData.append("email", editedData.email || adminData.email);
    formData.append("userName", editedData.userName || adminData.userName);
    formData.append(
      "designation",
      editedData.designation || adminData.designation
    );
    formData.append(
      "collegeName",
      editedData.collegeName || adminData.collegeName
    );
    formData.append("mobileNo", editedData.mobileNo || adminData.mobileNo);
    console.log("Form", formData);
    axios
      .put(
        "https://university-project-paresh.onrender.com/University/Admin/UpdateAdminProfile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then((response) => {
        console.log("Profile updated successfully");
        setIsEditing(false);
        handleGetData();
      })
      .catch((error) => {
        console.error("Error updating teacher profile:", error);
      });
  };

  return (
    <>
      <Navbar />
      <div className={styles.adminProfileContainer}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div></div>
            <Link to={"/admin-dashboard/profile/changepassword"}>
              <div className={styles.changePasswordButton}>
                <RiLockPasswordFill />
                <span>Change Password</span>
              </div>
            </Link>
          </div>
          {adminData && (
            <div className={styles.profileUpdateForm}>
              <div className={styles.headingImage}>
                <div>
                  <h2>Admin Profile</h2>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "20px"
                  }}
                >
                  <img
                    src={adminData.image}
                    alt="Profile"
                    className={styles.profileImage}
                  />
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
                </div>
              </div>
              {isEditing && <input type="file" onChange={handleImageChange} />}
              <form className={styles.form}>
                <div className={styles.formRow}>
                  <div className={styles.formField}>
                    <label htmlFor="name" className={styles.label}>
                      Name:
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="Name"
                        value={editedData.Name || adminData.Name}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <div className={styles.input}>{adminData.Name}</div>
                    )}
                  </div>
                  <div className={styles.formField}>
                    <label htmlFor="email" className={styles.label}>
                      Email
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="email"
                        value={editedData.email || adminData.email}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <div className={styles.input}>{adminData.email}</div>
                    )}
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formField}>
                    <label htmlFor="userName" className={styles.label}>
                      Username
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="userName"
                        value={editedData.userName || adminData.userName}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <div className={styles.input}>{adminData.userName}</div>
                    )}
                  </div>
                  <div className={styles.formField}>
                    <label htmlFor="designation" className={styles.label}>
                      Designation
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="designation"
                        value={editedData.designation || adminData.designation}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <div className={styles.input}>
                        {adminData.designation}
                      </div>
                    )}
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formField}>
                    <label htmlFor="collegeName" className={styles.label}>
                      College Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="collegeName"
                        value={editedData.collegeName || adminData.collegeName}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <div className={styles.input}>
                        {adminData.collegeName}
                      </div>
                    )}
                  </div>
                  <div className={styles.formField}>
                    <label htmlFor="mobileNo" className={styles.label}>
                      Mobile Number
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="mobileNo"
                        value={editedData.mobileNo || adminData.mobileNo}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <div className={styles.input}>{adminData.mobileNo}</div>
                    )}
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileForm;
