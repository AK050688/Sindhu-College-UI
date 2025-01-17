import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./Admission.css"
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
  FaVenusMars,
  FaGraduationCap,
  FaBus,
  FaBuilding,
  FaCity,
  FaMapPin,
  FaMapMarkedAlt,
  FaBookOpen
} from "react-icons/fa";
import { FiX } from "react-icons/fi";

const AdmissionStudentModal = ({ admission, onClose }) => {


  const handleDownloadPdf = () => {
    const input = document.getElementById('admission-details');
    
    html2canvas(input, { useCORS: true }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save("admission-details.pdf");
    });
  };

  return (
    <div className="adminAdmissionModalContainer">
      <div className="modalContainer">
        <div className="modalHeader">
          <h2>Add Notification</h2>
          <button className="closeBtn" onClick={onClose}>
            <FiX />
          </button>
        </div>

        {/* Add the ID for html2canvas to capture */}
        <div id="admission-details" className="gridContainer styled-pdf">
          <div className="gridItem">
            <FaUser className="icon" />
            <p className="text">
              <strong>Name:</strong> {admission.name}
            </p>
          </div>
          <div className="gridItem">
            <FaRegAddressBook className="icon" />
            <p className="text">
              <strong>Father's Name:</strong> {admission.fathersName}
            </p>
          </div>
          <div className="gridItem">
            <FaRegAddressCard className="icon" />
            <p className="text">
              <strong>Mother's Name:</strong> {admission.mothersName}
            </p>
          </div>
          <div className="gridItem">
            <FaEnvelope className="icon" />
            <p className="text">
              <strong>Email:</strong> {admission.email}
            </p>
          </div>
          <div className="gridItem">
            <FaPhone className="icon" />
            <p className="text">
              <strong>Mobile No:</strong> {admission.mobileNumber}
            </p>
          </div>
          <div className="gridItem">
            <FaMapMarkedAlt className="icon" />
            <p className="text">
              <strong>Address:</strong> {admission.address}
            </p>
          </div>
          <div className="gridItem">
            <FaFlag className="icon" />
            <p className="text">
              <strong>State:</strong> {admission.state}
            </p>
          </div>
          <div className="gridItem">
            <FaCity className="icon" />
            <p className="text">
              <strong>Country:</strong> {admission.country}
            </p>
          </div>
          <div className="gridItem">
            <FaRegHospital className="icon" />
            <p className="text">
              <strong>City/Village:</strong> {admission.cityOrVillage}
            </p>
          </div>
          <div className="gridItem">
            <FaMapPin className="icon" />
            <p className="text">
              <strong>Pin:</strong> {admission.pin}
            </p>
          </div>
          <div className="gridItem">
            <FaVenusMars className="icon" />
            <p className="text">
              <strong>Gender:</strong> {admission.gender}
            </p>
          </div>
          <div className="gridItem">
            <FaTint className="icon" />
            <p className="text">
              <strong>Blood Group:</strong> {admission.bloodGroup}
            </p>
          </div>
          <div className="gridItem">
            <FaUniversity className="icon" />
            <p className="text">
              <strong>Date Of Birth:</strong> {admission.dob}
            </p>
          </div>
          <div className="gridItem">
            <FaBus className="icon" />
            <p className="text">
              <strong>Bus Service:</strong> {admission.busService}
            </p>
          </div>
          <div className="gridItem">
            <FaBuilding className="icon" />
            <p className="text">
              <strong>Hostel Service:</strong> {admission.hostelService}
            </p>
          </div>
          <div className="gridItem">
            <FaGraduationCap className="icon" />
            <p className="text">
              <strong>Course Taken:</strong> {admission.courseTaken}
            </p>
          </div>
          <div className="gridItem">
            <FaBookOpen className="icon" />
            <p className="text">
              <strong>Branch Name:</strong> {admission.branchName}
            </p>
          </div>
          <div className="gridItem">
            <FaCalendarAlt className="icon" />
            <p className="text">
              <strong>10th Passout Year:</strong> {admission.yearOf10thPassout}
            </p>
          </div>
          <div className="gridItem">
            <FaClipboardCheck className="icon" />
            <p className="text">
              <strong>Application Form Status:</strong> {admission.applicationFormStatus}
            </p>
          </div>
          <div className="gridItem">
            <FaIdCard className="icon" />
            <p className="text">
              <strong>Aadhar Number:</strong> {admission.AadharNumber}
            </p>
          </div>
        </div>
        
        {/* PDF Download Button */}
        <button onClick={handleDownloadPdf} className="pdfBtn">
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default AdmissionStudentModal;
