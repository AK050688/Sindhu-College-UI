import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const StudentForm = () => {
  const [formData, setFormData] = useState({
    Name: "",
    fatherName: "",
    motherName: "",
    email: "",
    mobileNo: "",
    address: "",
    state: "",
    country: "",
    cityORVillage: "",
    pin: "",
    gender: "",
    bloodGroup: "",
    rollNo: "",
    courseTaken: "",
    branchName: "",
    admissionYear: ""
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
      "https://university-project-paresh.onrender.com/University/Student/signUp",
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
        if (data.message) {
          localStorage.setItem("StudentToken", data.accessToken);
          alert(`${data.message}`);
          navigate("/student");
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
    <div className="max-w-2xl mx-auto rounded-3xl text-white border border-slate-400 p-3 shadow-lg backdrop-filter backdrop-blur-xs bg-opacity-30 relative">
      <form onSubmit={handleSubmit} className="space-y-1">
        {/* <h1 className="text-center text-blue-500 text-lg">
          Student Registration Form
        </h1> */}
        <div className="flex w-full gap-3">
          <div className="w-1/3">
            <label htmlFor="name" className="block text-sm font-medium text-left">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="Name"
              value={formData.Name}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black bg-white"
              required
            />
          </div>
          <div className="w-1/3">
            <label htmlFor="fatherName" className="block text-sm font-medium text-left">
              Father&apos;s Name
            </label>
            <input
              type="text"
              id="fatherName"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black bg-white"
              required
            />
          </div>
          <div className="w-1/3">
            <label htmlFor="motherName" className="block text-sm font-medium text-left">
              Mother&apos;s Name
            </label>
            <input
              type="text"
              id="motherName"
              name="motherName"
              value={formData.motherName}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black bg-white"
              required
            />
          </div>
        </div>
        <div className="flex w-full gap-3">
          <div className="w-1/3">
            <label htmlFor="email" className="block text-sm font-medium text-left">
              Email
            </label>
            <input
              type="mail"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black bg-white"
              required
            />
          </div>
          <div className="w-1/3">
            <label htmlFor="mobileNo" className="block text-sm font-medium text-left">
              Mobile No
            </label>
            <input
              type="text"
              id="mobileNo"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black bg-white"
              required
            />
          </div>
          <div className="w-1/3">
            <label htmlFor="address" className="block text-sm font-medium text-left">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black bg-white"
              required
            />
          </div>
        </div>
        <div className="flex w-full gap-3">
          <div className="w-1/3">
            <label
              htmlFor="cityORVillage"
              className="block text-sm font-medium text-left"
            >
              City/Village
            </label>
            <input
              type="text"
              id="cityORVillage"
              name="cityORVillage"
              value={formData.cityORVillage}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black bg-white"
              required
            />
          </div>
          <div className="w-1/3">
            <label htmlFor="state" className="block text-sm font-medium text-left">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black bg-white"
              required
            />
          </div>
          <div className="w-1/3">
            <label htmlFor="country" className="block text-sm font-medium text-left">
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black bg-white"
              required
            />
          </div>
        </div>
        <div className="flex w-full gap-3">
          <div className="w-1/3">
            <label htmlFor="gender" className="block text-sm font-medium text-left">
              Gender
            </label>
            <Select
              value={options.find((option) => option.value === formData.gender)}
              onChange={handleSelectChange}
              options={options}
              className="hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 w-full rounded-md text-black bg-white mt-3"
              required
            />
          </div>
          <div className="w-1/3">
            <label htmlFor="bloodGroup" className="block text-sm font-medium text-left">
              Blood Group
            </label>
            <input
              type="text"
              id="bloodGroup"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black bg-white"
              required
            />
          </div>
          <div className="w-1/3">
            <label htmlFor="rollNo" className="block text-sm font-medium text-left">
              Roll No
            </label>
            <input
              type="text"
              id="rollNo"
              name="rollNo"
              value={formData.rollNo}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black bg-white"
              required
            />
          </div>
        </div>
        <div className="flex w-full gap-3">
          <div className="w-1/3">
            <label htmlFor="courseTaken" className="block text-sm font-medium text-left">
              Course Taken
            </label>
            <input
              type="text"
              id="courseTaken"
              name="courseTaken"
              value={formData.courseTaken}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black bg-white"
              required
            />
          </div>
          <div className="w-1/3">
            <label htmlFor="branchName" className="block text-sm font-medium text-left">
              Branch Name
            </label>
            <input
              type="text"
              id="branchName"
              name="branchName"
              value={formData.branchName}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black bg-white"
              required
            />
          </div>
          <div className="w-1/3">
            <label
              htmlFor="admissionYear"
              className="block text-sm font-medium text-left"
            >
              Admission Year
            </label>
            <input
              type="number"
              id="admissionYear"
              name="admissionYear"
              value={formData.admissionYear}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black bg-white"
              required
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="w-[50%] mx-auto bg-blue-300 text-black p-2 rounded-md hover:bg-blue-700 transition duration-300 ml-40"
          >
            {loading ? (
              <div className="spinner-border spinner-border-sm text-xs" role="status">
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

export default StudentForm;
