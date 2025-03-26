import { useEffect, useState } from "react";
import Navbar from "../../Components/AdminDashboard/Navbar";
import NotificationFormModel from "../../Components/AdminDashboard/Notification/NotificationFormModel";
import NotificationEditModel from "../../Components/AdminDashboard/Notification/NotificationEditModel";
import "../../styles/AdminDashboard/Notification.css";
import axios from "axios";

const Notification = () => {
  const [notification, setNotification] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editNotificationData, setEditData] = useState(null);

  useEffect(() => {
    handleGetData();
  }, []);

  const handleGetData = () => {
    const token = localStorage.getItem("token");
    fetch(
      "https://university-project-paresh.onrender.com/University/Notification/notifications",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("notificationData", data);
        setNotification(data);
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleEditNotification = (notificationId, updatedNotificationData) => {
    setNotification(
      notification.map((notification) => {
        if (notification._id === notificationId) {
          return { ...notification, ...updatedNotificationData };
        }
        return notification;
      })
    );
  };

  const deleteRow = async (notificationId) => {
    try {
      await axios.delete(
        `https://university-project-paresh.onrender.com/University/Notification/notifications/${notificationId}`
      );
      const response = await axios.get(
        "https://university-project-paresh.onrender.com/University/Notification/notifications"
      );
      setNotification(response.data);
      console.log("Notification deleted successfully", response.data);
    } catch (error) {
      console.error("Error deleting schedule:", error);
    }
  };

  const addNotification = (newnotification) => {
    console.log("new", newnotification);
    setNotification([...notification, newnotification.Notification]);
  };

  return (
    <>
      <Navbar />
      <div className="adminNotificationContainer">
        <div className="notification-container">
          <h1>All Notifications Lists</h1>
          <button
            className="add-notification-btn"
            onClick={() => setShowForm(true)}
          >
            Add Notification
          </button>
        </div>

        {showForm && (
          <NotificationFormModel
            onAddNotification={addNotification}
            setShowForm={setShowForm}
          />
        )}

        {showEditForm && (
          <NotificationEditModel
            notificationId={editNotificationData._id}
            initialNotificationData={editNotificationData}
            onEditNotification={(notificationId, updatedNotificationData) =>
              handleEditNotification(notificationId, updatedNotificationData)
            }
            setShowEditForm={setShowEditForm}
          />
        )}

        {loading ? (
          <div className="spinner" role="status">
            <span className="loader"></span>
          </div>
        ) : (
          <div className="table-container">
            <div className="table-section">
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Subject</th>
                    <th>Date</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {notification?.map((notification, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{notification.Title}</td>
                      <td>{notification.Description}</td>
                      <td>{notification.Subject}</td>
                      <td>
                        {new Date(notification.Date).toLocaleDateString(
                          "en-GB"
                        )}
                      </td>
                      <td>
                        <button
                          className="editButton"
                          onClick={() => {
                            setEditData(notification);
                            setShowEditForm(true);
                          }}
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          className="deleteButton"
                          onClick={() => deleteRow(notification._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Notification;
