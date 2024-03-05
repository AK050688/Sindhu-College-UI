// FeesEditModel.jsx
import { useState } from "react";
import { FiX } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FeesFormModel = ({ onAddFees, setShowForm }) => {
  const [formData, setFormData] = useState({
    studentName: "",
    rollNo: "",
    FeesType: "",
    paymentType: "",
    Date: "",
    Account: ""
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
      "https://university-project-paresh.onrender.com/University/FeesRoute/Feess",
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
        onAddFees(data);
        toast.success("Fees added successfully");
        setShowForm(false);
      })
      .catch((error) => {
        toast.error("Failed to add Fees. Please try again later.");
        console.error("Error adding Fees:", error);
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
            <h2 className="text-2xl font-bold mx-auto">Edit Fees</h2>
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
              htmlFor="Fees-branch"
              className="block text-white font-bold text-left"
            >
              Student Name:
            </label>
            <input
              type="text"
              id="studentName"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              className="border border-gray-400 rounded px-3 py-1 w-full text-black bg-white"
            />
          </div>
          <div className="">
            <label
              htmlFor="Fees-year"
              className="block text-white font-bold text-left"
            >
              Roll No:
            </label>
            <input
              type="text"
              id="rollNo"
              name="rollNo"
              value={formData.rollNo}
              onChange={handleChange}
              className="border border-gray-400 rounded px-3 py-1 w-full text-black bg-white"
            />
          </div>
          <div className="">
            <label
              htmlFor="Fees-type"
              className="block text-white font-bold text-left"
            >
              Fees Type:
            </label>
            <input
              type="text"
              id="Fees-type"
              name="FeesType"
              value={formData.FeesType}
              onChange={handleChange}
              className="border border-gray-400 rounded px-3 py-1 w-full text-black bg-white"
            />
          </div>
          <div className="">
            <label
              htmlFor="Fees-subject"
              className="block text-white font-bold text-left"
            >
              Payment Type:
            </label>
            <input
              type="text"
              id="paymentType"
              name="paymentType"
              value={formData.paymentType}
              onChange={handleChange}
              className="border border-gray-400 rounded px-3 py-1 w-full text-black bg-white"
            />
          </div>
          <div className="">
            <label
              htmlFor="Fees-date"
              className="block text-white font-bold text-left"
            >
              Date:
            </label>
            <input
              type="date"
              id="Fees-date"
              name="Date"
              value={formData.Date}
              onChange={handleChange}
              className="border border-gray-400 rounded px-3 py-1 w-full text-black bg-white"
            />
          </div>
          <div className="">
            <label
              htmlFor="Fees-marks"
              className="block text-white font-bold text-left"
            >
              Amount:
            </label>
            <input
              type="number"
              id="Amount"
              name="Amount"
              value={formData.Amount}
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

export default FeesFormModel;
