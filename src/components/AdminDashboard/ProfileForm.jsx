import { useState, useEffect } from "react";
import { RiLockPasswordFill } from "react-icons/ri";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleGetData();
  }, []);

  const handleGetData = () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (token) {
      fetch(
        "https://university-project-paresh.onrender.com/University/Admin/AdminProfile",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("data", data.result);
          setFormData(data.result);
        })
        .catch((error) => {
          console.error("Error:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <>
      <div className=" h-[60px] bg-black">
        <Navbar />
      </div>
      <div className="bg-login mb-10">
        <div className="w-full mt-3 flex justify-between items-center p-3 rounded-lg shadow-md border-0 border-black">
          <div></div>
          {/* <h1 className="text-2xl font-bold mb-2 mx-auto text-blue-500">
            Admin Profile
          </h1> */}
          <Link to={"/dashboard/profile/changepassword"}>
            <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold flex gap-3 mt-0 p-3 rounded-md mr-0">
              <RiLockPasswordFill />
              <span>Change Password</span>
            </div>
          </Link>
        </div>
        {loading ? (
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div className="w-[65%] mt-10 max-w-7xl mx-auto rounded-3xl text-white border border-slate-400 p-[3.1%] shadow-lg backdrop-filter backdrop-blur-xs bg-opacity-30 mb-20">
            <h2 className="text-2xl font-bold mb-4">Profile Update</h2>
            <form className="flex flex-wrap">
              <div className="flex flex-col w-1/2 pr-4 mb-4">
                <label htmlFor="name" className="text-sm font-medium text-left">
                  Name:
                </label>
                <div className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full text-black bg-white">
                  {formData.Name}
                </div>
              </div>
              <div className="flex flex-col w-1/2 pl-4 mb-4">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-left"
                >
                  Email
                </label>
                <div className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full text-black bg-white">
                  {formData.email}
                </div>
              </div>
              <div className="flex flex-col w-1/2 pr-4 mb-4">
                <label
                  htmlFor="userName"
                  className="text-sm font-medium text-left"
                >
                  Username
                </label>
                <div className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full text-black bg-white">
                  {formData.userName}
                </div>
              </div>
              <div className="flex flex-col w-1/2 pl-4 mb-4">
                <label
                  htmlFor="designation"
                  className="text-sm font-medium text-left"
                >
                  Designation
                </label>
                <div className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full text-black bg-white">
                  {formData.designation}
                </div>
              </div>
              <div className="flex flex-col w-1/2 pr-4 mb-4">
                <label
                  htmlFor="collegeName"
                  className="text-sm font-medium text-left"
                >
                  College Name
                </label>
                <div className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full text-black bg-white">
                  {formData.collegeName}
                </div>
              </div>
              <div className="flex flex-col w-1/2 pl-4 mb-4">
                <label
                  htmlFor="mobileNo"
                  className="text-sm font-medium text-left"
                >
                  Mobile Number
                </label>
                <div className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full text-black bg-white">
                  {formData.mobileNo}
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default RegisterForm;
