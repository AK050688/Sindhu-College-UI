import { useState } from "react";
import Navbar from "../../components/AdminDashboard/Navbar";
import { FiX } from "react-icons/fi";

const Exam = () => {
  const [exams, setExams] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [examBranch, setExamBranch] = useState("");
  const [examYear, setExamYear] = useState("");
  const [examType, setExamType] = useState("");
  const [examSubject, setExamSubject] = useState("");
  const [examTiming, setExamTiming] = useState("");
  const [examMarks, setExamMarks] = useState("");
  const [examDate, setExamDate] = useState("");
  const [examQuestionPaper, setExamQuestionPaper] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExam = {
      branch: examBranch,
      year: examYear,
      type: examType,
      subject: examSubject,
      timing: examTiming,
      marks: examMarks,
      date: examDate,
      questionPaper: examQuestionPaper
    };
    setExams([...exams, newExam]);
    setExamBranch("");
    setExamYear("");
    setExamType("");
    setExamSubject("");
    setExamTiming("");
    setExamMarks("");
    setExamDate("");
    setExamQuestionPaper(null);
    setShowForm(false);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div>
      <div className="h-[60px] bg-black">
        <Navbar />
      </div>

      <div className="mx-auto p-1">
        <div className="w-full mt-3 flex justify-between items-center p-2 bg-white rounded-lg shadow-md border-0 border-black">
          <h1 className="text-lg font-bold mb-2 mx-auto">Exam Page</h1>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[15%] mt-0"
            onClick={() => setShowForm(true)}
          >
            Add Course
          </button>
        </div>
        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-slate-800 border border-slate-400 rounded-md p-10 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 text-white">
            <div className="p-6 rounded shadow-lg w-[600px] bg-black">
              <div className="flex justify-between">
                <div className="flex items-center ml-52">
                  <h2 className="text-2xl font-bold mx-auto">Add Exam</h2>
                </div>
                <div className="flex items-center">
                  <button
                    className="hover:text-gray-800 text-2xl text-white mt-0 bg-black"
                    onClick={handleCloseForm}
                  >
                    <FiX />
                  </button>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 p-1 text-sm">
                <div className="">
                  <label
                    htmlFor="exam-branch"
                    className="block text-white text-left font-bold "
                  >
                    Exam Branch:
                  </label>
                  <input
                    type="text"
                    id="exam-branch"
                    value={examBranch}
                    onChange={(e) => setExamBranch(e.target.value)}
                    className="border border-gray-400 rounded px-3 py-2 w-full"
                  />
                </div>
                <div className="">
                  <label
                    htmlFor="exam-year"
                    className="block text-white text-left font-bold"
                  >
                    Exam Year:
                  </label>
                  <input
                    type="text"
                    id="exam-year"
                    value={examYear}
                    onChange={(e) => setExamYear(e.target.value)}
                    className="border border-gray-400 rounded px-3 py-2 w-full"
                  />
                </div>
                <div className="">
                  <label
                    htmlFor="exam-type"
                    className="block text-white text-left font-bold"
                  >
                    Exam Type:
                  </label>
                  <input
                    type="text"
                    id="exam-type"
                    value={examType}
                    onChange={(e) => setExamType(e.target.value)}
                    className="border border-gray-400 rounded px-3 py-2 w-full"
                  />
                </div>
                <div className="">
                  <label
                    htmlFor="exam-subject"
                    className="block text-white text-left font-bold"
                  >
                    Exam Subject:
                  </label>
                  <input
                    type="text"
                    id="exam-subject"
                    value={examSubject}
                    onChange={(e) => setExamSubject(e.target.value)}
                    className="border border-gray-400 rounded px-3 py-2 w-full"
                  />
                </div>
                <div className="">
                  <label
                    htmlFor="exam-timing"
                    className="block text-white text-left font-bold"
                  >
                    Exam Timing:
                  </label>
                  <input
                    type="text"
                    id="exam-timing"
                    value={examTiming}
                    onChange={(e) => setExamTiming(e.target.value)}
                    className="border border-gray-400 rounded px-3 py-2 w-full"
                  />
                </div>
                <div className="">
                  <label
                    htmlFor="exam-marks"
                    className="block text-white text-left font-bold"
                  >
                    Exam Marks:
                  </label>
                  <input
                    type="text"
                    id="exam-marks"
                    value={examMarks}
                    onChange={(e) => setExamMarks(e.target.value)}
                    className="border border-gray-400 rounded px-3 py-2 w-full"
                  />
                </div>
                <div className="">
                  <label
                    htmlFor="exam-date"
                    className="block text-white text-left font-bold"
                  >
                    Exam Date:
                  </label>
                  <input
                    type="date"
                    id="exam-date"
                    value={examDate}
                    onChange={(e) => setExamDate(e.target.value)}
                    className="border-2 border-gray-400 rounded px-3 py-2 w-[540px]"
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="exam-question-paper"
                    className="block font-bold mb-1 text-left text-white"
                  >
                    Exam Question Paper (PDF):
                  </label>
                  <input
                    type="file"
                    id="exam-question-paper"
                    accept=".pdf"
                    onChange={(e) => setExamQuestionPaper(e.target.files[0])}
                    className="border border-gray-400 rounded px-3 py-2 w-full"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded col-span-2 mt-0"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        )}
        <div className="mt-4">
          {exams.map((exam, index) => (
            <div
              key={index}
              className="bg-gray-100 p-4 mb-4 rounded shadow flex justify-between text-center"
            >
              <div>
                <span className="font-bold">{exam.branch}</span>
                <br />
                <span>Exam Branch</span>
              </div>
              <div>
                <span className="font-bold">{exam.year}</span>
                <br />
                <span>Exam Year</span>
              </div>
              <div>
                <span className="font-bold">{exam.type}</span>
                <br />
                <span>Exam Type</span>
              </div>
              <div>
                <span className="font-bold">{exam.subject}</span>
                <br />
                <span>Exam Subject</span>
              </div>
              <div>
                <span className="font-bold">{exam.timing}</span>
                <br />
                <span>Exam Timing</span>
              </div>
              <div>
                <span className="font-bold">{exam.marks}</span>
                <br />
                <span>Exam Marks</span>
              </div>
              <div>
                <span className="font-bold">{exam.date}</span>
                <br />
                <span>Exam Date</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Exam;
