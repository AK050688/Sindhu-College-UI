import Navbar from "../../components/AdminDashboard/Navbar";

function Dashboard() {
  return (
    <>
      <div className=" h-[60px] bg-black">
        <Navbar />
      </div>
      <div className="grid grid-cols-3 justify-center m-auto gap-4 w-full  mt-5">
        <div className="bg-[#3ffcb4] w-[400px] h-[200px] rounded-lg flex flex-col m-auto justify-center items-center">
          <span className="text-3xl mb-2">Student Registered</span>
          <span className="text-2xl">{100}</span>
        </div>
        <div className="bg-[#3ffcb4] w-[400px] h-[200px] rounded-lg	flex flex-col m-auto justify-center items-center">
          <span className="text-3xl mb-2">Teacher Registered</span>
          <span className="text-2xl">{100}</span>
        </div>
        <div className="bg-[#3ffcb4] w-[400px] h-[200px] rounded-lg	flex flex-col m-auto justify-center items-center">
          <span className="text-3xl mb-2">Student Registered</span>
          <span className="text-2xl">{100}</span>
        </div>
        <div className="bg-[#3ffcb4] w-[400px] h-[200px] rounded-lg	flex flex-col m-auto justify-center items-center">
          <span className="text-3xl mb-2">Student Registered</span>
          <span className="text-2xl">{100}</span>
        </div>
        <div className="bg-[#3ffcb4] w-[400px] h-[200px] rounded-lg	flex flex-col m-auto justify-center items-center">
          <span className="text-3xl mb-2">Student Registered</span>
          <span className="text-2xl">{100}</span>
        </div>
        <div className="bg-[#3ffcb4] w-[400px] h-[200px] rounded-lg	flex flex-col m-auto justify-center items-center">
          <span className="text-3xl mb-2">Student Registered</span>
          <span className="text-2xl">{100}</span>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
