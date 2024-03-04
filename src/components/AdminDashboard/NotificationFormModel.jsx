import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiX } from "react-icons/fi";

const NotificationFormModel = ({ onAddNotification, setShowForm }) => {
  const [formData, setFormData] = useState({
    Title: "",
    Subject: "",
    Description: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    console.log("f".formData);

    e.preventDefault();
    setLoading(true);
    fetch(
      "https://university-project-paresh.onrender.com/University/Notification/notifications",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        onAddNotification(data);
        toast.success("Notification added successfully");
        setShowForm(false);
      })
      .catch((error) => {
        toast.error("Failed to add Notification. Please try again later.");
        console.error("Error adding Notification:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-400 border border-slate-400 rounded-md p-10 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 text-white">
        <ToastContainer />
        <div className="p-6 rounded shadow-lg w-[600px] bg-black">
          <div className="flex justify-between">
            <div className="flex items-center ml-52">
              <h2 className="text-2xl font-bold mx-auto">Add Notification</h2>
            </div>
            <div className="flex items-center">
              <button
                className="hover:text-gray-800 text-2xl text-white mt-0 bg-black border-0"
                onClick={handleCloseForm}
              >
                <FiX />
              </button>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-wrap">
            <div className="flex flex-col w-1/2 pr-4 mb-4">
              <label htmlFor="title" className="text-sm font-medium text-left">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="Title"
                value={formData.Title}
                onChange={handleChange}
                className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full text-black bg-white"
                required
              />
            </div>
            <div className="flex flex-col w-1/2 pl-4 mb-4">
              <label
                htmlFor="subject"
                className="text-sm font-medium text-left"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="Subject"
                value={formData.Subject}
                onChange={handleChange}
                className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full text-black bg-white"
                required
              />
            </div>
            <div className="flex flex-col w-full mb-4">
              <label
                htmlFor="discription"
                className="text-sm font-medium text-left"
              >
                Discription
              </label>
              <textarea
                type="text"
                id="discription"
                name="Description"
                value={formData.Description}
                onChange={handleChange}
                className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full text-black bg-white"
                required
              />
            </div>
            <button
              type="submit"
              className="text-black py-2 px-4 rounded-md  ml-auto w-full bg-blue-600 hover:bg-blue-300"
            >
              {loading ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
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

export default NotificationFormModel;
