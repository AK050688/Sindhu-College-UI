import { useState } from "react";
import Navbar from "../../components/AdminDashboard/Navbar";

const Notification = () => {
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    date: "",
    discription: ""
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
      <div className="bg-cover h-[91vh] p-24 bg-login">
        <div className="w-[80%] max-w-2xl mx-auto rounded-3xl text-white border border-slate-400 p-10 shadow-lg backdrop-filter backdrop-blur-xs bg-opacity-30">
          <h2 className="text-2xl font-bold mb-4 text-center text-blue-300">
            Notification
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-wrap">
            <div className="flex flex-col w-1/2 pr-4 mb-4">
              <label htmlFor="title" className="text-sm font-medium text-left">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full text-black bg-white"
                required
              />
            </div>
            <div className="flex flex-col w-1/2 pl-4 mb-4">
              <label htmlFor="subject" className="text-sm font-medium text-left">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full text-black bg-white"
                required
              />
            </div>
            <div className="flex flex-col w-1/2 pr-4 mb-4">
              <label htmlFor="date" className="text-sm font-medium text-left">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full text-black"
              />
            </div>
            <div className="flex flex-col w-1/2 pl-4 mb-4">
              <label
                htmlFor="discription"
                className="text-sm font-medium text-left"
              >
                Discription
              </label>
              <textarea
                type="text"
                id="discription"
                name="discription"
                value={formData.discription}
                onChange={handleChange}
                className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full text-black bg-white"
                required
              />
            </div>
            <button
              type="submit"
              className="text-black py-2 px-4 rounded-md  ml-auto w-full bg-blue-600 hover:bg-blue-300"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Notification;
