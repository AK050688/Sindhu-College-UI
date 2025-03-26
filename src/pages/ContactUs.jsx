/* Updated ContactUs.js */

import React from "react";
import "../styles/ContactUs.css";
import Footer from "../Components/Home/Footer";
import Navbar from "../Components/Home/Navbar";

const ContactUs = () => {
  return (
    <>
      <Navbar />
      <div className="contact-us-section">
        <div className="contact-us">
          <h2>Contact Form</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group grid-container">
              <div className="grid-item">
                <label htmlFor="exam">Exam</label>
                <input type="text" id="exam" name="exam" required />
              </div>
              <div className="grid-item">
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" name="subject" required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                required
              ></textarea>
            </div>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
