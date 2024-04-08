import { useEffect, useState } from "react";
import Navbar from "../../components/AdminDashboard/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CourseFormModel from "../../components/AdminDashboard/Courses/CourseFormModel";
import CourseEditModel from "../../components/AdminDashboard/Courses/CourseEditModel";
import "../../styles/AdminDashboard/Courses.css";
import axios from "axios";

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

  const deleteRow = async (courseId) => {
    try {
      await axios.delete(
        `https://university-project-paresh.onrender.com/University/Course/deleteCourse/${courseId}`
      );
      const response = await axios.get(
        "https://university-project-paresh.onrender.com/University/Course/allCourses"
      );
      setCourses(response.data.courses);
      toast.success("course deleted successfully");
      console.log("course deleted successfully", response.data.courses);
    } catch (error) {
      console.error("Error deleting schedule:", error);
      toast.error("Error deleting course:");
    }
  };

  const addCourse = (newCourse) => {
    // console.log("new", newCourse);
    setCourses([...courses, newCourse.courseDetails]);
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="coursesContainer">
        <div className="coursesHeader">
          <h1 className="headerTitle">All Courses Lists</h1>
          <button className="addCourseButton" onClick={() => setShowForm(true)}>
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
        {loading ? (
          <div className="spinner" role="status">
            <span className="loader"></span>
          </div>
        ) : (
          <div className="tableContainer">
            <div className="tableSection">
              <table className="courseTable">
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
                          className="editButton"
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
                            className="deleteButton"
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
    </>
  );
};

export default Courses;
