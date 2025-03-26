import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdmissions } from "../../../Redux/features/admissionSlice"; // Adjust the path as necessary
import { deleteAdmission } from "../../../Redux/features/admissionSlice"; // Adjust the path as necessary

import "./../../../styles/AdminDashboard/AdminAdmission.css";
import Navbar from "../../../Components/AdminDashboard/Navbar";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import AdmissionStudentModal from "../../../Components/AdminDashboard/Admission/AdmissionStudentModal";
import axios from 'axios';

const AdminAdmission = () => {
  const dispatch = useDispatch();
  const { admissions, loading } = useSelector((state) => state.admissions);
  const [filteredAdmission, setFilteredAdmission] = useState([]);
  const [selectedAdmission, setSelectedAdmission] = useState(null);
  const [courseOptions, setCourseOptions] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    dispatch(fetchAdmissions());
  }, [dispatch]);

  useEffect(() => {
    setFilteredAdmission(admissions);
  }, [admissions]);

  const indexOfLastRow = currentPage * itemsPerPage;
  const indexOfFirstRow = indexOfLastRow - itemsPerPage;
  const currentRows = filteredAdmission?.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleRowClick = (admission) => {
    setSelectedAdmission(admission);
  };

  const handleReject = (admissionId) => {
    dispatch(deleteAdmission(admissionId)); // Dispatch the delete action
  };

  const handleConfirm = async (admission) => {
    try {
      const response = await axios.post("http://localhost:8080/api/users/register", {
        name: admission.Name,
        email: admission.email,
      });

      alert(`Student registered! Mobile No: ${response.data.mobileNo}, Password: ${response.data.password}`);
    } catch (error) {
      console.error("Error registering student", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="adminAdmission">
        <h2>Admission List</h2>
        {loading ? (
          <div className="spinner" role="status">
            <span className="loader"></span>
          </div>
        ) : (
          <div className="table-container">
            <div className="table-section">
              <table>
                <thead>
                  <tr>
                    <th>SNo.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>MobileNo</th>
                    <th>Gender</th>
                    <th>State</th>
                    <th>Branch Name</th>
                    <th>Course Taken</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRows?.map((admission, index) => (
                    <tr key={index} onClick={() => handleRowClick(admission)}>
                      <td>{index + 1}</td>
                      <td>{admission.name}</td>
                      <td>{admission.email}</td>
                      <td>{admission.mobileNumber}</td>
                      <td>{admission.gender}</td>
                      <td>{admission.state}</td>
                      <td>{admission.branchName}</td>
                      <td>{admission.courseTaken}</td>
                      <td>
                        <button className="confirmBtn" onClick={() => handleConfirm(admission)}>Confirm</button>
                        <button className="rejectBtn" onClick={() => handleReject(admission._id)}>Reject</button> {/* Pass admission ID */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {selectedAdmission && (
          <AdmissionStudentModal
            admission={selectedAdmission}
            onClose={() => setSelectedAdmission(null)}
          />
        )}
        <div className="pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FaChevronLeft />
          </button>
          <span>{currentPage}</span> /{" "}
          <span>{Math.ceil(filteredAdmission.length / itemsPerPage)}</span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastRow >= filteredAdmission.length}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminAdmission;
