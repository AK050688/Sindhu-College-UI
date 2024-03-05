import { useState } from "react";
import { FiX } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ExamFormModel = ({ onAddExam, setShowForm }) => {
  const [formData, setFormData] = useState({
    examBranch: "",
    examYear: "",
    examType: "",
    examSubject: "",
    examTiming: "",
    examMarks: "",
    examDate: "",
    examQuestion: ""
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
      "https://university-project-paresh.onrender.com/University/ExamRoute/exams",
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
        // console.log("data", data);
        onAddExam(data);
        toast.success("Exam added successfully");
        setShowForm(false);
      })
      .catch((error) => {
        toast.error("Failed to add exam. Please try again later.");
        console.error("Error adding exam:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-500 border border-slate-300 rounded-md p-10 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-10 text-white">
      <ToastContainer />
      <div className="p-4 rounded shadow-lg w-[490px] bg-black">
        <div className="flex justify-between">
          <div className="flex items-center ml-36">
            <h2 className="text-2xl font-bold mx-auto">Add Exam</h2>
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

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 ">
          <div className="">
            <label
              htmlFor="exam-branch"
              className="block text-white font-bold text-left"
            >
              Exam Branch:
            </label>
            <input
              type="text"
              id="exam-branch"
              name="examBranch"
              value={formData.examBranch}
              onChange={handleChange}
              className="border border-gray-400 rounded px-3 py-1 w-full text-black bg-white"
            />
          </div>
          <div className="">
            <label
              htmlFor="exam-year"
              className="block text-white font-bold text-left"
            >
              Exam Year:
            </label>
            <input
              type="text"
              id="exam-year"
              name="examYear"
              value={formData.examYear}
              onChange={handleChange}
              className="border border-gray-400 rounded px-3 py-1 w-full text-black bg-white"
            />
          </div>
          <div className="">
            <label
              htmlFor="exam-type"
              className="block text-white font-bold text-left"
            >
              Exam Type:
            </label>
            <input
              type="text"
              id="exam-type"
              name="examType"
              value={formData.examType}
              onChange={handleChange}
              className="border border-gray-400 rounded px-3 py-1 w-full text-black bg-white"
            />
          </div>
          <div className="">
            <label
              htmlFor="exam-subject"
              className="block text-white font-bold text-left"
            >
              Exam Subject:
            </label>
            <input
              type="text"
              id="exam-subject"
              name="examSubject"
              value={formData.examSubject}
              onChange={handleChange}
              className="border border-gray-400 rounded px-3 py-1 w-full text-black bg-white"
            />
          </div>
          <div className="">
            <label
              htmlFor="exam-marks"
              className="block text-white font-bold text-left"
            >
              Exam Timming:
            </label>
            <input
              type="time"
              id="exam-times"
              name="examTiming"
              value={formData.examTiming}
              onChange={handleChange}
              className="border border-gray-400 rounded px-3 py-1 w-full text-black bg-white"
            />
          </div>
          <div className="">
            <label
              htmlFor="exam-marks"
              className="block text-white font-bold text-left"
            >
              Exam Marks:
            </label>
            <input
              type="text"
              id="exam-marks"
              name="examMarks"
              value={formData.examMarks}
              onChange={handleChange}
              className="border border-gray-400 rounded px-3 py-1 w-full text-black bg-white"
            />
          </div>
          <div className="">
            <label
              htmlFor="exam-date"
              className="block text-white font-bold text-left"
            >
              Exam Date:
            </label>
            <input
              type="date"
              id="exam-date"
              name="examDate"
              value={formData.examDate}
              onChange={handleChange}
              className="border-2 border-gray-400 rounded px-3 py-1 w-[440px] text-black bg-white"
            />
          </div>
          <div className="col-span-2">
            <label
              htmlFor="exam-question-paper"
              className="block text-white font-bold mb-2 text-left"
            >
              Exam Question Paper (PDF):
            </label>
            <input
              type="file"
              id="exam-question-paper"
              accept=".pdf"
              onChange={handleChange}
              className="border border-gray-400 rounded px-3 py-1 w-full text-black bg-white"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded col-span-2"
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
  );
};

export default ExamFormModel;
