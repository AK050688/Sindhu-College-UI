import { useEffect, useState } from "react";
import Navbar from "../../components/AdminDashboard/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import FeesFormModel from "../../components/AdminDashboard/Fees/FeesFormModel";
// import FeesEditModel from "../../components/AdminDashboard/Fees/FeesEditModel";
import "../../styles/AdminDashboard/Fees.css";
import FeesFormModel from "../../components/AdminDashboard/Fees/FeesFormModel";

const Fees = () => {
  const [fees, setFees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isDelete, setIsDelete] = useState(false);
  //   const [showEditForm, setShowEditForm] = useState(false);
  //   const [editFeesData, setEditFeesData] = useState(null);
  console.log(fees, loading);

  useEffect(() => {
    handleGetData();
  }, []);

  const handleGetData = () => {
    const token = localStorage.getItem("token");
    fetch(
      "https://university-project-paresh.onrender.com/University/Fees/allFees",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("FeesData", data.Fees);
        setFees(data.Fees);
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //   const handleEditFees = (FeesId, updatedFeesData) => {
  //     setFees(
  //       Fees.map((Fees) => {
  //         if (Fees._id === FeesId) {
  //           return { ...Fees, ...updatedFeesData };
  //         }
  //         return Fees;
  //       })
  //     );
  //   };

  const deleteRow = (FeesId) => {
    fetch(
      `https://university-project-paresh.onrender.com/University/Fees/deleteFees/${FeesId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Deleted Fees:", data);
        toast.success(data.message);
        setIsDelete(true);
        setTimeout(() => setIsDelete(false), 1000);
      })
      .catch((error) => {
        console.error("Error deleting Fees:", error);
        toast.error("Failed to delete Fees. Please try again later.");
        setIsDelete(false);
      })
      .finally(() => {
        setLoading(false);
        setIsDelete(false);
      });
  };

  const addFees = (newFees) => {
    console.log("new", newFees);
    setFees([...Fees, newFees.FeesDetails]);
  };

  return (
    <div>
      <div className="h-[60px] bg-black">
        <Navbar />
      </div>
      <ToastContainer />
      <div className="mx-auto bg-cover bg-login h-[90.7vh]">
        <div className="flex flex-col md:flex-row justify-between items-center p-2 rounded-lg shadow-md border-0 border-black">
          <h1 className="text-xl font-bold text-white text-left">
            All Fees Lists
          </h1>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[15%] mt-0"
            onClick={() => setShowForm(true)}
          >
            Add Fees
          </button>
        </div>
        {showForm && (
          <FeesFormModel onAddFees={addFees} setShowForm={setShowForm} />
        )}
        {/* {showEditForm && (
          <FeesEditModel
            FeesId={editFeesData._id}
            initialFeesData={editFeesData}
            onEditFees={(FeesId, updatedFeesData) =>
              handleEditFees(FeesId, updatedFeesData)
            }
            setShowEditForm={setShowEditForm}
          />
        )} */}
        {/* <div className="student-heading">
          <div className="min-h-[90px] rounded flex justify-center items-center">
            <h1 className="text-3xl font-semibold text-blue-600">
              All Fees Lists
            </h1>
          </div>
        </div> */}
        {/* {loading ? (
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : ( */}
        <div className="table-container">
          <div className="table-section">
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Student Name</th>
                  <th>Roll No</th>
                  <th>Fees Type</th>
                  <th>Payment Type</th>
                  <th>Date</th>
                  <th>Account</th>
                  <th>Status</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Ayushi</td>
                  <td>123</td>
                  <td>Semester</td>
                  <td>Cash</td>
                  <td>05/03/2024</td>
                  <td>$20000</td>
                  <td>
                    <button className="bg-green-500 text-white p-1 rounded-md">
                      Pending
                    </button>
                  </td>
                  {!isDelete && (
                    <td>
                      <button
                        className="bg-red-500 text-white p-2 rounded-md cursor-pointer"
                        onClick={() => deleteRow(Fees._id)}
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
                {/* {Fees?.map((Fees, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{Fees.FeesName}</td>
                      <td>{Fees.FeesFees}</td>
                      <td>{Fees.year}</td>
                      <td>
                        <button
                          className="bg-green-500 text-white p-1 rounded-md"
                          onClick={() => {
                            setEditFeesData(Fees);
                            setShowEditForm(true);
                          }}
                        >
                          Edit
                        </button>
                      </td>
                      {!isDelete && (
                        <td>
                          <button
                            className="bg-red-500 text-white p-2 rounded-md cursor-pointer"
                            onClick={() => deleteRow(Fees._id)}
                          >
                            Delete
                          </button>
                        </td>
                      )}
                    </tr>
                  ))} */}
              </tbody>
            </table>
          </div>
        </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default Fees;
