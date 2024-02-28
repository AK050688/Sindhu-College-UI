import { useState } from "react";
import { RiLockPasswordFill } from "react-icons/ri";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    userName: "Admin2023",
    designation: "",
    password: "",
    collegeName: "",
    mobileNo: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <div className=" h-[60px] bg-black">
        <Navbar />
      </div>
      <div className="w-[80%] border bg-white rounded-lg shadow-lg mx-auto m-4 px-8 py-5 flex justify-between items-center">
        <div className="text-[20px] font-medium">Admin Profile</div>
        <Link to={"/dashboard/profile/changepassword"}>
          <div className="flex gap-3 justify-center items-center bg-slate-600 p-4 rounded-md hover:bg-slate-500">
            <RiLockPasswordFill />
            <span>Change Password</span>
          </div>
        </Link>
      </div>

      <div className="w-[80%] mt-10 border-8 border-slate-900	 mx-auto m-4 p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Profile Update</h2>
        <form onSubmit={handleSubmit} className="flex flex-wrap">
          <div className="flex flex-col w-1/2 pr-4 mb-4">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>
          <div className="flex flex-col w-1/2 pl-4 mb-4">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>
          <div className="flex flex-col w-1/2 pr-4 mb-4">
            <label
              htmlFor="userName"
              className="text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="flex flex-col w-1/2 pl-4 mb-4">
            <label
              htmlFor="designation"
              className="text-sm font-medium text-gray-700"
            >
              Designation
            </label>
            <input
              type="designation"
              id="designation"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>
          <div className="flex flex-col w-1/2 pr-4 mb-4">
            <label
              htmlFor="collegeName"
              className="text-sm font-medium text-gray-700"
            >
              College Name
            </label>
            <input
              type="text"
              id="collegeName"
              name="collegeName"
              value={formData.collegeName}
              onChange={handleChange}
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="flex flex-col w-1/2 pl-4 mb-4">
            <label
              htmlFor="mobileNo"
              className="text-sm font-medium text-gray-700"
            >
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobileNo"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleChange}
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-slate-600 text-black py-2 px-4 rounded-md hover:bg-slate-500 ml-auto"
          >
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
