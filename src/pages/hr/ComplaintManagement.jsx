import { useState } from "react";
import {
  FaExclamationCircle,
  FaClock,
  FaCheckCircle,
  FaChevronUp,
  FaSearch,
  FaFilter,
  FaEye,
  FaEdit,
  FaTrash,
  FaUser,
  FaBriefcase,
  FaCalendarAlt,
  FaComments,
  FaHistory,
  FaArrowUp,
  FaInfoCircle,
  FaCheck,
} from "react-icons/fa";

export default function ComplaintManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [statusUpdate, setStatusUpdate] = useState("");
  const [complaintsList, setComplaintsList] = useState([
    {
      id: "CMP101",
      employeeName: "John David",
      employeeId: "EMP001",
      type: "Harassment",
      priority: "High",
      status: "Pending",
      description: "Facing workplace harassment from team lead",
      dateSubmitted: "2024-06-15",
      dateUpdated: "2024-06-15",
      department: "IT",
    },
    {
      id: "CMP102",
      employeeName: "Sarah Williams",
      employeeId: "EMP002",
      type: "Discrimination",
      priority: "High",
      status: "In Review",
      description: "Concerns about discriminatory behavior",
      dateSubmitted: "2024-06-10",
      dateUpdated: "2024-06-17",
      department: "HR",
    },
    {
      id: "CMP103",
      employeeName: "Michael Johnson",
      employeeId: "EMP003",
      type: "Work Environment",
      priority: "Medium",
      status: "Pending",
      description: "Poor working conditions in office",
      dateSubmitted: "2024-06-16",
      dateUpdated: "2024-06-16",
      department: "Finance",
    },
    {
      id: "CMP104",
      employeeName: "Emily Brown",
      employeeId: "EMP004",
      type: "Salary",
      priority: "Low",
      status: "Resolved",
      description: "Salary payment discrepancy",
      dateSubmitted: "2024-06-01",
      dateUpdated: "2024-06-14",
      department: "Marketing",
    },
    {
      id: "CMP105",
      employeeName: "David Martinez",
      employeeId: "EMP005",
      type: "Leave Policy",
      priority: "Medium",
      status: "Escalated",
      description: "Dispute regarding leave approval",
      dateSubmitted: "2024-06-12",
      dateUpdated: "2024-06-18",
      department: "IT",
    },
    {
      id: "CMP106",
      employeeName: "Jessica Anderson",
      employeeId: "EMP006",
      type: "Performance Review",
      priority: "Low",
      status: "Resolved",
      description: "Dissatisfied with performance evaluation",
      dateSubmitted: "2024-05-20",
      dateUpdated: "2024-06-05",
      department: "Operations",
    },
    {
      id: "CMP107",
      employeeName: "Robert Taylor",
      employeeId: "EMP007",
      type: "Safety",
      priority: "High",
      status: "Escalated",
      description: "Safety hazards in workplace",
      dateSubmitted: "2024-06-17",
      dateUpdated: "2024-06-18",
      department: "Finance",
    },
    {
      id: "CMP108",
      employeeName: "Lisa White",
      employeeId: "EMP008",
      type: "Benefits",
      priority: "Medium",
      status: "In Review",
      description: "Question about benefits coverage",
      dateSubmitted: "2024-06-14",
      dateUpdated: "2024-06-17",
      department: "HR",
    },
  ]);

  // Recent Activity Data
  const activities = [
    {
      id: 1,
      complaint: "CMP102",
      action: "moved to Resolved",
      timestamp: "2 hours ago",
      icon: FaCheckCircle,
    },
    {
      id: 2,
      complaint: "CMP105",
      action: "escalated",
      timestamp: "4 hours ago",
      icon: FaArrowUp,
    },
    {
      id: 3,
      complaint: "CMP110",
      action: "assigned for review",
      timestamp: "6 hours ago",
      icon: FaUser,
    },
    {
      id: 4,
      complaint: "CMP108",
      action: "status updated to In Review",
      timestamp: "1 day ago",
      icon: FaEdit,
    },
  ];

  // Summary Cards Data
  const summaryCards = [
    { title: "Total Complaints", value: "42", icon: FaExclamationCircle },
    { title: "Pending", value: "8", icon: FaClock },
    { title: "Resolved", value: "28", icon: FaCheckCircle },
    { title: "Escalated", value: "6", icon: FaChevronUp },
  ];

  // Status options
  const statusOptions = ["Pending", "In Review", "Escalated", "Resolved"];
  const priorityOptions = ["All Priority", "Low", "Medium", "High"];
  const statusFilterOptions = ["All Status", "Pending", "In Review", "Escalated", "Resolved"];

  // Filtered complaints
  const filteredComplaints = complaintsList.filter((complaint) => {
    const matchesSearch = complaint.employeeName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "" ||
      selectedStatus === "All Status" ||
      complaint.status === selectedStatus;
    const matchesPriority =
      selectedPriority === "" ||
      selectedPriority === "All Priority" ||
      complaint.priority === selectedPriority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleReset = () => {
    setSearchTerm("");
    setSelectedStatus("");
    setSelectedPriority("");
  };

  const handleUpdateStatus = () => {
    if (statusUpdate && selectedComplaint) {
      const updatedList = complaintsList.map((complaint) =>
        complaint.id === selectedComplaint.id
          ? { ...complaint, status: statusUpdate, dateUpdated: new Date().toISOString().split("T")[0] }
          : complaint
      );
      setComplaintsList(updatedList);
      const updatedComplaint = updatedList.find(c => c.id === selectedComplaint.id);
      setSelectedComplaint(updatedComplaint);
      setStatusUpdate("");
    }
  };

  const handleSelectComplaint = (complaint) => {
    setSelectedComplaint(complaint);
    setStatusUpdate(complaint.status);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "In Review":
        return "bg-blue-100 text-blue-700";
      case "Escalated":
        return "bg-red-100 text-red-700";
      case "Resolved":
        return "bg-green-100 text-green-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700";
      case "Medium":
        return "bg-orange-100 text-orange-700";
      case "Low":
        return "bg-green-100 text-green-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getActivityColor = (action) => {
    if (action.includes("Resolved")) return "bg-green-100 text-green-700";
    if (action.includes("escalated")) return "bg-red-100 text-red-700";
    if (action.includes("assigned")) return "bg-blue-100 text-blue-700";
    return "bg-slate-100 text-slate-700";
  };

  return (
    <div className="space-y-8 px-6 py-8">
      {/* Page Title Section */}
      <div>
        <h1 className="mb-2 text-4xl font-bold text-slate-900">
          Manage Employee Complaints
        </h1>
        <p className="text-slate-600">
          View, track, and resolve employee complaints efficiently.
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
              {statusFilterOptions.map((status) => (
                <option key={status} value={status === "All Status" ? "" : status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Priority Dropdown */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Priority
            </label>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white py-2.5 px-4 text-slate-900 outline-none transition-all duration-300 focus:border-[#36136E] focus:ring-2 focus:ring-[#F4F0FB]"
            >
              {priorityOptions.map((priority) => (
                <option key={priority} value={priority === "All Priority" ? "" : priority}>
                  {priority}
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

      {/* Complaints Table & Details */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Complaints Table Section */}
        <div className="rounded-3xl bg-white p-6 shadow-sm lg:col-span-2">
          <h3 className="mb-4 text-lg font-bold text-slate-900">
            Complaints ({filteredComplaints.length})
          </h3>

          {/* Desktop Table View */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                    Complaint ID
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                    Employee
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                    Priority
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
                {filteredComplaints.map((complaint) => (
                  <tr
                    key={complaint.id}
                    className="border-b border-slate-100 transition-all duration-300 hover:bg-[#F4F0FB] cursor-pointer"
                    onClick={() => handleSelectComplaint(complaint)}
                  >
                    <td className="px-4 py-4 text-sm font-semibold text-slate-900">
                      {complaint.id}
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-900">
                      {complaint.employeeName}
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600">
                      {complaint.type}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getPriorityColor(
                          complaint.priority
                        )}`}
                      >
                        {complaint.priority}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
                          complaint.status
                        )}`}
                      >
                        {complaint.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectComplaint(complaint);
                        }}
                        className="rounded-lg border border-slate-200 p-2 text-slate-600 transition-all duration-300 hover:border-[#36136E] hover:bg-[#F4F0FB] hover:text-[#36136E]"
                      >
                        <FaEye className="text-sm" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="space-y-4 md:hidden">
            {filteredComplaints.map((complaint) => (
              <div
                key={complaint.id}
                onClick={() => handleSelectComplaint(complaint)}
                className="rounded-2xl border border-slate-200 p-4 transition-all duration-300 hover:border-[#36136E] hover:shadow-md cursor-pointer"
              >
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">
                      {complaint.employeeName}
                    </p>
                    <p className="text-xs text-slate-500">{complaint.id}</p>
                  </div>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(
                      complaint.status
                    )}`}
                  >
                    {complaint.status}
                  </span>
                </div>
                <div className="mb-3 space-y-1 text-xs text-slate-600">
                  <p><strong>Type:</strong> {complaint.type}</p>
                  <p><strong>Priority:</strong></p>
                </div>
                <div className="flex gap-2">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-semibold ${getPriorityColor(
                      complaint.priority
                    )}`}
                  >
                    {complaint.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {filteredComplaints.length === 0 && (
            <div className="py-12 text-center">
              <FaExclamationCircle className="mx-auto mb-4 text-4xl text-slate-300" />
              <p className="text-slate-600">No complaints found</p>
            </div>
          )}
        </div>

        {/* Complaint Details & Recent Activity */}
        <div className="space-y-6">
          {/* Complaint Details Card */}
          {selectedComplaint ? (
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold text-slate-900">
                Complaint Details
              </h3>
              <div className="space-y-4">
                {/* Employee Info */}
                <div className="rounded-2xl bg-[#F4F0FB] p-4">
                  <p className="mb-2 text-xs font-semibold text-slate-600">
                    <FaUser className="inline mr-2" />
                    Employee Name
                  </p>
                  <p className="text-sm font-semibold text-slate-900">
                    {selectedComplaint.employeeName}
                  </p>
                </div>

                {/* Complaint Type */}
                <div className="rounded-2xl bg-[#F4F0FB] p-4">
                  <p className="mb-2 text-xs font-semibold text-slate-600">
                    <FaComments className="inline mr-2" />
                    Complaint Type
                  </p>
                  <p className="text-sm font-semibold text-slate-900">
                    {selectedComplaint.type}
                  </p>
                </div>

                {/* Description */}
                <div className="rounded-2xl bg-[#F4F0FB] p-4">
                  <p className="mb-2 text-xs font-semibold text-slate-600">
                    Description
                  </p>
                  <p className="text-sm text-slate-900">
                    {selectedComplaint.description}
                  </p>
                </div>

                {/* Priority */}
                <div className="rounded-2xl bg-[#F4F0FB] p-4">
                  <p className="mb-2 text-xs font-semibold text-slate-600">
                    Priority
                  </p>
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${getPriorityColor(
                      selectedComplaint.priority
                    )}`}
                  >
                    {selectedComplaint.priority}
                  </span>
                </div>

                {/* Date Submitted */}
                <div className="rounded-2xl bg-[#F4F0FB] p-4">
                  <p className="mb-2 text-xs font-semibold text-slate-600">
                    <FaCalendarAlt className="inline mr-2" />
                    Date Submitted
                  </p>
                  <p className="text-sm text-slate-900">
                    {new Date(selectedComplaint.dateSubmitted).toLocaleDateString(
                      "en-US",
                      { year: "numeric", month: "long", day: "numeric" }
                    )}
                  </p>
                </div>

                {/* Status Update Section */}
                <div className="border-t border-slate-200 pt-4">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Update Status
                  </label>
                  <select
                    value={statusUpdate}
                    onChange={(e) => setStatusUpdate(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white py-2.5 px-4 mb-3 text-slate-900 outline-none transition-all duration-300 focus:border-[#36136E] focus:ring-2 focus:ring-[#F4F0FB]"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={handleUpdateStatus}
                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#36136E] py-2.5 font-semibold text-white transition-all duration-300 hover:bg-[#4A1D96]"
                  >
                    <FaCheck className="text-sm" />
                    Update Status
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <p className="text-center text-slate-500">
                Select a complaint to view details
              </p>
            </div>
          )}

          {/* Recent Activity */}
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
              <FaHistory className="text-[#36136E]" />
              Recent Activity
            </h3>
            <div className="space-y-3">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 rounded-2xl border-l-4 border-[#36136E] bg-slate-50 p-3 transition-all duration-300 hover:bg-slate-100"
                >
                  <div
                    className={`rounded-full p-2 flex-shrink-0 ${getActivityColor(
                      activity.action
                    )}`}
                  >
                    <activity.icon className="text-sm" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-900 break-words">
                      Complaint <strong>{activity.complaint}</strong>{" "}
                      {activity.action}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {activity.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}