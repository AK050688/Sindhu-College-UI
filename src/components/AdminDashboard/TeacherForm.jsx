import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const TeacherForm = () => {
  const [formData, setFormData] = useState({
    Name: "",
    guardian_Name: "",
    email: "",
    mobileNo: "",
    address: "",
    state: "",
    cityORVillage: "",
    pin: "",
    gender: "",
    bloodGroup: "",
    Department: "",
    joiningDate: ""
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSelectChange = (selectedOption) => {
    handleChange("gender", selectedOption.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");

    fetch(
      "https://university-project-paresh.onrender.com/University/Teacher/signUp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("TeacherRegistration", data.TeacherDetails);
        if (data.message) {
          localStorage.setItem("TeacherToken", data.accessToken);
          alert(`${data.message}`);
          navigate("/teacher");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const options = [
    { value: "female", label: "Female" },
    { value: "male", label: "Male" },
    { value: "other", label: "Others" }
  ];

  return (
    <div className="max-w-2xl mx-auto mt-6 rounded-3xl text-white border border-slate-400 p-[1.6%] shadow-lg backdrop-filter backdrop-blur-xs bg-opacity-30 relative">
      <form onSubmit={handleSubmit} className="space-y-1">
        <h1 className="text-center text-blue-500 text-3xl">
          Student Registration Form
        </h1>
        <div className="flex w-full gap-3">
          <div className="w-1/3">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-left"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="Name"
              value={formData.Name}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300  text-black rounded-md bg-white"
            />
          </div>
          <div className="w-1/3">
            <label
              htmlFor="guardianName"
              className="block text-sm font-medium text-left"
            >
              Guardian Name
            </label>
            <input
              type="text"
              id="guardianName"
              name="guardian_Name"
              value={formData.guardian_Name}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300  text-black rounded-md bg-white"
            />
          </div>
          <div className="w-1/3">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-left"
            >
              Email
            </label>
            <input
              type="mail"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300  text-black rounded-md bg-white"
            />
          </div>
        </div>
        <div className="flex w-full gap-3">
          <div className="w-1/3">
            <label
              htmlFor="mobileNo"
              className="block text-sm font-medium text-left"
            >
              Mobile No
            </label>
            <input
              type="text"
              id="mobileNo"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300  text-black rounded-md bg-white"
            />
          </div>
          <div className="w-1/3">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-left"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300  text-black rounded-md bg-white"
            />
          </div>
          <div className="w-1/3">
            <label
              htmlFor="pin"
              className="block text-sm font-medium text-left"
            >
              Pin
            </label>
            <input
              type="text"
              id="pin"
              name="pin"
              value={formData.pin}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300  text-black rounded-md bg-white"
            />
          </div>
        </div>
        <div className="flex w-full gap-3">
          <div className="w-1/3">
            <label
              htmlFor="cityORVillage"
              className="block text-sm font-medium text-left"
            >
              City OR Village
            </label>
            <input
              type="text"
              id="cityORVillage"
              name="cityORVillage"
              value={formData.cityORVillage}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300  text-black rounded-md bg-white"
            />
          </div>
          <div className="w-1/3">
            <label
              htmlFor="state"
              className="block text-sm font-medium text-left"
            >
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300  text-black rounded-md bg-white"
            />
          </div>
          <div className="w-1/3">
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-left"
            >
              Gender
            </label>
            <Select
              value={options.find((option) => option.value === formData.gender)}
              onChange={handleSelectChange}
              options={options}
              className="mt-1 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 w-full rounded-md text-black bg-gray-700"
              required
            />
          </div>
        </div>
        <div className="flex w-full gap-3">
          <div className="w-1/3">
            <label
              htmlFor="bloodGroup"
              className="block text-sm font-medium text-left"
            >
              Blood Group
            </label>
            <input
              type="text"
              id="bloodGroup"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300  text-black rounded-md bg-white"
            />
          </div>
          <div className="w-1/3">
            <label
              htmlFor="department"
              className="block text-sm font-medium text-left"
            >
              Department
            </label>
            <input
              type="text"
              id="department"
              name="Department"
              value={formData.Department}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300  text-black rounded-md bg-white"
            />
          </div>
          <div className="w-1/3">
            <label
              htmlFor="joiningDate"
              className="block text-sm font-medium text-left"
            >
              Joining Date
            </label>
            <input
              type="date"
              id="joiningDate"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300  text-black rounded-md bg-white"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="w-[50%] mx-auto ml-40 bg-blue-300 text-black p-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            {loading ? (
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeacherForm;
