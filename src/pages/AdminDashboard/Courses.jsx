import { useEffect, useState } from "react";
import Navbar from "../../Components/AdminDashboard/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CourseFormModel from "../../Components/AdminDashboard/Courses/CourseFormModel";
import CourseEditModel from "../../Components/AdminDashboard/Courses/CourseEditModel";
import "../../styles/AdminDashboard/Courses.css";
import axios from "axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editCourseData, setEditCourseData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

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

  const indexOfLastRow = currentPage * itemsPerPage;
  const indexOfFirstRow = indexOfLastRow - itemsPerPage;
  const currentCourses = courses.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="adminCoursesContainer">
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
                  {currentCourses?.map((course, index) => (
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
                      <td>
                        <button
                          className="deleteButton"
                          onClick={() => deleteRow(course._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        <div className="pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FaChevronLeft />
          </button>
          <span>{currentPage}</span> /{" "}
          <span>{Math.ceil(courses.length / itemsPerPage)}</span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastRow >= courses.length}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </>
  );
};

export default Courses;
