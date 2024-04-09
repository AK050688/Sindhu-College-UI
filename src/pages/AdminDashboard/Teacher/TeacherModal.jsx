import React from "react";
import {
  FaCalendarAlt,
  FaEnvelope,
  FaPhone,
  FaRegAddressCard,
  FaRegAddressBook,
  FaTint,
  FaUniversity,
  FaUser,
  FaVenusMars
} from "react-icons/fa";
import { FiX } from "react-icons/fi";

const TeacherModal = ({ teacher, onClose }) => {
  return (
    <div className="adminTeacherModalContainer">
      <div className="modalContainer">
        <div className="modalHeader">
          <h2>Teacher Details</h2>
          <button className="closeBtn" onClick={onClose}>
            <FiX />
          </button>
        </div>
        <div className="gridContainer">
          <div className="gridItem">
            <FaUser className="icon" />
            <p className="text">
              <strong>Name:</strong> {teacher.Name}
            </p>
          </div>
          <div className="gridItem">
            <FaRegAddressBook className="icon" />
            <p className="text">
              <strong>Guardian Name:</strong> {teacher.guardian_Name}
            </p>
          </div>
          <div className="gridItem">
            <FaEnvelope className="icon" />
            <p className="text">
              <strong>Email:</strong> {teacher.email}
            </p>
          </div>
          <div className="gridItem">
            <FaPhone className="icon" />
            <p className="text">
              <strong>Mobile:</strong> {teacher.mobileNo}
            </p>
          </div>
          <div className="gridItem">
            <FaRegAddressCard className="icon" />
            <p className="text">
              <strong>Address:</strong> {teacher.address}
            </p>
          </div>
          <div className="gridItem">
            <FaTint className="icon" />
            <p className="text">
              <strong>Blood Group:</strong> {teacher.bloodGroup}
            </p>
          </div>
          <div className="gridItem">
            <FaUniversity className="icon" />
            <p className="text">
              <strong>Department:</strong> {teacher.Department}
            </p>
          </div>
          <div className="gridItem">
            <FaVenusMars className="icon" />
            <p className="text">
              <strong>Gender:</strong> {teacher.gender}
            </p>
          </div>

          <div className="gridItem">
            <FaRegAddressCard className="icon" />
            <p className="text">
              <strong>City/Village:</strong> {teacher.cityORVillage}
            </p>
          </div>
          <div className="gridItem">
            <FaRegAddressCard className="icon" />
            <p className="text">
              <strong>State:</strong> {teacher.state}
            </p>
          </div>
          <div className="gridItem">
            <FaRegAddressCard className="icon" />
            <p className="text">
              <strong>UID:</strong> {teacher.UID}
            </p>
          </div>
          <div className="gridItem">
            <FaRegAddressCard className="icon" />
            <p className="text">
              <strong>Account Status:</strong> {teacher.accountStatus}
            </p>
          </div>
          <div className="gridItem">
            <FaCalendarAlt className="icon" />
            <p className="text">
              <strong>Joining Date:</strong> {teacher.joiningDate}
            </p>
          </div>
          <div className="gridItem">
            <FaRegAddressCard className="icon" />
            <p className="text">
              <strong>Registered By:</strong> {teacher.registeredBY}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherModal;
