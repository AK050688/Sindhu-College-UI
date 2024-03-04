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
    <div className="fixed inset-0 flex items-center justify-center bg-slate-500 border border-slate-300 rounded-md p-10 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-10 text-white">
      <div className="p-4 rounded shadow-lg w-[790px] bg-slate-400">
        <div className="flex justify-between">
          <div className="flex items-center">
            <h2 className="text-3xl font-bold  ml-60">Add Notification</h2>
          </div>
          <div className="flex items-center">
            <button
              className="hover:text-gray-800 text-2xl text-white mt-0  border-0 hover:bg-slate-400"
              onClick={onClose}
            >
              <FiX />
            </button>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="flex items-center">
              <FaUser className="mr-2 text-gray-500" />
              <p className="text-lg text-gray-700">
                <strong>Name:</strong> {student.Name}
              </p>
            </div>
            <div className="flex items-center">
              <FaIdCard className="mr-2 text-gray-500" />
              <p className="text-lg text-gray-700">
                <strong>UID:</strong> {student.UID}
              </p>
            </div>
            <div className="flex items-center">
              <FaRegAddressBook className="mr-2 text-gray-500" />
              <p className="text-lg text-gray-700">
                <strong>Father's Name:</strong> {student.fatherName}
              </p>
            </div>
            <div className="flex items-center">
              <FaRegAddressCard className="mr-2 text-gray-500" />
              <p className="text-lg text-gray-700">
                <strong>Mother's Name:</strong> {student.motherName}
              </p>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="mr-2 text-gray-500" />
              <p className="text-lg text-gray-700">
                <strong>Email:</strong> {student.email}
              </p>
            </div>
            <div className="flex items-center">
              <FaPhone className="mr-2 text-gray-500" />
              <p className="text-lg text-gray-700">
                <strong>Mobile No:</strong> {student.mobileNo}
              </p>
            </div>
            <div className="flex items-center">
              <FaRegAddressCard className="mr-2 text-gray-500" />
              <p className="text-lg text-gray-700">
                <strong>Address:</strong> {student.address}
              </p>
            </div>
            <div className="flex items-center">
              <FaFlag className="mr-2 text-gray-500" />
              <p className="text-lg text-gray-700">
                <strong>State:</strong> {student.state}
              </p>
            </div>
            <div className="flex items-center">
              <FaFlag className="mr-2 text-gray-500" />
              <p className="text-lg text-gray-700">
                <strong>Country:</strong> {student.country}
              </p>
            </div>
            <div className="flex items-center">
              <FaRegHospital className="mr-2 text-gray-500" />
              <p className="text-lg text-gray-700">
                <strong>City/Village:</strong> {student.cityORVillage}
              </p>
            </div>
            <div className="flex items-center">
              <FaClipboardCheck className="mr-2 text-gray-500" />
              <p className="text-lg text-gray-700">
                <strong>Registered By:</strong> {student.registeredBY}
              </p>
            </div>
            <div className="flex items-center">
              <FaVenusMars className="mr-2 text-gray-500" />
              <p className="text-lg text-gray-700">
                <strong>Gender:</strong> {student.gender}
              </p>
            </div>
            <div className="flex items-center">
              <FaTint className="mr-2 text-gray-500" />
              <p className="text-lg text-gray-700">
                <strong>Blood Group:</strong> {student.bloodGroup}
              </p>
            </div>
            <div className="flex items-center">
              <FaUniversity className="mr-2 text-gray-500" />
              <p className="text-lg text-gray-700">
                <strong>Roll No:</strong> {student.rollNo}
              </p>
            </div>
            <div className="flex items-center">
              <FaUniversity className="mr-2 text-gray-500" />
              <p className="text-lg text-gray-700">
                <strong>Course Taken:</strong> {student.courseTaken}
              </p>
            </div>
            <div className="flex items-center">
              <FaUniversity className="mr-2 text-gray-500" />
              <p className="text-lg text-gray-700">
                <strong>Branch Name:</strong> {student.branchName}
              </p>
            </div>
            <div className="flex items-center">
              <FaCalendarAlt className="mr-2 text-gray-500" />
              <p className="text-lg text-gray-700">
                <strong>Admission Year:</strong> {student.admissionYear}
              </p>
            </div>
            <div className="flex items-center">
              <FaClipboardCheck className="mr-2 text-gray-500" />
              <p className="text-lg text-gray-700">
                <strong>Account Status:</strong> {student.accountStatus}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentModal;
