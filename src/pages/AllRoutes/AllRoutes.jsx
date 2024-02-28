import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Home";
import AboutUs from "../AboutUs";
import Admission from "../Admission";
import Faculty from "../Faculty";
import OurCampus from "../OurCampus";
import ContactUs from "../ContactUs";
import Login from "../Login";
import AdminLogin from "../../pages/AdminDashboard/Login";
import Sidebar from "../../components/AdminDashboard/Sidebar";
import Dashboard from "../AdminDashboard/Dashboard";
import Student from "../AdminDashboard/Student";
import Teachers from "../AdminDashboard/Teachers";
import Registration from "../AdminDashboard/Registration";
import ChangePassword from "../../components/AdminDashboard/ChangePassword";
import Notification from "../AdminDashboard/Notification";
import Courses from "../AdminDashboard/Courses";
import ProfileForm from "../../components/AdminDashboard/ProfileForm";
import Exam from "../AdminDashboard/Exam";

const Allroutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/admission" element={<Admission />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/our-campus" element={<OurCampus />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminLogin />} />
        <Route
          path="/dashboard"
          element={
            <Sidebar>
              <Dashboard />
            </Sidebar>
          }
        />
        <Route
          path="/student"
          element={
            <Sidebar>
              <Student />
            </Sidebar>
          }
        />
        <Route
          path="/teacher"
          element={
            <Sidebar>
              <Teachers />
            </Sidebar>
          }
        />
        <Route
          path="/registration"
          element={
            <Sidebar>
              <Registration />
            </Sidebar>
          }
        />
        <Route
          path="/dashboard/profile"
          element={
            <Sidebar>
              <ProfileForm />
            </Sidebar>
          }
        />
        <Route
          path="/dashboard/profile/changepassword"
          element={
            <Sidebar>
              <ChangePassword />
            </Sidebar>
          }
        />
        <Route
          path="/notifications"
          element={
            <Sidebar>
              <Notification />
            </Sidebar>
          }
        />
        <Route
          path="/courses"
          element={
            <Sidebar>
              <Courses />
            </Sidebar>
          }
        />
        <Route
          path="/exam"
          element={
            <Sidebar>
              <Exam />
            </Sidebar>
          }
        />
      </Routes>
    </div>
  );
};
export default Allroutes;
