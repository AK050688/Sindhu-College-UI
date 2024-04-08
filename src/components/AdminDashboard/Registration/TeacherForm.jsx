import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const TeacherForm = () => {
  const [formData, setFormData] = useState({
    Name: "",
    guardian_Name: "",
    email: "",
    mobileNo: "",
    address: "",
    state: "",
    cityORVillage: "",
    pin: "",
    gender: "",
    bloodGroup: "",
    Department: "",
    joiningDate: ""
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
      "https://university-project-paresh.onrender.com/University/Teacher/signUp",
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
        // console.log("TeacherRegistration", data.TeacherDetails);
        if (data.message) {
          localStorage.setItem("TeacherToken", data.accessToken);
          alert(`${data.message}`);
          navigate("/teacher");
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
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
        Teacher Registration Form
      </h1>
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
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="guardianName">Guardian Name</label>
            <input
              type="text"
              id="guardianName"
              name="guardian_Name"
              value={formData.guardian_Name}
              onChange={handleInputChange}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="email">Email</label>
            <input
              type="mail"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              style={{ padding: "10px" }}
            />
          </div>
        </div>
        <div className="flexContainer">
          <div className="inputGroup">
            <label htmlFor="mobileNo">Mobile No</label>
            <input
              type="text"
              id="mobileNo"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleInputChange}
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
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="pin">Pin</label>
            <input
              type="text"
              id="pin"
              name="pin"
              value={formData.pin}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flexContainer">
          <div className="inputGroup">
            <label htmlFor="cityORVillage">City OR Village</label>
            <input
              type="text"
              id="cityORVillage"
              name="cityORVillage"
              value={formData.cityORVillage}
              onChange={handleInputChange}
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
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="gender">Gender</label>
            <Select
              value={options.find((option) => option.value === formData.gender)}
              onChange={handleSelectChange}
              options={options}
              required
              style={{ padding: "20px" }}
            />
          </div>
        </div>
        <div className="flexContainer">
          <div className="inputGroup">
            <label htmlFor="bloodGroup">Blood Group</label>
            <input
              type="text"
              id="bloodGroup"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleInputChange}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="department">Department</label>
            <input
              type="text"
              id="department"
              name="Department"
              value={formData.Department}
              onChange={handleInputChange}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="joiningDate">Joining Date</label>
            <input
              type="date"
              id="joiningDate"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleInputChange}
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

export default TeacherForm;
