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
    <div className="fixed inset-0 flex items-center justify-center bg-slate-500 border border-slate-300 rounded-md p-10 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-10 text-white">
      <div className="p-4 rounded shadow-lg w-[960px] bg-slate-400">
        <div className="flex justify-between">
          <div className="flex items-center">
            <h2 className="text-3xl font-bold ml-60">Teacher Details</h2>
          </div>
          <div className="flex items-center">
            <button
              className="hover:text-gray-800 text-2xl text-white mt-0 border-0 hover:bg-slate-400"
              onClick={onClose}
            >
              <FiX />
            </button>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center">
              <FaUser className="mr-2 text-gray-500" />
              <p className="text-lg text-gray-700">
                <strong>Name:</strong> {teacher.Name}
              </p>
            </div>
            <div className="flex items-center">
              <FaRegAddressBook className="mr-2 text-gray-500" />
              <p className="text-lg text-gray-700">
                <strong>Guardian Name:</strong> {teacher.guardian_Name}
              </p>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="mr-2 text-gray-500" />
              <p className="text-lg text-gray-700">
                <strong>Email:</strong> {teacher.email}
              </p>
            </div>
            <div className="flex items-center">
              <FaPhone className="mr-2 text-gray-500" />
              <p className="text-lg text-gray-700">
                <strong>Mobile:</strong> {teacher.mobileNo}
              </p>
            </div>
            <div className="flex items-center">
              <FaRegAddressCard className="mr-2 text-gray-500" />
              <p className="text-lg text-gray-700">
                <strong>Address:</strong> {teacher.address}
              </p>
            </div>
            <div className="flex items-center">
              <FaTint className="mr-2 text-gray-500" />
              <p className="text-lg text-gray-700">
                <strong>Blood Group:</strong> {teacher.bloodGroup}
              </p>
            </div>
            <div className="flex items-center">
              <FaUniversity className="mr-2 text-gray-500" />
              <p className="text-lg text-gray-700">
                <strong>Department:</strong> {teacher.Department}
              </p>
            </div>
            <div className="flex items-center">
              <FaVenusMars className="mr-2 text-gray-500" />
              <p className="text-lg text-gray-700">
                <strong>Gender:</strong> {teacher.gender}
              </p>
            </div>
            <div className="flex items-center">
              <FaCalendarAlt className="mr-2 text-gray-500" />
              <p className="text-lg text-gray-700">
                <strong>Joining Date:</strong> {teacher.joiningDate}
              </p>
            </div>
            <div className="flex items-center">
              <FaRegAddressCard className="mr-2 text-gray-500" />
              <p className="text-lg text-gray-700">
                <strong>City/Village:</strong> {teacher.cityORVillage}
              </p>
            </div>
            <div className="flex items-center">
              <FaRegAddressCard className="mr-2 text-gray-500" />
              <p className="text-lg text-gray-700">
                <strong>State:</strong> {teacher.state}
              </p>
            </div>
            <div className="flex items-center">
              <FaRegAddressCard className="mr-2 text-gray-500" />
              <p className="text-lg text-gray-700">
                <strong>UID:</strong> {teacher.UID}
              </p>
            </div>

            <div className="flex items-center">
              <FaRegAddressCard className="mr-2 text-gray-500" />
              <p className="text-lg text-gray-700">
                <strong>Account Status:</strong> {teacher.accountStatus}
              </p>
            </div>
            <div className="flex items-center">
              <FaRegAddressCard className="mr-2 text-gray-500" />
              <p className="text-lg text-gray-700">
                <strong>Registered By:</strong> {teacher.registeredBY}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherModal;
