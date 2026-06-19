import { useState } from "react";
import {
  FaUsers,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaSearch,
  FaFilter,
  FaCalendarAlt,
  FaCircle,
  FaSignInAlt,
  FaSignOutAlt,
  FaPercent,
  FaHeartbeat,
  FaBell,
  FaExclamationTriangle,
  FaInfoCircle,
  FaUser,
} from "react-icons/fa";

export default function AttendanceTracking() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  // Summary Cards Data
  const summaryCards = [
    { title: "Total Employees", value: "124", icon: FaUsers },
    { title: "Present Today", value: "108", icon: FaCheckCircle },
    { title: "Late Arrivals", value: "7", icon: FaClock },
    { title: "Absent Employees", value: "9", icon: FaTimesCircle },
  ];

  // Attendance Data
  const attendanceRecords = [
    {
      id: "EMP001",
      name: "John Smith",
      department: "IT",
      checkIn: "09:00 AM",
      checkOut: "06:00 PM",
      hoursWorked: "9h",
      attendanceStatus: "Present",
      onlineStatus: "Online",
      punctuality: "On Time",
    },
    {
      id: "EMP002",
      name: "Sarah Wilson",
      department: "HR",
      checkIn: "09:25 AM",
      checkOut: "06:00 PM",
      hoursWorked: "8.5h",
      attendanceStatus: "Present",
      onlineStatus: "Online",
      punctuality: "Late",
    },
    {
      id: "EMP003",
      name: "Michael Brown",
      department: "Finance",
      checkIn: "--",
      checkOut: "--",
      hoursWorked: "0h",
      attendanceStatus: "Absent",
      onlineStatus: "Offline",
      punctuality: "Absent",
    },
    {
      id: "EMP004",
      name: "Emily Davis",
      department: "Marketing",
      checkIn: "09:05 AM",
      checkOut: "05:45 PM",
      hoursWorked: "8.4h",
      attendanceStatus: "Present",
      onlineStatus: "Offline",
      punctuality: "On Time",
    },
    {
      id: "EMP005",
      name: "David Martinez",
      department: "IT",
      checkIn: "08:55 AM",
      checkOut: "06:15 PM",
      hoursWorked: "9.3h",
      attendanceStatus: "Present",
      onlineStatus: "Online",
      punctuality: "On Time",
    },
    {
      id: "EMP006",
      name: "Jessica Anderson",
      department: "Operations",
      checkIn: "09:30 AM",
      checkOut: "06:00 PM",
      hoursWorked: "8.5h",
      attendanceStatus: "Present",
      onlineStatus: "Online",
      punctuality: "Late",
    },
    {
      id: "EMP007",
      name: "Robert Taylor",
      department: "Finance",
      checkIn: "--",
      checkOut: "--",
      hoursWorked: "0h",
      attendanceStatus: "Absent",
      onlineStatus: "Offline",
      punctuality: "Absent",
    },
    {
      id: "EMP008",
      name: "Lisa White",
      department: "HR",
      checkIn: "09:10 AM",
      checkOut: "06:05 PM",
      hoursWorked: "8.9h",
      attendanceStatus: "Present",
      onlineStatus: "Online",
      punctuality: "On Time",
    },
  ];

  // Analytics Data
  const analyticsCards = [
    {
      title: "Attendance Rate",
      value: "92%",
      icon: FaPercent,
      backgroundColor: "bg-blue-100",
      textColor: "text-blue-700",
    },
    {
      title: "Average Working Hours",
      value: "8.6h",
      icon: FaClock,
      backgroundColor: "bg-green-100",
      textColor: "text-green-700",
    },
    {
      title: "Employees Online",
      value: "56",
      icon: FaHeartbeat,
      backgroundColor: "bg-purple-100",
      textColor: "text-purple-700",
    },
  ];

  // Alerts Data
  const alerts = [
    {
      id: 1,
      type: "late",
      message: "Sarah Wilson checked in late by 25 minutes.",
      timestamp: "Today at 9:25 AM",
      icon: FaExclamationTriangle,
    },
    {
      id: 2,
      type: "absent",
      message: "Michael Brown marked absent today.",
      timestamp: "Today at 8:00 AM",
      icon: FaTimesCircle,
    },
    {
      id: 3,
      type: "early",
      message: "Emily Davis checked out early.",
      timestamp: "Today at 5:45 PM",
      icon: FaClock,
    },
    {
      id: 4,
      type: "completed",
      message: "John Smith completed 9 working hours.",
      timestamp: "Today at 6:00 PM",
      icon: FaCheckCircle,
    },
  ];

  // Departments
  const departments = [
    "All Departments",
    "IT",
    "HR",
    "Finance",
    "Marketing",
    "Operations",
  ];

  // Statuses
  const statuses = [
    "All Status",
    "Present",
    "Absent",
    "Late",
    "Online",
    "Offline",
  ];

  // Filtered records
  const filteredRecords = attendanceRecords.filter((record) => {
    const matchesSearch = record.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDepartment =
      selectedDepartment === "" ||
      selectedDepartment === "All Departments" ||
      record.department === selectedDepartment;
    const matchesStatus =
      selectedStatus === "" ||
      selectedStatus === "All Status" ||
      record.attendanceStatus === selectedStatus ||
      record.onlineStatus === selectedStatus ||
      record.punctuality === selectedStatus;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const handleReset = () => {
    setSearchTerm("");
    setSelectedDepartment("");
    setSelectedStatus("");
    setSelectedDate("");
  };

  const getStatusBadgeColor = (status, type) => {
    if (type === "attendance") {
      switch (status) {
        case "Present":
          return "bg-green-100 text-green-700";
        case "Absent":
          return "bg-red-100 text-red-700";
        default:
          return "bg-slate-100 text-slate-700";
      }
    }
    if (type === "online") {
      switch (status) {
        case "Online":
          return "bg-blue-100 text-blue-700";
        case "Offline":
          return "bg-gray-100 text-gray-700";
        default:
          return "bg-slate-100 text-slate-700";
      }
    }
    if (type === "punctuality") {
      switch (status) {
        case "On Time":
          return "bg-green-100 text-green-700";
        case "Late":
          return "bg-orange-100 text-orange-700";
        case "Absent":
          return "bg-red-100 text-red-700";
        default:
          return "bg-slate-100 text-slate-700";
      }
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case "late":
        return "bg-orange-100 text-orange-700";
      case "absent":
        return "bg-red-100 text-red-700";
      case "early":
        return "bg-yellow-100 text-yellow-700";
      case "completed":
        return "bg-green-100 text-green-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="space-y-8 px-6 py-8">
      {/* Page Title Section */}
      <div>
        <div className="mb-2 inline-block rounded-full bg-[#F4F0FB] px-4 py-1">
          <p className="text-sm font-semibold text-[#36136E]">
            Attendance Management
          </p>
        </div>
        <h1 className="mb-2 text-4xl font-bold text-slate-900">
          Attendance Tracking
        </h1>
        <p className="text-slate-600">
          Monitor employee attendance, work hours, status, and punctuality.
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
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

          {/* Department Dropdown */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Department
            </label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white py-2.5 px-4 text-slate-900 outline-none transition-all duration-300 focus:border-[#36136E] focus:ring-2 focus:ring-[#F4F0FB]"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept === "All Departments" ? "" : dept}>
                  {dept}
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

          {/* Date Picker */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Select Date
            </label>
            <div className="relative">
              <FaCalendarAlt className="absolute left-3 top-3.5 text-slate-400" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-slate-900 outline-none transition-all duration-300 focus:border-[#36136E] focus:ring-2 focus:ring-[#F4F0FB]"
              />
            </div>
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

      {/* Attendance Table */}
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-bold text-slate-900">
          Attendance Records ({filteredRecords.length})
        </h3>

        {/* Desktop Table View */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  Employee ID
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  Department
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  Check In
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  Check Out
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  Hours Worked
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  Attendance
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  Online Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  Punctuality
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record) => (
                <tr
                  key={record.id}
                  className="border-b border-slate-100 transition-all duration-300 hover:bg-[#F4F0FB]"
                >
                  <td className="px-4 py-4 text-sm font-semibold text-slate-900">
                    {record.id}
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-900">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#36136E] text-xs font-bold text-white">
                        {record.name.charAt(0)}
                      </div>
                      {record.name}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-600">
                    {record.department}
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-900">
                    <div className="flex items-center gap-2">
                      {record.checkIn !== "--" && (
                        <FaSignInAlt className="text-green-600" />
                      )}
                      {record.checkIn}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-900">
                    <div className="flex items-center gap-2">
                      {record.checkOut !== "--" && (
                        <FaSignOutAlt className="text-red-600" />
                      )}
                      {record.checkOut}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm font-semibold text-slate-900">
                    {record.hoursWorked}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadgeColor(
                        record.attendanceStatus,
                        "attendance"
                      )}`}
                    >
                      {record.attendanceStatus}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <FaCircle
                        className={`text-xs ${
                          record.onlineStatus === "Online"
                            ? "text-blue-600"
                            : "text-gray-400"
                        }`}
                      />
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadgeColor(
                          record.onlineStatus,
                          "online"
                        )}`}
                      >
                        {record.onlineStatus}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadgeColor(
                        record.punctuality,
                        "punctuality"
                      )}`}
                    >
                      {record.punctuality}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="space-y-4 md:hidden">
          {filteredRecords.map((record) => (
            <div
              key={record.id}
              className="rounded-2xl border border-slate-200 p-4 transition-all duration-300 hover:border-[#36136E] hover:shadow-md"
            >
              <div className="mb-3 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#36136E] text-sm font-bold text-white">
                    {record.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">
                      {record.name}
                    </p>
                    <p className="text-xs text-slate-500">{record.id}</p>
                  </div>
                </div>
                <span
                  className={`rounded-full px-2 py-1 text-xs font-semibold ${getStatusBadgeColor(
                    record.attendanceStatus,
                    "attendance"
                  )}`}
                >
                  {record.attendanceStatus}
                </span>
              </div>
              <div className="mb-3 space-y-2 text-xs text-slate-600">
                <p><strong>Department:</strong> {record.department}</p>
                <p><strong>Check In:</strong> {record.checkIn}</p>
                <p><strong>Check Out:</strong> {record.checkOut}</p>
                <p><strong>Hours Worked:</strong> {record.hoursWorked}</p>
                <div className="flex items-center gap-2">
                  <strong>Online:</strong>
                  <FaCircle
                    className={`text-xs ${
                      record.onlineStatus === "Online"
                        ? "text-blue-600"
                        : "text-gray-400"
                    }`}
                  />
                  {record.onlineStatus}
                </div>
                <p><strong>Punctuality:</strong> {record.punctuality}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredRecords.length === 0 && (
          <div className="py-12 text-center">
            <FaUsers className="mx-auto mb-4 text-4xl text-slate-300" />
            <p className="text-slate-600">No attendance records found</p>
          </div>
        )}
      </div>

      {/* Analytics Section */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {analyticsCards.map((card, idx) => (
          <div
            key={idx}
            className="rounded-3xl bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg"
          >
            <div
              className={`mb-4 inline-flex rounded-2xl ${card.backgroundColor} p-3`}
            >
              <card.icon className={`text-lg ${card.textColor}`} />
            </div>
            <p className="mb-2 text-sm text-slate-600">{card.title}</p>
            <p className="text-3xl font-bold text-slate-900">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Attendance Alerts Section */}
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-slate-900">
          <FaBell className="text-[#36136E]" />
          Attendance Alerts
        </h3>

        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="flex items-start gap-4 rounded-2xl border-l-4 border-[#36136E] bg-slate-50 p-4 transition-all duration-300 hover:bg-slate-100"
            >
              <div
                className={`rounded-full p-2.5 flex-shrink-0 ${getAlertColor(
                  alert.type
                )}`}
              >
                <alert.icon className="text-lg" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-900">
                  {alert.message}
                </p>
                <p className="mt-1 text-xs text-slate-500">{alert.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}