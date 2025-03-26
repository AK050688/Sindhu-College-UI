import React from "react";
import Navbar from "../../Components/AdminDashboard/Navbar";
import "../../styles/AdminDashboard/Fees.css";

const Fees = () => {
  // const [fees, setFees] = useState([]);
  // const [showForm, setShowForm] = useState(false);
  // const [loading, setLoading] = useState(true);
  // const [isDelete, setIsDelete] = useState(false);
  //   const [showEditForm, setShowEditForm] = useState(false);
  //   const [editFeesData, setEditFeesData] = useState(null);
  // console.log(fees, loading);

  // useEffect(() => {
  //   handleGetData();
  // }, []);

  // const handleGetData = () => {
  //   const token = localStorage.getItem("token");
  //   fetch(
  //     "https://university-project-paresh.onrender.com/University/Fees/allFees",
  //     {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // console.log("FeesData", data.Fees);
  //       setFees(data.Fees);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching student data:", error);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };

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
        // setIsDelete(true);
        // setTimeout(() => setIsDelete(false), 1000);
      })
      .catch((error) => {
        console.error("Error deleting Fees:", error);
        // setIsDelete(false);
      })
      .finally(() => {
        // setLoading(false);
        // setIsDelete(false);
      });
  };

  // const addFees = (newFees) => {
  //   console.log("new", newFees);
  //   setFees([...Fees, newFees.FeesDetails]);
  // };
  return (
    <>
      <Navbar />
      <div className="feesContainer">
        <div className="flexContainer">
          <h1>All Fees Lists</h1>
          <button
            className="addButton"
          // onClick={() => setShowForm(true)}
          >
            Add Fees
          </button>
        </div>
        {/* {showForm && (
          <FeesFormModel onAddFees={addFees} setShowForm={setShowForm} />
        )}
        {showEditForm && (
          <FeesEditModel
            FeesId={editFeesData._id}
            initialFeesData={editFeesData}
            onEditFees={(FeesId, updatedFeesData) =>
              handleEditFees(FeesId, updatedFeesData)
            }
            setShowEditForm={setShowEditForm}
          />
        )} */}
        {/* <div className="studentHeading}>
          <div className="minHeader}>
            <h1 className="headerText}>All Fees Lists</h1>
          </div>
        </div> */}
        {/* {loading ? (
          <div className="spinner" role="status">
            <span className="loader"></span>
          </div>
        ) : ( */}
        <div className="tableContainer">
          <div className="tableSection">
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
                    <button className="adminPendingButton">Pending</button>
                  </td>
                  <td>
                    <button
                      className="adminDeleteButton"
                      onClick={() => deleteRow(Fees._id)}
                    >
                      Delete
                    </button>
                  </td>
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
    </>
  );
};

export default Fees;
