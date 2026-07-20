import { useEffect, useState } from "react";
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
import WeeklyAttendanceChart from "./WeeklyAttendanceChart";

export default function AttendanceTracking() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [employeeId,setEmployeeId] = useState("");
  const [month,setMonth] = useState("");
  const [year,setYear] = useState("");

  const [weeklyData,setWeeklyData] = useState([]);
  const [attendanceRecords,setAttendanceRecords] = useState([]);
  const [analytics,setAnalytics] = useState({
    attendance_rate: 0,
    average_working_hours:0,
    check_in_employees:0,
  });

  const [summary,setSummary] = useState({
    total_employees:0,
    present_today:0,
    late_today:0,
    absent_today:0,
  })

  const loadAnalytics = async () => {
    const response = await fetch(
      "http://127.0.0.1:8000/api/hr/attendance/analytics/",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    const data = await response.json();
    setAnalytics(data);
  };

  const loadSummary = async () => {
     const response = await fetch(
      "http://127.0.0.1:8000/api/hr/attendance/summary/",
      {
        headers:{
          Authorization:`Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
     );

     const data = await response.json();
     console.log(data);
     setSummary(data);
  };

  const loadAttendanceRecords = async () => {
    const response = await fetch(
      "http://127.0.0.1:8000/api/hr/attendance/list/",
      {
        headers:{
          Authorization:`Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    const data = await response.json();
    console.log(data);
    console.log(Array.isArray(data));
    setAttendanceRecords(data);
  };

  const loadWeeklyGraph = async () => {
    const response = await fetch(
      "http://127.0.0.1:8000/api/hr/attendance/weekly-graph/",
      {
        headers:{
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    const data = await response.json();
    console.log(data);
    setWeeklyData(data);
  };


  useEffect(() => {
    loadAnalytics();
    loadSummary();
    loadAttendanceRecords();
    loadWeeklyGraph();
  },[]);

  const handleGenerateReport = async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/hr/attendance/monthly-report/pdf/?employee_id=${employeeId}&month=${month}&year=${year}`,
      {
        headers:{
          Authorization:`Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    if(!response.ok){
      const data = await response.json();
      alert(data.message);
      return;
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    window.open(url,"_blank");
  };

  
  // Summary Cards Data
  const summaryCards = [
    { title: "Total Employees", value: summary.total_employees, icon: FaUsers },
    { title: "Present Today", value: summary.present_today, icon: FaCheckCircle },
    { title: "Late Arrivals", value: summary.late_today, icon: FaClock },
    { title: "Absent Employees", value: summary.absent_today, icon: FaTimesCircle },
  ];

  // Analytics Data
  const analyticsCards = [
    {
      title: "Attendance Rate",
      value: `${analytics.attendance_rate}%`,
      icon: FaPercent,
      backgroundColor: "bg-blue-100",
      textColor: "text-blue-700",
    },
    {
      title: "Average Working Hours",
      value: `${analytics.average_working_hours}h`,
      icon: FaClock,
      backgroundColor: "bg-green-100",
      textColor: "text-green-700",
    },
    {
      title: "Employees ",
      value: analytics.check_in_employees,
      icon: FaHeartbeat,
      backgroundColor: "bg-purple-100",
      textColor: "text-purple-700",
    },
  ];


  // Departments
  const departments = [
    "All Departments",
    "IT",
    "Human Resources",
    "Finance",
    "Marketing",
    "Operations",
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
    
    return matchesSearch && matchesDepartment ;
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
        case "Late":
          return "bg-orange-100 text-orange-700";
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

            {/* Generate Monthly Report */}

      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-6">
          Monthly Attendance Report
        </h2>

        <div className="grid md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Employee ID"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="border rounded-xl px-4 py-3"
          />

          <select
            value={month}
            onChange={(e)=>setMonth(e.target.value)}
            className="border rounded-xl px-4 py-3"
          >
            <option value="">Month</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>

          </select>

          <select
            value={year}
            onChange={(e) =>setYear(e.target.value)}
            className="border rounded-xl px-4 py-3"
          >
            <option value="">Year</option>
            <option>2025</option>
            <option>2026</option>
          </select>

          <button
            onClick={handleGenerateReport}
            className="flex items-center gap-2 rounded-2xl bg-[#36136E] px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-[#4A1D96] hover:shadow-lg"
          >
              Generate Report
          </button>
        </div>
      </div>

       {/* Weekly Attendance Graph */}

      <div className="rounded-3xl bg-whie p-6 shadow-sm">
        <WeeklyAttendanceChart data={weeklyData}/>
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
                        record.status,
                        "attendance"
                      )}`}
                    >
                      {record.status}
                    </span>
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
                    record.status,
                    "attendance"
                  )}`}
                >
                  {record.status}
                </span>
              </div>
              <div className="mb-3 space-y-2 text-xs text-slate-600">
                <p><strong>Department:</strong> {record.department}</p>
                <p><strong>Check In:</strong> {record.checkIn}</p>
                <p><strong>Check Out:</strong> {record.checkOut}</p>
                <p><strong>Hours Worked:</strong> {record.hoursWorked}</p>
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
    </div>
  );
}