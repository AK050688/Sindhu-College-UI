import React from "react";
import {
  FaCalendarAlt,
  FaClipboardCheck,
  FaEnvelope,
  FaFlag,
  FaIdCard,
  FaPhone,
  FaRegAddressBook,
  FaRegAddressCard,
  FaRegHospital,
  FaTint,
  FaUniversity,
  FaUser,
  FaVenusMars
} from "react-icons/fa";
import { FiX } from "react-icons/fi";

const StudentModal = ({ student, onClose }) => {
  return (
    <div className="adminStudentModalContainer">
      <div className="modalContainer">
        <div className="modalHeader">
          <h2>Add Notification</h2>
          <button className="closeBtn" onClick={onClose}>
            <FiX />
          </button>
        </div>
        <div className="gridContainer">
          <div className="gridItem">
            <FaUser className="icon" />
            <p className="text">
              <strong>Name:</strong> {student.Name}
            </p>
          </div>
          <div className="gridItem">
            <FaIdCard className="icon" />
            <p className="text">
              <strong>UID:</strong> {student.UID}
            </p>
          </div>
          <div className="gridItem">
            <FaRegAddressBook className="icon" />
            <p className="text">
              <strong>Father's Name:</strong> {student.fatherName}
            </p>
          </div>
          <div className="gridItem">
            <FaRegAddressCard className="icon" />
            <p className="text">
              <strong>Mother's Name:</strong> {student.motherName}
            </p>
          </div>
          <div className="gridItem">
            <FaEnvelope className="icon" />
            <p className="text">
              <strong>Email:</strong> {student.email}
            </p>
          </div>
          <div className="gridItem">
            <FaPhone className="icon" />
            <p className="text">
              <strong>Mobile No:</strong> {student.mobileNo}
            </p>
          </div>
          <div className="gridItem">
            <FaRegAddressCard className="icon" />
            <p className="text">
              <strong>Address:</strong> {student.address}
            </p>
          </div>
          <div className="gridItem">
            <FaFlag className="icon" />
            <p className="text">
              <strong>State:</strong> {student.state}
            </p>
          </div>
          <div className="gridItem">
            <FaFlag className="icon" />
            <p className="text">
              <strong>Country:</strong> {student.country}
            </p>
          </div>
          <div className="gridItem">
            <FaRegHospital className="icon" />
            <p className="text">
              <strong>City/Village:</strong> {student.cityORVillage}
            </p>
          </div>

          <div className="gridItem">
            <FaVenusMars className="icon" />
            <p className="text">
              <strong>Gender:</strong> {student.gender}
            </p>
          </div>

          <div className="gridItem">
            <FaTint className="icon" />
            <p className="text">
              <strong>Blood Group:</strong> {student.bloodGroup}
            </p>
          </div>
          <div className="gridItem">
            <FaUniversity className="icon" />
            <p className="text">
              <strong>Roll No:</strong> {student.rollNo}
            </p>
          </div>
          <div className="gridItem">
            <FaUniversity className="icon" />
            <p className="text">
              <strong>Course Taken:</strong> {student.courseTaken}
            </p>
          </div>
          <div className="gridItem">
            <FaUniversity className="icon" />
            <p className="text">
              <strong>Branch Name:</strong> {student.branchName}
            </p>
          </div>
          <div className="gridItem">
            <FaCalendarAlt className="icon" />
            <p className="text">
              <strong>Admission Year:</strong> {student.admissionYear}
            </p>
          </div>
          <div className="gridItem">
            <FaClipboardCheck className="icon" />
            <p className="text">
              <strong>Account Status:</strong> {student.accountStatus}
            </p>
          </div>
          <div className="gridItem">
            <FaClipboardCheck className="icon" />
            <p className="text">
              <strong>Registered By:</strong> {student.registeredBY}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentModal;
