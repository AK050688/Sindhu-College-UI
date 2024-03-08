import { useEffect, useState } from "react";
import Navbar from "../../components/AdminDashboard/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotificationFormModel from "../../components/AdminDashboard/NotificationFormModel";
import NotificationEditModel from "../../components/AdminDashboard/Notification/NotificationEditModel";

const Notification = () => {
  const [notification, setNotification] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isDelete, setIsDelete] = useState(false);
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
        // console.log("Deleted notification:", data);
        toast.success(data.message);
        setIsDelete(true);
        setTimeout(() => setIsDelete(false), 1000);
      })
      .catch((error) => {
        console.error("Error deleting notification:", error);
        toast.error("Failed to delete notification. Please try again later.");
        setIsDelete(false);
      })
      .finally(() => {
        setLoading(false);
        setIsDelete(false);
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
      <ToastContainer />
      <div className="mx-auto bg-cover bg-login h-[90.7vh]">
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
        {/* <div className="student-heading">
          <div className="min-h-[90px] rounded flex justify-center items-center">
            <h1 className="text-3xl font-semibold text-blue-600">
              All notification Lists
            </h1>
          </div>
        </div> */}

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
                      {!isDelete && (
                        <td>
                          <button
                            className="bg-red-500 text-white p-2 rounded-md cursor-pointer"
                            onClick={() => deleteRow(notification._id)}
                          >
                            Delete
                          </button>
                        </td>
                      )}
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

// const Notification = () => {
//   const [formData, setFormData] = useState({
//     Title: "",
//     Subject: "",
//     // Date: "",
//     Discription: ""
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setLoading(true);

//     fetch(
//       "https://university-project-paresh.onrender.com/University/Notification/notifications",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(formData)
//       }
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.message) {
//           // console.log(data);
//           alert(`${data.message}`);
//           setFormData({
//             Title: "",
//             Subject: "",
//             Discription: "",
//             // Date:""
//           });
//         }
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };
//   return (
//     <>
//       <div className=" h-[60px] bg-black">
//         <Navbar />
//       </div>
//       <div className="bg-cover h-[91vh] p-12 bg-login">
//         <div className="bg-slate-800 border border-slate-400 rounded-lg p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-10  w-[60%] mx-auto">
//           <h2 className="text-2xl font-bold mb-4 text-center text-blue-300">
//             Notification
//           </h2>
//           <form onSubmit={handleSubmit} className="flex flex-wrap">
//             <div className="flex flex-col w-1/2 pr-4 mb-4">
//               <label htmlFor="title" className="text-sm font-medium text-left">
//                 Title
//               </label>
//               <input
//                 type="text"
//                 id="title"
//                 name="Title"
//                 value={formData.Title}
//                 onChange={handleChange}
//                 className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full text-black bg-white"
//                 required
//               />
//             </div>
//             <div className="flex flex-col w-1/2 pl-4 mb-4">
//               <label
//                 htmlFor="subject"
//                 className="text-sm font-medium text-left"
//               >
//                 Subject
//               </label>
//               <input
//                 type="text"
//                 id="subject"
//                 name="Subject"
//                 value={formData.Subject}
//                 onChange={handleChange}
//                 className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full text-black bg-white"
//                 required
//               />
//             </div>
//             {/* <div className="flex flex-col w-full mb-4">
//               <label htmlFor="date" className="text-sm font-medium text-left">
//                 Date
//               </label>
//               <input
//                 type="date"
//                 id="date"
//                 name="Date"
//                 value={formData.Date}
//                 onChange={handleChange}
//                 className="p-2 border border-gray-300 rounded-md  text-black"
//               />
//             </div> */}
//             <div className="flex flex-col w-full mb-4">
//               <label
//                 htmlFor="discription"
//                 className="text-sm font-medium text-left"
//               >
//                 Discription
//               </label>
//               <textarea
//                 type="text"
//                 id="discription"
//                 name="Discription"
//                 value={formData.Discription}
//                 onChange={handleChange}
//                 className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full text-black bg-white"
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               className="text-black py-2 px-4 rounded-md  ml-auto w-full bg-blue-600 hover:bg-blue-300"
//             >
//               {loading ? (
//                 <div className="spinner-border spinner-border-sm" role="status">
//                   <span className="visually-hidden">Loading...</span>
//                 </div>
//               ) : (
//                 "Save"
//               )}
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

export default Notification;
