import { useEffect, useState } from "react";
import Navbar from "../../components/AdminDashboard/Navbar";
import NotificationFormModel from "../../components/AdminDashboard/Notification/NotificationFormModel";
import NotificationEditModel from "../../components/AdminDashboard/Notification/NotificationEditModel";

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

  const deleteRow = (notificationId) => {
    fetch(
      `https://university-project-paresh.onrender.com/University/Notification/notifications/${notificationId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Deleted notification:", data);
      })
      .catch((error) => {
        console.error("Error deleting notification:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const addNotification = (newnotification) => {
    console.log("new", newnotification);
    setNotification([...notification, newnotification.Notification]);
  };

  return (
    <div>
      <div className="h-[60px] bg-black">
        <Navbar />
      </div>
      <div className="mx-auto bg-cover bg-login h-[91.4vh]">
        <div className="flex flex-col md:flex-row justify-between items-center p-2 rounded-lg shadow-md border-0 border-black">
          <h1 className="text-xl font-bold text-white text-left">
            All Notifications Lists
          </h1>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-sm p-3 rounded w-[13%] mt-0"
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
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="visually-hidden">Loading...</span>
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
                          className="bg-green-500 text-white p-1 rounded-md"
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
                          className="bg-red-500 text-white p-2 rounded-md cursor-pointer"
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
    </div>
  );
};

export default Notification;
