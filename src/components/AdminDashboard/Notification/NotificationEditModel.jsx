import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiX } from "react-icons/fi";

const NotificationEditModel = ({
  notificationId,
  initialNotificationData,
  onEditNotification,
  setShowEditForm
}) => {
  const [formData, setFormData] = useState(initialNotificationData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData(initialNotificationData);
  }, [initialNotificationData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(
      `https://university-project-paresh.onrender.com/University/Notification/notifications/${notificationId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Updated notification:", data);
        onEditNotification(notificationId, formData);
        toast.success("Notification updated successfully");
        setShowEditForm(false);
      })
      .catch((error) => {
        toast.error("Failed to update Notification. Please try again later.");
        console.error("Error updating Notification:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCloseForm = () => {
    setShowEditForm(false);
  };
  return (
    <>
      <div className="notificationForm">
        <ToastContainer />
        <div className="notificationContent">
          <div className="notificationHeader">
            <div className="headerLeft">
              <h2 className="notificationTitle">Update Notification</h2>
            </div>
            <div className="headerRight">
              <button className="closeButton" onClick={handleCloseForm}>
                <FiX />
              </button>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="formContainer">
            <div className="inputGroup">
              <div className="inputWrapper">
                <label htmlFor="title" className="inputLabel">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="Title"
                  value={formData.Title}
                  onChange={handleChange}
                  className="inputField"
                  required
                />
              </div>
              <div className="inputWrapper">
                <label htmlFor="subject" className="inputLabel">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="Subject"
                  value={formData.Subject}
                  onChange={handleChange}
                  className="inputField"
                  required
                />
              </div>
            </div>
            <div className="inputWrapper">
              <label htmlFor="description" className="inputLabel">
                Description
              </label>
              <textarea
                id="description"
                name="Description"
                value={formData.Description}
                onChange={handleChange}
                className="inputField"
                required
              />
            </div>
            <button type="submit" className="submitButton">
              {loading ? (
                <div className="spinnerBorder spinner-border-sm" role="status">
                  <span className="visuallyHidden">Loading...</span>
                </div>
              ) : (
                "Save"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NotificationEditModel;
