import { useState } from "react";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLeaveType, setSelectedLeaveType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Summary Cards Data
  const summaryCards = [
    { title: "Total Leave Requests", value: "42", icon: FaLeaf },
    { title: "Pending Requests", value: "8", icon: FaClock },
    { title: "Approved Requests", value: "28", icon: FaCheckCircle },
    { title: "Rejected Requests", value: "6", icon: FaTimesCircle },
  ];

  // Leave Requests Data
  const leaveRequests = [
    {
      id: "LR001",
      employeeName: "John David",
      employeeId: "EMP001",
      leaveType: "Casual Leave",
      startDate: "2024-06-20",
      endDate: "2024-06-22",
      duration: 3,
      reason: "Personal work",
      status: "Pending",
      department: "IT",
      submittedDate: "2024-06-15",
    },
    {
      id: "LR002",
      employeeName: "Sarah Williams",
      employeeId: "EMP002",
      leaveType: "Sick Leave",
      startDate: "2024-06-18",
      endDate: "2024-06-18",
      duration: 1,
      reason: "Medical checkup",
      status: "Approved",
      department: "HR",
      submittedDate: "2024-06-17",
    },
    {
      id: "LR003",
      employeeName: "Michael Johnson",
      employeeId: "EMP003",
      leaveType: "Privilege Leave",
      startDate: "2024-07-01",
      endDate: "2024-07-10",
      duration: 10,
      reason: "Family vacation",
      status: "Approved",
      department: "Finance",
      submittedDate: "2024-06-10",
    },
    {
      id: "LR004",
      employeeName: "Emily Brown",
      employeeId: "EMP004",
      leaveType: "Casual Leave",
      startDate: "2024-06-25",
      endDate: "2024-06-26",
      duration: 2,
      reason: "Doctor appointment",
      status: "Rejected",
      department: "Marketing",
      submittedDate: "2024-06-16",
    },
    {
      id: "LR005",
      employeeName: "David Martinez",
      employeeId: "EMP005",
      leaveType: "Sick Leave",
      startDate: "2024-06-19",
      endDate: "2024-06-19",
      duration: 1,
      reason: "Flu symptoms",
      status: "Pending",
      department: "IT",
      submittedDate: "2024-06-18",
    },
    {
      id: "LR006",
      employeeName: "Jessica Anderson",
      employeeId: "EMP006",
      leaveType: "Casual Leave",
      startDate: "2024-06-24",
      endDate: "2024-06-24",
      duration: 1,
      reason: "Personal meeting",
      status: "Approved",
      department: "Operations",
      submittedDate: "2024-06-14",
    },
    {
      id: "LR007",
      employeeName: "Robert Taylor",
      employeeId: "EMP007",
      leaveType: "Privilege Leave",
      startDate: "2024-07-05",
      endDate: "2024-07-12",
      duration: 8,
      reason: "Wedding celebration",
      status: "Pending",
      department: "Finance",
      submittedDate: "2024-06-12",
    },
    {
      id: "LR008",
      employeeName: "Lisa White",
      employeeId: "EMP008",
      leaveType: "Sick Leave",
      startDate: "2024-06-21",
      endDate: "2024-06-21",
      duration: 1,
      reason: "Emergency",
      status: "Rejected",
      department: "HR",
      submittedDate: "2024-06-19",
    },
  ];

  // Recent Activities Data
  const activities = [
    {
      id: 1,
      action: "approved",
      employeeName: "Sarah Williams",
      leaveType: "Sick Leave",
      timestamp: "2 hours ago",
      icon: FaCheckDouble,
    },
    {
      id: 2,
      action: "submitted",
      employeeName: "David Martinez",
      leaveType: "Sick Leave",
      timestamp: "1 hour ago",
      icon: FaFileAlt,
    },
    {
      id: 3,
      action: "rejected",
      employeeName: "Emily Brown",
      leaveType: "Casual Leave",
      timestamp: "3 hours ago",
      icon: FaTimesCircle,
    },
    {
      id: 4,
      action: "approved",
      employeeName: "Michael Johnson",
      leaveType: "Privilege Leave",
      timestamp: "5 hours ago",
      icon: FaCheckDouble,
    },
  ];

  // Leave Types
  const leaveTypes = [
    "All Types",
    "Casual Leave",
    "Sick Leave",
    "Privilege Leave",
  ];

  // Statuses
  const statuses = ["All Status", "Pending", "Approved", "Rejected"];

  // Filtered leaves
  const filteredLeaves = leaveRequests.filter((leave) => {
    const matchesSearch = leave.employeeName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType =
      selectedLeaveType === "" ||
      selectedLeaveType === "All Types" ||
      leave.leaveType === selectedLeaveType;
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
          <button className="flex items-center gap-2 rounded-2xl bg-[#36136E] px-6 py-2.5 font-semibold text-white transition-all duration-300 hover:bg-[#4A1D96]">
            <FaFilter className="text-sm" />
            Filter
          </button>
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
                  Duration
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  Start - End Date
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
                    {leave.employeeName}
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-600">
                    {leave.employeeId}
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-900">
                    <div className="flex items-center gap-2">
                      <FaLeaf className="text-[#36136E]" />
                      {leave.leaveType}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-900">
                    {leave.duration} day{leave.duration > 1 ? "s" : ""}
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-600">
                    {new Date(leave.startDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    -{" "}
                    {new Date(leave.endDate).toLocaleDateString("en-US", {
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
                      {leave.status === "Pending" ? (
                        <>
                          <button
                            onClick={() => handleViewDetails(leave)}
                            className="rounded-lg border border-slate-200 p-2 text-slate-600 transition-all duration-300 hover:border-green-500 hover:bg-green-50 hover:text-green-600"
                            title="Approve"
                          >
                            <FaCheck className="text-sm" />
                          </button>
                          <button
                            onClick={() => handleViewDetails(leave)}
                            className="rounded-lg border border-slate-200 p-2 text-slate-600 transition-all duration-300 hover:border-red-500 hover:bg-red-50 hover:text-red-600"
                            title="Reject"
                          >
                            <FaTimes className="text-sm" />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleViewDetails(leave)}
                          className="rounded-lg border border-slate-200 p-2 text-slate-600 transition-all duration-300 hover:border-[#36136E] hover:bg-[#F4F0FB] hover:text-[#36136E]"
                          title="View Details"
                        >
                          <FaEye className="text-sm" />
                        </button>
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
                    {leave.employeeName}
                  </p>
                  <p className="text-xs text-slate-500">{leave.employeeId}</p>
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
                  {leave.leaveType}
                </p>
                <p>
                  {new Date(leave.startDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  -{" "}
                  {new Date(leave.endDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  ({leave.duration} days)
                </p>
                <p>{leave.reason}</p>
              </div>
              <div className="flex gap-2">
                {leave.status === "Pending" ? (
                  <>
                    <button className="flex-1 rounded-lg bg-green-100 py-2 text-sm font-semibold text-green-700 transition-all duration-300 hover:bg-green-600 hover:text-white">
                      <FaCheck className="inline mr-1" />
                      Approve
                    </button>
                    <button className="flex-1 rounded-lg bg-red-100 py-2 text-sm font-semibold text-red-700 transition-all duration-300 hover:bg-red-600 hover:text-white">
                      <FaTimes className="inline mr-1" />
                      Reject
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleViewDetails(leave)}
                    className="w-full rounded-lg bg-[#F4F0FB] py-2 text-sm font-semibold text-[#36136E] transition-all duration-300 hover:bg-[#36136E] hover:text-white"
                  >
                    <FaEye className="inline mr-1" />
                    View Details
                  </button>
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

      {/* Leave Details Modal */}
      {isModalOpen && selectedLeave && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-2xl">
            {/* Modal Header */}
            <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
              <h2 className="text-2xl font-bold text-slate-900">
                Leave Request Details
              </h2>
              <button
                onClick={closeModal}
                className="text-slate-500 transition-all duration-300 hover:text-slate-900"
              >
                <FaX className="text-lg" />
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
                      {selectedLeave.employeeName}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-[#F4F0FB] p-4">
                    <p className="mb-1 text-xs font-semibold text-slate-600">
                      Employee ID
                    </p>
                    <p className="text-sm font-semibold text-slate-900">
                      {selectedLeave.employeeId}
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
                      {selectedLeave.leaveType}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-[#F4F0FB] p-4">
                    <p className="mb-1 text-xs font-semibold text-slate-600">
                      Duration
                    </p>
                    <p className="text-sm font-semibold text-slate-900">
                      {selectedLeave.duration} day
                      {selectedLeave.duration > 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-[#F4F0FB] p-4">
                    <p className="mb-1 text-xs font-semibold text-slate-600">
                      <FaCalendarAlt className="inline mr-2" />
                      Start Date
                    </p>
                    <p className="text-sm font-semibold text-slate-900">
                      {new Date(selectedLeave.startDate).toLocaleDateString(
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
                      {new Date(selectedLeave.endDate).toLocaleDateString(
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
                      {new Date(selectedLeave.submittedDate).toLocaleDateString(
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
                  <button className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-green-600 py-3 font-semibold text-white transition-all duration-300 hover:bg-green-700">
                    <FaCheck className="text-lg" />
                    Approve Leave
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-red-600 py-3 font-semibold text-white transition-all duration-300 hover:bg-red-700">
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
      )}

      {/* Recent Activity Section */}
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h3 className="mb-6 text-lg font-bold text-slate-900">
          Recent Leave Activities
        </h3>

        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 border-l-4 border-[#36136E] py-2 pl-4 transition-all duration-300 hover:pl-6"
            >
              <div
                className={`rounded-full p-2.5 flex-shrink-0 ${getActivityColor(
                  activity.action
                )}`}
              >
                <activity.icon className="text-lg" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-900">
                  {activity.action === "approved" && (
                    <>Leave approved for <strong>{activity.employeeName}</strong></>
                  )}
                  {activity.action === "rejected" && (
                    <>Leave rejected for <strong>{activity.employeeName}</strong></>
                  )}
                  {activity.action === "submitted" && (
                    <><strong>{activity.leaveType}</strong> request submitted by <strong>{activity.employeeName}</strong></>
                  )}
                </p>
                <p className="mt-1 text-xs text-slate-500">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}