import { useState } from "react";
import Navbar from "./Navbar";
import { RiAdminFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
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
        <div className="text-[20px] font-medium">Update Password</div>
        <Link to={"/dashboard/profile"}>
          <div className="flex gap-3 justify-center items-center bg-slate-600 p-4 rounded-md hover:bg-slate-500">
            <RiAdminFill />
            <span>Admin Profile</span>
          </div>
        </Link>
      </div>

      <div className="w-[80%] mt-10 border-8 border-slate-900	 mx-auto m-4 p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Update Password</h2>
        <form onSubmit={handleSubmit} className="flex flex-wrap">
          <div className="flex flex-col w-1/2 pr-4 mb-4">
            <label
              htmlFor="oldPassword"
              className="text-sm font-medium text-gray-700"
            >
              Old Password
            </label>
            <input
              type="text"
              id="oldPassword"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>
          <div className="flex flex-col w-1/2 pl-4 mb-4">
            <label
              htmlFor="newPassword"
              className="text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type="text"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>
          <div className="flex flex-col w-full pr-4 mb-4">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="text"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          <button
            type="submit"
            className="bg-slate-600 text-black py-2 px-4 rounded-md hover:bg-slate-500 m-auto w-full"
          >
            Update Password
          </button>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
