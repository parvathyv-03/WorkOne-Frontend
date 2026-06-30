import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaUserCheck,
  FaUserPlus,
  FaBuilding,
  FaPlus,
  FaFileDownload,
  FaFileExcel,
  FaSearch,
  FaEdit,
  FaTrash,
  FaEye,
  FaPhone,
  FaEnvelope,
  FaBriefcase,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

export default function ManageEmployees() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const navigate = useNavigate();

      // Employee Table Data
  const [employees,setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  },[]);

  // Summary Cards Data
  const summaryCards = [
    { title: "Total Employees", value: employees.length, icon: FaUsers },
    { title: "Active Employees", value: employees.length, icon: FaUserCheck },
    { title: "New Joiners This Month", value: employees.length, icon: FaUserPlus },
    { title: "Departments", value: employees.length , icon: FaBuilding },
  ];

  const fetchEmployees = async () => {
    const token = localStorage.getItem("access");


    const response = await fetch("http://127.0.0.1:8000/api/hr/employees/",{
      headers:{
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if(response.ok){
      setEmployees(data);
    }else{
      setEmployees([]);
    }
  };

  const handleExport = async () => {
    const response = await fetch(
      "http://127.0.0.1:8000/api/hr/employees/export-pdf/",
      {
        headers:{
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    window.open(url,"_blank");
  }

  const recentEmployees = [...employees]
    .sort(
      (a,b) => 
        new Date(b.date_of_joining) - new Date(a.date_of_joining)
    )
    .slice(0,5);

  // Departments
  const departments = [
    "All Departments",
    "IT",
    "Human Resources",
    "Finance",
    "Marketing",
    "Operations",
  ];

  // Designations
  const designations = [
    "All Designations",
    "Senior Developer",
    "Junior Developer",
    "HR Manager",
    "Recruiter",
    "Finance Manager",
    "Accountant",
    "Marketing Executive",
    "Operations Lead",
    "Developer",
  ];

  // Statuses
  const statuses = ["All Status", "Active", "Inactive"];

  // Filtered employees
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      `${emp.first_name} ${emp.last_name}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.employee_id.toLowerCase().includes(searchTerm.toLowerCase());


    const matchesDepartment =
      selectedDepartment === "" ||
      selectedDepartment === "All Departments" ||
      emp.department === selectedDepartment;

    const matchesDesignation =
      selectedDesignation === "" ||
      selectedDesignation === "All Designations" ||
      emp.designation === selectedDesignation;

    const matchesStatus =
      selectedStatus === "" ||
      selectedStatus === "All Status" ||
      emp.status === selectedStatus;

    return matchesSearch && matchesDepartment && matchesDesignation && matchesStatus;
  });

  const handleReset = () => {
    setSearchTerm("");
    setSelectedDepartment("");
    setSelectedDesignation("");
    setSelectedStatus("");
  };

  return (
    <div className="space-y-8 px-6 py-8">
      {/* Page Title Section */}
      <div>
        <h1 className="mb-2 text-4xl font-bold text-slate-900">
          Manage Employees
        </h1>
        <p className="text-slate-600">
          View, search, add, edit, and manage employee records from one
          centralized dashboard.
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

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <button onClick={() => navigate("/hr/employees/addemployee/createemployee")} className="flex items-center gap-2 rounded-2xl bg-[#36136E] px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-[#4A1D96] hover:shadow-lg">
          <FaPlus className="text-lg" />
          Add Employee
        </button>
        <button onClick={handleExport} className="flex items-center gap-2 rounded-2xl border-2 border-[#36136E] px-6 py-3 font-semibold text-[#36136E] transition-all duration-300 hover:bg-[#F4F0FB]">
          <FaFileDownload className="text-lg" />
          Export Employees
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-bold text-slate-900">
          Search & Filter
        </h3>
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
                placeholder="Name, Email, or ID..."
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

          {/* Designation Dropdown */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Designation
            </label>
            <select
              value={selectedDesignation}
              onChange={(e) => setSelectedDesignation(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white py-2.5 px-4 text-slate-900 outline-none transition-all duration-300 focus:border-[#36136E] focus:ring-2 focus:ring-[#F4F0FB]"
            >
              {designations.map((desig) => (
                <option key={desig} value={desig === "All Designations" ? "" : desig}>
                  {desig}
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
          <button className="rounded-2xl bg-[#36136E] px-6 py-2.5 font-semibold text-white transition-all duration-300 hover:bg-[#4A1D96]">
            <FaSearch className="inline mr-2" />
            Search
          </button>
          <button
            onClick={handleReset}
            className="rounded-2xl border-2 border-slate-300 px-6 py-2.5 font-semibold text-slate-700 transition-all duration-300 hover:border-[#36136E] hover:text-[#36136E]"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Employee Table Section */}
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-bold text-slate-900">
          Employee List ({filteredEmployees.length})
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
                  Email
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  Department
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  Designation
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  Joining Date
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
              {filteredEmployees.map((employee) => (
                <tr
                  key={employee.employee_id}
                  className="border-b border-slate-100 transition-all duration-300 hover:bg-[#F4F0FB]"
                  onClick={() => setSelectedEmployee(employee)}
                >
                  <td className="px-4 py-4 text-sm font-semibold text-slate-900">
                    {employee.employee_id}
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-900">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center text-xs font-bold">
                        {employee.first_name}
                      </div>
                      {employee.first_name} {employee.last_name}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-600">
                    {employee.email}
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-900">
                    {employee.department}
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-900">
                    {employee.designation}
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-600">
                    {new Date(employee.date_of_joining).toLocaleDateString(
                      "en-US",
                      { year: "numeric", month: "short", day: "numeric" }
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        employee.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button className="rounded-lg border border-slate-200 p-2 text-slate-600 transition-all duration-300 hover:border-[#36136E] hover:bg-[#F4F0FB] hover:text-[#36136E]">
                        <FaEye className="text-sm" />
                      </button>
                      <button className="rounded-lg border border-slate-200 p-2 text-slate-600 transition-all duration-300 hover:border-[#36136E] hover:bg-[#F4F0FB] hover:text-[#36136E]">
                        <FaEdit className="text-sm" />
                      </button>
                      <button className="rounded-lg border border-slate-200 p-2 text-slate-600 transition-all duration-300 hover:border-red-500 hover:bg-red-50 hover:text-red-500">
                        <FaTrash className="text-sm" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="space-y-4 md:hidden">
          {filteredEmployees.map((employee) => (
            <div
              key={employee.employee_id}
              className="rounded-2xl border border-slate-200 p-4 transition-all duration-300 hover:border-[#36136E] hover:shadow-md"
              onClick={() => setSelectedEmployee(employee)}
            >
              <div className="mb-3 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#36136E] text-sm font-bold text-white">
                    {employee.first_name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">
                      {employee.name}
                    </p>
                    <p className="text-xs text-slate-500">{employee.employee_id}</p>
                  </div>
                </div>
                <span
                  className={`rounded-full px-2 py-1 text-xs font-semibold ${
                    employee.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {employee.status}
                </span>
              </div>
              <div className="mb-3 space-y-1 text-xs text-slate-600">
                <p>{employee.department}</p>
                <p>{employee.designation}</p>
                <p>{employee.email}</p>
              </div>
              <div className="flex justify-end gap-2">
                <button className="rounded-lg bg-[#F4F0FB] p-2 text-[#36136E] transition-all duration-300 hover:bg-[#36136E] hover:text-white">
                  <FaEye className="text-sm" />
                </button>
                <button className="rounded-lg bg-[#F4F0FB] p-2 text-[#36136E] transition-all duration-300 hover:bg-[#36136E] hover:text-white">
                  <FaEdit className="text-sm" />
                </button>
                <button className="rounded-lg bg-red-50 p-2 text-red-500 transition-all duration-300 hover:bg-red-500 hover:text-white">
                  <FaTrash className="text-sm" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredEmployees.length === 0 && (
          <div className="py-12 text-center">
            <FaUsers className="mx-auto mb-4 text-4xl text-slate-300" />
            <p className="text-slate-600">No employees found</p>
          </div>
        )}
      </div>

      {/* Employee Details Card & Recent Employees */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Employee Details Card */}
        {selectedEmployee ? (
          <div className="rounded-3xl bg-white p-6 shadow-sm lg:col-span-2">
            <h3 className="mb-4 text-lg font-bold text-slate-900">
              Employee Profile
            </h3>
            <div className="space-y-4">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#36136E] text-2xl font-bold text-white">
                  {selectedEmployee.first_name[0]}
                  {selectedEmployee.last_name[0]}
                </div>
                <div>
                  <p className="text-xl font-bold text-slate-900">
                    {`${selectedEmployee.first_name} ${selectedEmployee.last_name}`}
                  </p>
                  <p className="text-sm text-slate-600">
                    {selectedEmployee.designation}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-[#F4F0FB] p-4">
                  <p className="mb-1 text-xs font-semibold text-slate-600">
                    Employee ID
                  </p>
                  <p className="font-semibold text-slate-900">
                    {selectedEmployee.employee_id}
                  </p>
                </div>
                <div className="rounded-2xl bg-[#F4F0FB] p-4">
                  <p className="mb-1 text-xs font-semibold text-slate-600">
                    Department
                  </p>
                  <p className="font-semibold text-slate-900">
                    {selectedEmployee.department}
                  </p>
                </div>
                <div className="rounded-2xl bg-[#F4F0FB] p-4">
                  <p className="mb-1 text-xs font-semibold text-slate-600">
                    Email
                  </p>
                  <p className="flex items-center gap-2 font-semibold text-slate-900">
                    <FaEnvelope className="text-[#36136E]" />
                    {selectedEmployee.email}
                  </p>
                </div>
                <div className="rounded-2xl bg-[#F4F0FB] p-4">
                  <p className="mb-1 text-xs font-semibold text-slate-600">
                    Joining Date
                  </p>
                  <p className="flex items-center gap-2 font-semibold text-slate-900">
                    <FaCalendarAlt className="text-[#36136E]" />
                    {new Date(selectedEmployee.date_of_joining).toLocaleDateString(
                      "en-US",
                      { year: "numeric", month: "short", day: "numeric" }
                    )}
                  </p>
                </div>
                <div className="rounded-2xl bg-[#F4F0FB] p-4">
                  <p className="mb-1 text-xs font-semibold text-slate-600">
                    Status
                  </p>
                  <p className="flex items-center gap-2 font-semibold">
                    {selectedEmployee.status === "Active" ? (
                      <>
                        <FaCheckCircle className="text-green-600" />
                        <span className="text-green-600">Active</span>
                      </>
                    ) : (
                      <>
                        <FaTimesCircle className="text-red-600" />
                        <span className="text-red-600">Inactive</span>
                      </>
                    )}
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <button className="w-full rounded-2xl bg-[#36136E] py-3 font-semibold text-white transition-all duration-300 hover:bg-[#4A1D96]">
                  Edit Employee Details
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl bg-white p-6 shadow-sm lg:col-span-2">
            <p className="text-center text-slate-500">
              Select an employee to view details
            </p>
          </div>
        )}

        {/* Recent Employees Section */}
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-bold text-slate-900">
            Recent Joiners
          </h3>
          <div className="space-y-3">
            {recentEmployees.map((emp) => (
              <div
                key={emp.employee_id}
                className="rounded-2xl bg-[#F4F0FB] p-3 transition-all duration-300 hover:shadow-md"
              >
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#36136E] text-xs font-bold text-white">
                    {emp.first_name[0]}
                  </div>
                  <p className="text-sm font-semibold text-slate-900">
                    {emp.first_name} {emp.last_name}
                  </p>
                </div>
                <p className="mb-1 text-xs text-slate-600">{emp.department}</p>
                <p className="mb-2 text-xs text-slate-500">
                  {new Date(emp.date_of_joining).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <span className="inline-block rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                  {emp.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}