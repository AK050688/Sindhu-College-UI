import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const StudentForm = () => {
  const [formData, setFormData] = useState({
    Name: "",
    fatherName: "",
    motherName: "",
    email: "",
    mobileNo: "",
    address: "",
    state: "",
    country: "",
    cityORVillage: "",
    pin: "",
    gender: "",
    bloodGroup: "",
    rollNo: "",
    courseTaken: "",
    branchName: "",
    admissionYear: ""
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSelectChange = (selectedOption) => {
    handleChange("gender", selectedOption.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");

    fetch(
      "https://university-project-paresh.onrender.com/University/Student/signUp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          localStorage.setItem("StudentToken", data.accessToken);
          alert(`${data.message}`);
          navigate("/student");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const options = [
    { value: "female", label: "Female" },
    { value: "male", label: "Male" },
    { value: "other", label: "Others" }
  ];
  return (
    <div className="registrationFormContainer">
      <h1>Student Registration Form</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="flexContainer">
          <div className="inputGroup">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="Name"
              value={formData.Name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="fatherName">Father's Name</label>
            <input
              type="text"
              id="fatherName"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="motherName">Mother's Name</label>
            <input
              type="text"
              id="motherName"
              name="motherName"
              value={formData.motherName}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="flexContainer">
          <div className="inputGroup">
            <label htmlFor="email">Email</label>
            <input
              type="mail"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="mobileNo">Mobile No</label>
            <input
              type="text"
              id="mobileNo"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="flexContainer">
          <div className="inputGroup">
            <label htmlFor="cityORVillage">City/Village</label>
            <input
              type="text"
              id="cityORVillage"
              name="cityORVillage"
              value={formData.cityORVillage}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="flexContainer">
          <div className="inputGroup">
            <label htmlFor="gender">Gender</label>
            <Select
              value={options.find((option) => option.value === formData.gender)}
              onChange={handleSelectChange}
              options={options}
              required
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="bloodGroup">Blood Group</label>
            <input
              type="text"
              id="bloodGroup"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="rollNo">Roll No</label>
            <input
              type="text"
              id="rollNo"
              name="rollNo"
              value={formData.rollNo}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="flexContainer">
          <div className="inputGroup">
            <label htmlFor="courseTaken">Course Taken</label>
            <input
              type="text"
              id="courseTaken"
              name="courseTaken"
              value={formData.courseTaken}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="branchName">Branch Name</label>
            <input
              type="text"
              id="branchName"
              name="branchName"
              value={formData.branchName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="admissionYear">Admission Year</label>
            <input
              type="number"
              id="admissionYear"
              name="admissionYear"
              value={formData.admissionYear}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="submitButtonContainer">
          <button
            type="submit"
            className={`submitButton ${loading ? "loading" : ""}`}
          >
            {loading ? <div className="spinner"></div> : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
