import { useEffect, useState } from "react";
import Navbar from "../../components/AdminDashboard/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CourseFormModel from "../../components/AdminDashboard/Courses/CourseFormModel";
import CourseEditModel from "../../components/AdminDashboard/Courses/CourseEditModel";
import "../../styles/AdminDashboard/Courses.css";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isDelete, setIsDelete] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editCourseData, setEditCourseData] = useState(null);

  useEffect(() => {
    handleGetData();
  }, []);

  const handleGetData = () => {
    const token = localStorage.getItem("token");
    fetch(
      "https://university-project-paresh.onrender.com/University/Course/allCourses",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log("courseData", data.courses);
        setCourses(data.courses);
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleEditCourse = (courseId, updatedCourseData) => {
    setCourses(
      courses.map((course) => {
        if (course._id === courseId) {
          return { ...course, ...updatedCourseData };
        }
        return course;
      })
    );
  };

  const deleteRow = (courseId) => {
    fetch(
      `https://university-project-paresh.onrender.com/University/Course/deleteCourse/${courseId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log("Deleted course:", data);
        toast.success(data.message);
        setIsDelete(true);
        setTimeout(() => setIsDelete(false), 1000);
      })
      .catch((error) => {
        console.error("Error deleting course:", error);
        toast.error("Failed to delete course. Please try again later.");
        setIsDelete(false);
      })
      .finally(() => {
        setLoading(false);
        setIsDelete(false);
      });
  };

  const addCourse = (newCourse) => {
    // console.log("new", newCourse);
    setCourses([...courses, newCourse.courseDetails]);
  };

  return (
    <div>
      <div className="h-[60px] bg-black">
        <Navbar />
      </div>
      <ToastContainer />
      <div className="mx-auto bg-cover bg-login h-[91.4vh]">
        <div className="flex flex-col md:flex-row justify-between items-center p-2 rounded-lg shadow-md border-0 border-black">
          <h1 className="text-xl font-bold text-white text-left">
            All Courses Lists
          </h1>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[15%] mt-0"
            onClick={() => setShowForm(true)}
          >
            Add Course
          </button>
        </div>
        {showForm && (
          <CourseFormModel onAddCourse={addCourse} setShowForm={setShowForm} />
        )}

        {showEditForm && (
          <CourseEditModel
            courseId={editCourseData._id}
            initialCourseData={editCourseData}
            onEditCourse={(courseId, updatedCourseData) =>
              handleEditCourse(courseId, updatedCourseData)
            }
            setShowEditForm={setShowEditForm}
          />
        )}
        {/* <div className="student-heading">
          <div className="min-h-[90px] rounded flex justify-center items-center">
            <h1 className="text-3xl font-semibold text-blue-600">
              All Courses Lists
            </h1>
          </div>
        </div> */}

        {loading ? (
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div className="table-container">
            <div className="table-section">
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Course Name</th>
                    <th>Course Fees</th>
                    <th>Year</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {courses?.map((course, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{course.courseName}</td>
                      <td>{course.courseFees}</td>
                      <td>{course.year}</td>
                      <td>
                        <button
                          className="bg-green-500 text-white p-1 rounded-md"
                          onClick={() => {
                            setEditCourseData(course);
                            setShowEditForm(true);
                          }}
                        >
                          Edit
                        </button>
                      </td>
                      {!isDelete && (
                        <td>
                          <button
                            className="bg-red-500 text-white p-2 rounded-md cursor-pointer"
                            onClick={() => deleteRow(course._id)}
                          >
                            Delete
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
