import { useState } from "react";
import { FiX } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CourseFormModel = ({ onAddCourse, setShowForm }) => {
  const [formData, setFormData] = useState({
    courseName: "",
    courseFees: "",
    year: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(
      "https://university-project-paresh.onrender.com/University/Course/addCourse",
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
        onAddCourse(data);
        toast.success("Course added successfully");
        setShowForm(false);
      })
      .catch((error) => {
        toast.error("Failed to add course. Please try again later.");
        console.error("Error adding course:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-400 border border-slate-400 rounded-md p-10 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 text-white">
      <ToastContainer />
      <div className="p-6 rounded shadow-lg w-[600px] bg-black">
        <div className="flex justify-between">
          <div className="flex items-center ml-52">
            <h2 className="text-2xl font-bold mx-auto">Add Course</h2>
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

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="course-name"
              className="block font-bold mb-2 text-left"
            >
              Course Name:
            </label>
            <input
              type="text"
              id="course-name"
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              className="border border-gray-400 rounded px-3 py-2 w-full bg-white text-black"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="courseFee"
              className="block font-bold mb-2 text-left"
            >
              Course Fee:
            </label>
            <input
              type="number"
              id="course-fee"
              name="courseFees"
              value={formData.courseFees}
              onChange={handleChange}
              className="border border-gray-400 rounded px-3 py-2 w-full text-black"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="course-date"
              className="block font-bold mb-2 text-left"
            >
              Course Year:
            </label>
            <input
              type="date"
              id="course-date"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="border border-gray-400 rounded px-3 py-2 w-full text-black"
            />
          </div>
          <button
            type="submit"
            className="w-[50%] mx-auto bg-yellow-300 text-black p-3 rounded-md hover:bg-yellow-700 transition duration-300 ml-40"
          >
            {loading ? (
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CourseFormModel;
