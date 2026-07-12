import { useEffect, useState } from "react";
import {
  FaLeaf,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaSearch,
  FaFilter,
  FaEye,
  FaCheck,
  FaTimes,
  FaCalendarAlt,
  FaFileAlt,
  FaUser,
  FaBriefcase,
  FaHistory,
  FaCheckDouble,
  FaExclamationCircle,
  FaInfoCircle,
} from "react-icons/fa";

export default function Leave() {
  const [summary,setSummary] = useState({});
  const [leaveRequests,setLeaveRequests] = useState([]);
  const [activities,setActivities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLeaveType, setSelectedLeaveType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading,setLoading] = useState(true);

  // FOR PAGINATION
  const [currentPage,setCurrentPage] = useState(1);
  const [nextPage,setNextPage] = useState(null);
  const [previousPage,setPreviousPage] = useState(null);
  const [totalCount,setTotalCount] = useState(0);

  useEffect(() => {
    fetchLeaveData(currentPage);
  },[currentPage]);

  const fetchLeaveData = async (page = 1) => {
    try{
      const token = localStorage.getItem("accessToken");

      const response = await fetch(
        "http://127.0.0.1:8000/api/hr/leaves/?page=${page}",
        {
          method:"GET",
          headers:{
            "Content-Type": "application/json",
            Authorization:`Bearer ${token}`
          }
        }
      );

      if(!response.ok){
        throw new Error("Failed to fetch leave data");
      }

      const data = await response.json();
    
      setSummary(data.summary || {});
      setLeaveRequests(data.leave_requests || []);
      setActivities(data.activities || []);

      setNextPage(data.next);
      setPreviousPage(data.previous);
      setTotalCount(data.count);

    }catch(error){
      console.log("Error fetching leave data:",error);
    } finally {
      setLoading(false);
    }
  }

  const handleApprove = async (leaveId) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await fetch (
        `http://127.0.0.1:8000/api/hr/leaves/${leaveId}/approve`,
        {
          method:"PATCH",
          headers:{
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if(!response.ok){
        alert(data.message);
        return;
      }

      alert(data.message);

      closeModal();

      fetchLeaveData();
    }catch(error){
      console.error(error);
      alert("Something went wrong.")
    }
  };

  const handleReject = async (leaveId) => {
    try{
      const token = localStorage.getItem("accessToken");

      const response = await fetch(
        `http://127.0.0.1:8000/api/hr/leaves/${leaveId}/reject`,
        {
          method:"PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if(!response.ok){
        alert(data.message);
        return;
      }

      alert(data.message);

      closeModal();

      fetchLeaveData();
    }catch(error){
      console.error(error);
      alert("Something went wrong.")
    }
  };

  // Summary Cards Data
  const summaryCards = [
    { title: "Total Leave Requests", value: summary?.total || 0, icon: FaLeaf },
    { title: "Pending Requests", value: summary?.pending || 0, icon: FaClock },
    { title: "Approved Requests", value: summary?.approved || 0, icon: FaCheckCircle },
    { title: "Rejected Requests", value: summary?.rejected || 0, icon: FaTimesCircle },
  ];

  // Leave Types
  const leaveTypes = [
    "All Types",
    ...new Set(leaveRequests.map(item => item.leave_type))
  ];

  // Statuses
  const statuses = ["All Status", "Pending", "Approved", "Rejected"];

  // Filtered leaves
  const filteredLeaves = leaveRequests.filter((leave) => {
    const matchesSearch = leave.employee_name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
      
      ||

      leave.employee_id
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesType =
      selectedLeaveType === "" ||
      selectedLeaveType === "All Types" ||
      leave.leave_type === selectedLeaveType;
    const matchesStatus =
      selectedStatus === "" ||
      selectedStatus === "All Status" ||
      leave.status === selectedStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const handleReset = () => {
    setSearchTerm("");
    setSelectedLeaveType("");
    setSelectedStatus("");
  };

  const handleViewDetails = (leave) => {
    setSelectedLeave(leave);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLeave(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Approved":
        return "bg-green-100 text-green-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getActivityColor = (action) => {
    switch (action) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      case "submitted":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };
  console.log(summaryCards);

  if (loading) {
  return <div>Loading...</div>;
  }
  return (
    <div className="space-y-8 px-6 py-8">
      {/* Page Title Section */}
      <div>
        <h1 className="mb-2 text-4xl font-bold text-slate-900">
          Employee Leave Requests
        </h1>
        <p className="text-slate-600">
          Review, approve, and manage employee leave applications.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card, idx) => (
          <div
            key={idx}
            className="rounded-3xl bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg"
          >
            <div className="mb-4 inline-flex rounded-2xl bg-[#F4F0FB] p-3">
              <card.icon className="text-lg text-[#36136E]" />
            </div>
            <p className="mb-1 text-sm text-slate-600">{card.title}</p>
            <p className="text-3xl font-bold text-slate-900">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Filter Section */}
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-bold text-slate-900">Search & Filter</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Search Input */}
          <div className="lg:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Search Employee
            </label>
            <div className="relative">
              <FaSearch className="absolute left-3 top-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Employee name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-slate-900 placeholder-slate-400 outline-none transition-all duration-300 focus:border-[#36136E] focus:ring-2 focus:ring-[#F4F0FB]"
              />
            </div>
          </div>

          {/* Leave Type Dropdown */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Leave Type
            </label>
            <select
              value={selectedLeaveType}
              onChange={(e) => setSelectedLeaveType(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white py-2.5 px-4 text-slate-900 outline-none transition-all duration-300 focus:border-[#36136E] focus:ring-2 focus:ring-[#F4F0FB]"
            >
              {leaveTypes.map((type) => (
                <option key={type} value={type === "All Types" ? "" : type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Status Dropdown */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white py-2.5 px-4 text-slate-900 outline-none transition-all duration-300 focus:border-[#36136E] focus:ring-2 focus:ring-[#F4F0FB]"
            >
              {statuses.map((status) => (
                <option key={status} value={status === "All Status" ? "" : status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            onClick={handleReset}
            className="rounded-2xl border-2 border-slate-300 px-6 py-2.5 font-semibold text-slate-700 transition-all duration-300 hover:border-[#36136E] hover:text-[#36136E]"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Leave Requests Table */}
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-bold text-slate-900">
          Leave Requests ({filteredLeaves.length})
        </h3>

        {/* Desktop Table View */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  Employee Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  Employee ID
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  Leave Type
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  Reason
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  Status
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-slate-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredLeaves.map((leave) => (
                <tr
                  key={leave.id}
                  className="border-b border-slate-100 transition-all duration-300 hover:bg-[#F4F0FB]"
                >
                  <td className="px-4 py-4 text-sm font-semibold text-slate-900">
                    {leave.employee_name}
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-600">
                    {leave.employee_id}
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-900">
                    <div className="flex items-center gap-2">
                      <FaLeaf className="text-[#36136E]" />
                      {leave.leave_type}
                    </div>
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-600">
                    {new Date(leave.start_date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    -{" "}
                    {new Date(leave.end_date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-600">
                    {leave.reason}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
                        leave.status
                      )}`}
                    >
                      {leave.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex justify-center gap-2">

                        {/* view button */}

                        <button
                          onClick={() => handleViewDetails(leave)}
                          className="rounded-lg border border-slate-200 p-2 text-slate-600 transition-all duration-300 hover:border-[#36136E] hover:bg-[#F4F0FB] hover:text-[#36136E]"
                          title="View Details"
                        >
                          <FaEye className="text-sm"/>
                        </button>

                        {leave.status === "Pending" && (
                          <>
                            <button
                              onClick={() => handleApprove(leave.id)}
                              className="rounded-lg border border-slate-200 p-2 text-slate-600 transition-all duration-300 hover:border-red-500 hover:bg-red-50 hover:text-green-600"
                              title="Approve"
                            >
                              <FaCheck className="text-sm"/>
                            </button>

                            <button
                            onClick={() => handleReject(leave.id)}
                              className="rounded-lg border border-slate-200 p-2 text-slate-600 transition-all duration-300 hover:border-red-500 hover:bg-red-50 hover:text-red-600"
                              title="Reject"
                            >
                              <FaTimes className="text-sm"/>
                            </button>
                          </>
                        )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="space-y-4 md:hidden">
          {filteredLeaves.map((leave) => (
            <div
              key={leave.id}
              className="rounded-2xl border border-slate-200 p-4 transition-all duration-300 hover:border-[#36136E] hover:shadow-md"
            >
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <p className="font-semibold text-slate-900">
                    {leave.employee_name}
                  </p>
                  <p className="text-xs text-slate-500">{leave.employee_id}</p>
                </div>
                <span
                  className={`rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(
                    leave.status
                  )}`}
                >
                  {leave.status}
                </span>
              </div>
              <div className="mb-3 space-y-1 text-xs text-slate-600">
                <p className="flex items-center gap-2">
                  <FaLeaf className="text-[#36136E]" />
                  {leave.leave_type}
                </p>
                <p>{leave.reason}</p>
              </div>
              <div className="flex gap-2">
                  <button
                    onClick={() => handleViewDetails(leave)}
                    className="flex-1 rounded-lg bg-[#F4F0FB] py-2 text-sm font-semibold text-[#36136E] hover:bg-[#36136E] hover:text-white"
                  >
                    <FaEye className="inline mr-1"/>
                    View
                  </button>

                  {leave.status === "Pending" && (
                    <>
                      <button 
                      onClick={() => handleApprove(leave.id)}
                      className="flex-1 rounded-lg bg-green-100 py-2 text-sm font-semibold text-green-700 hover:bg-green-600 hover:text-white">
                        <FaCheck className="inline mr-1" />
                        Approve
                      </button>

                      <button 
                      onClick={() => handleReject(leave.id)}
                      className="flex-1 rounded-lg bg-red-100 py-2 text-sm font-semibold text-red-700 hover:bg-red-600 hover:text-white">
                        <FaTimes className="inline mr-1" />
                        Reject
                      </button>
                    </>
                  )}
              </div>
            </div>
          ))}
        </div>

        {filteredLeaves.length === 0 && (
          <div className="py-12 text-center">
            <FaLeaf className="mx-auto mb-4 text-4xl text-slate-300" />
            <p className="text-slate-600">No leave requests found</p>
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          disabled={!previousPage}
          onClick={() => setCurrentPage((prev) => prev-1)}
          className="rounded-xl border px-4 py-2 disabled:opacity-50"
        >
          Previous
        </button>

        <p className="text-sm text-slate-600">
          Page {currentPage}
        </p>

        <button
          disabled={!nextPage}
          onClick={() => setCurrentPage((prev) => prev+1)}
          className="rounded-xl border px-4 py-2 disabled:opacity-50"
        >
            Next
        </button>
      </div>

      {/* Leave Details Modal */}
      {isModalOpen && selectedLeave && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 p-6">
          
          <div className="flex min-h-full items-center justify-center">
              <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl">
                {/* Modal Header */}
                <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
                  <h2 className="text-2xl font-bold text-slate-900">
                    Leave Request Details
                  </h2>
                  <button
                    onClick={closeModal}
                    className="text-slate-500 transition-all duration-300 hover:text-slate-900"
                  >
                    <FaTimes className="text-lg" />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="space-y-6">
                  {/* Employee Information */}
                  <div>
                    <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-slate-700">
                      Employee Information
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-2xl bg-[#F4F0FB] p-4">
                        <p className="mb-1 text-xs font-semibold text-slate-600">
                          <FaUser className="inline mr-2" />
                          Employee Name
                        </p>
                        <p className="text-sm font-semibold text-slate-900">
                          {selectedLeave.employee_name}
                        </p>
                      </div>
                      <div className="rounded-2xl bg-[#F4F0FB] p-4">
                        <p className="mb-1 text-xs font-semibold text-slate-600">
                          Employee ID
                        </p>
                        <p className="text-sm font-semibold text-slate-900">
                          {selectedLeave.employee_id}
                        </p>
                      </div>
                      <div className="rounded-2xl bg-[#F4F0FB] p-4 sm:col-span-2">
                        <p className="mb-1 text-xs font-semibold text-slate-600">
                          <FaBriefcase className="inline mr-2" />
                          Department
                        </p>
                        <p className="text-sm font-semibold text-slate-900">
                          {selectedLeave.department}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Leave Information */}
                  <div>
                    <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-slate-700">
                      Leave Information
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-2xl bg-[#F4F0FB] p-4">
                        <p className="mb-1 text-xs font-semibold text-slate-600">
                          <FaLeaf className="inline mr-2" />
                          Leave Type
                        </p>
                        <p className="text-sm font-semibold text-slate-900">
                          {selectedLeave.leave_type}
                        </p>
                      </div>
                      
                      <div className="rounded-2xl bg-[#F4F0FB] p-4">
                        <p className="mb-1 text-xs font-semibold text-slate-600">
                          <FaCalendarAlt className="inline mr-2" />
                          Start Date
                        </p>
                        <p className="text-sm font-semibold text-slate-900">
                          {new Date(selectedLeave.start_date).toLocaleDateString(
                            "en-US",
                            { year: "numeric", month: "long", day: "numeric" }
                          )}
                        </p>
                      </div>
                      <div className="rounded-2xl bg-[#F4F0FB] p-4">
                        <p className="mb-1 text-xs font-semibold text-slate-600">
                          <FaCalendarAlt className="inline mr-2" />
                          End Date
                        </p>
                        <p className="text-sm font-semibold text-slate-900">
                          {new Date(selectedLeave.end_date).toLocaleDateString(
                            "en-US",
                            { year: "numeric", month: "long", day: "numeric" }
                          )}
                        </p>
                      </div>
                      <div className="rounded-2xl bg-[#F4F0FB] p-4 sm:col-span-2">
                        <p className="mb-1 text-xs font-semibold text-slate-600">
                          <FaFileAlt className="inline mr-2" />
                          Reason
                        </p>
                        <p className="text-sm font-semibold text-slate-900">
                          {selectedLeave.reason}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Approval Information */}
                  <div>
                    <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-slate-700">
                      Status Information
                    </h3>
                    <div className="rounded-2xl bg-[#F4F0FB] p-4">
                      <p className="mb-2 text-xs font-semibold text-slate-600">
                        Current Status
                      </p>
                      <div className="flex items-center gap-3">
                        <span
                          className={`rounded-full px-4 py-2 text-sm font-semibold ${getStatusColor(
                            selectedLeave.status
                          )}`}
                        >
                          {selectedLeave.status}
                        </span>
                        <p className="text-xs text-slate-600">
                          Submitted on{" "}
                          {new Date(selectedLeave.applied_on).toLocaleDateString(
                            "en-US",
                            { year: "numeric", month: "short", day: "numeric" }
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {selectedLeave.status === "Pending" && (
                    <div className="flex gap-3 border-t border-slate-200 pt-6">
                      <button 
                      onClick={() => handleApprove(selectedLeave.id)}
                      className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-green-600 py-3 font-semibold text-white transition-all duration-300 hover:bg-green-700">
                        <FaCheck className="text-lg" />
                        Approve Leave
                      </button>
                      <button 
                      onClick={() => handleReject(selectedLeave.id)}
                      className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-red-600 py-3 font-semibold text-white transition-all duration-300 hover:bg-red-700">
                        <FaTimes className="text-lg" />
                        Reject Leave
                      </button>
                    </div>
                  )}
                  {selectedLeave.status !== "Pending" && (
                    <div className="border-t border-slate-200 pt-6">
                      <button
                        onClick={closeModal}
                        className="w-full rounded-2xl bg-[#36136E] py-3 font-semibold text-white transition-all duration-300 hover:bg-[#4A1D96]"
                      >
                        Close
                      </button>
                    </div>
                  )}
                </div>
              </div>
          </div>
        </div>
      )}

    </div>
  );
}