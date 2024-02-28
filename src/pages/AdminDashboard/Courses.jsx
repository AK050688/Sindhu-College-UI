import { useState } from "react";
import { FiX } from "react-icons/fi";
import Navbar from "../../components/AdminDashboard/Navbar";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [courseFee, setCourseFee] = useState("");
  const [courseYear, setCourseYear] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCourse = {
      name: courseName,
      fee: courseFee,
      year: courseYear
    };
    setCourses([...courses, newCourse]);
    setCourseName("");
    setCourseFee("");
    setCourseYear("");
    setShowForm(false);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div>
      <div className="h-[60px] bg-black">
        <Navbar />
      </div>

      <div className="mx-auto p-1">
        <div className="w-full mt-3 flex justify-between items-center p-2 bg-white rounded-lg shadow-md border-0 border-black">
          <h1 className="text-lg font-bold mb-2 mx-auto">Course Page</h1>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[15%] mt-0"
            onClick={() => setShowForm(true)}
          >
            Add Course
          </button>
        </div>
        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-slate-800 border border-slate-400 rounded-md p-10 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 text-white">
            <div className="p-6 rounded shadow-lg w-[600px] bg-black">
              <div className="flex justify-between">
                <div className="flex items-center ml-52">
                  <h2 className="text-2xl font-bold mx-auto">Add Course</h2>
                </div>
                <div className="flex items-center">
                  <button
                    className="hover:text-gray-800 text-2xl text-white mt-0 bg-black"
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
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    className="border border-gray-400 rounded px-3 py-2 w-full bg-white"
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
                    value={courseFee}
                    onChange={(e) => setCourseFee(e.target.value)}
                    className="border border-gray-400 rounded px-3 py-2 w-full"
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
                    value={courseYear}
                    onChange={(e) => setCourseYear(e.target.value)}
                    className="border border-gray-400 rounded px-3 py-2 w-full"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        )}
        <div className="mt-4">
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-gray-100 p-4 mb-4 rounded shadow flex justify-between text-center"
            >
              <div>
                <span className="font-bold">{course.name} </span>
                <br />
                <span>Course Name</span>
              </div>
              <div>
                <span className="font-bold">{course.fee}</span>
                <br />
                <span>Course Fee</span>
              </div>
              <div>
                <span className="font-bold">{course.year}</span>
                <br />
                <span>Course Year</span>{" "}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
