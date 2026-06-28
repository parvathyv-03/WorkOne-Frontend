import React, { useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaLock,
  FaUserShield,
  FaIdBadge,
  FaCalendarAlt,
  FaVenusMars,
  FaEnvelope,
  FaPhone,
  FaHome,
  FaBuilding,
  FaBriefcase,
  FaCheckCircle,
  FaTimesCircle,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const initialForm = {
  username: "",
  password: "",
  confirmPassword: "",
  role: "Employee",
  employee_id: "",
  first_name: "",
  last_name: "",
  date_of_birth: "",
  gender: "Male",
  marital_status: "Single",
  email: "",
  mobile_number: "",
  alternate_number: "",
  current_address: "",
  permanent_address: "",
  department: "IT",
  designation: "",
  employee_type: "Full Time",
  date_of_joining: "",
  reporting_manager: "",
  emergency_contact_name: "",
  emergency_relationship: "",
  emergency_contact_number: "",
  emergency_alternate_number: "",
};

const departments = ["IT", "HR", "Finance", "Marketing", "Operations", "Administration"];
const employeeTypes = ["Full Time", "Part Time", "Contract", "Intern"];
const genders = ["Male", "Female", "Other"];
const maritalStatuses = ["Single", "Married", "Divorced", "Widowed"];

export default function CreateEmployee() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validate = () => {
    const validation = {};

    if (!form.username.trim()) validation.username = "Username is required.";
    if (!form.password) validation.password = "Password is required.";
    else if (form.password.length < 8) validation.password = "Password must be at least 8 characters.";
    if (!form.confirmPassword) validation.confirmPassword = "Please confirm your password.";
    else if (form.confirmPassword !== form.password) validation.confirmPassword = "Passwords do not match.";

    if (!form.employee_id.trim()) validation.employee_id = "Employee ID is required.";
    if (!form.first_name.trim()) validation.first_name = "First name is required.";
    if (!form.last_name.trim()) validation.last_name = "Last name is required.";
    if (!form.date_of_birth) validation.date_of_birth = "Date of birth is required.";
    if (!form.gender) validation.gender = "Gender is required.";
    if (!form.marital_status) validation.marital_status = "Marital status is required.";

    if (!form.email.trim()) validation.email = "Email address is required.";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) validation.email = "Enter a valid email address.";
    if (!form.mobile_number.trim()) validation.mobile_number = "Mobile number is required.";
    else if (!/^\d{10,}$/.test(form.mobile_number.replace(/\D/g, ""))) validation.mobile_number = "Enter a valid mobile number with at least 10 digits.";
    if (!form.current_address.trim()) validation.current_address = "Current address is required.";
    if (!form.permanent_address.trim()) validation.permanent_address = "Permanent address is required.";

    if (!form.designation.trim()) validation.designation = "Designation is required.";
    if (!form.date_of_joining) validation.date_of_joining = "Date of joining is required.";
    if (!form.reporting_manager.trim()) validation.reporting_manager = "Reporting manager is required.";

    if (!form.emergency_contact_name.trim()) validation.emergency_contact_name = "Emergency contact name is required.";
    if (!form.emergency_relationship.trim()) validation.emergency_relationship = "Relationship is required.";
    if (!form.emergency_contact_number.trim()) validation.emergency_contact_number = "Contact number is required.";

    setErrors(validation);
    return Object.keys(validation).length === 0;
  };

  const handleReset = () => {
    setForm(initialForm);
    setErrors({});
    setAlertMessage("");
    setAlertType("success");
  };

  const submitForm = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setAlertMessage("");

    const token = localStorage.getItem("token");
    try {
      const response = await fetch("/api/hr/create-employee/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
          employee_id: form.employee_id,
          first_name: form.first_name,
          last_name: form.last_name,
          email: form.email,
          date_of_birth: form.date_of_birth,
          gender: form.gender,
          marital_status: form.marital_status,
          mobile_number: form.mobile_number,
          alternate_number: form.alternate_number,
          current_address: form.current_address,
          permanent_address: form.permanent_address,
          department: form.department,
          designation: form.designation,
          employee_type: form.employee_type,
          date_of_joining: form.date_of_joining,
          reporting_manager: form.reporting_manager,
          emergency_contact_name: form.emergency_contact_name,
          emergency_relationship: form.emergency_relationship,
          emergency_contact_number: form.emergency_contact_number,
          emergency_alternate_number: form.emergency_alternate_number,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const message = errorData?.detail || "Failed to create employee. Please try again.";
        throw new Error(message);
      }

      setAlertType("success");
      setAlertMessage("Employee created successfully.");
      handleReset();
      setTimeout(() => {
        navigate("/hr/employees");
      }, 1000);
    } catch (error) {
      setAlertType("error");
      setAlertMessage(error.message || "Unable to create employee.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F0FB] p-6 md:p-10">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-[#36136E]">Create New Employee</h1>
            <p className="mt-2 text-slate-600">
              Create employee login credentials and complete profile information for onboarding.
            </p>
          </div>
          <span className="inline-flex items-center rounded-full bg-[#F4F0FB] px-4 py-2 text-sm font-semibold text-[#36136E] shadow-sm">
            HR Access Only
          </span>
        </div>

        {alertMessage && (
          <div
            className={`rounded-3xl px-5 py-4 text-sm shadow-sm ${
              alertType === "success"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {alertMessage}
          </div>
        )}

        <form onSubmit={submitForm} className="space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-[#36136E]">Employee Account Credentials</h2>
                <p className="mt-2 text-sm text-slate-500">Set login details for the new employee.</p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Username *</label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#F4F0FB] px-3 py-2">
                  <FaUser className="text-[#36136E]" />
                  <input
                    type="text"
                    value={form.username}
                    onChange={(e) => updateField("username", e.target.value)}
                    className="w-full bg-transparent text-sm outline-none"
                    placeholder="Username"
                  />
                </div>
                {errors.username && <p className="mt-1 text-xs text-red-600">{errors.username}</p>}
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Password *</label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#F4F0FB] px-3 py-2">
                  <FaLock className="text-[#36136E]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => updateField("password", e.target.value)}
                    className="w-full bg-transparent text-sm outline-none"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="text-slate-500 transition hover:text-[#36136E]"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Confirm Password *</label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#F4F0FB] px-3 py-2">
                  <FaLock className="text-[#36136E]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={(e) => updateField("confirmPassword", e.target.value)}
                    className="w-full bg-transparent text-sm outline-none"
                    placeholder="Confirm password"
                  />
                </div>
                {errors.confirmPassword && <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>}
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Role</label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#F4F0FB] px-3 py-2">
                  <FaUserShield className="text-[#36136E]" />
                  <input
                    type="text"
                    value={form.role}
                    readOnly
                    className="w-full bg-transparent text-sm outline-none text-slate-600"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-[#36136E]">Basic Information</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Employee ID *</label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#F4F0FB] px-3 py-2">
                  <FaIdBadge className="text-[#36136E]" />
                  <input
                    type="text"
                    value={form.employee_id}
                    onChange={(e) => updateField("employee_id", e.target.value)}
                    className="w-full bg-transparent text-sm outline-none"
                    placeholder="EMP-000"
                  />
                </div>
                {errors.employee_id && <p className="mt-1 text-xs text-red-600">{errors.employee_id}</p>}
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">First Name *</label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#F4F0FB] px-3 py-2">
                  <FaUser className="text-[#36136E]" />
                  <input
                    type="text"
                    value={form.first_name}
                    onChange={(e) => updateField("first_name", e.target.value)}
                    className="w-full bg-transparent text-sm outline-none"
                    placeholder="First name"
                  />
                </div>
                {errors.first_name && <p className="mt-1 text-xs text-red-600">{errors.first_name}</p>}
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Last Name *</label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#F4F0FB] px-3 py-2">
                  <FaUser className="text-[#36136E]" />
                  <input
                    type="text"
                    value={form.last_name}
                    onChange={(e) => updateField("last_name", e.target.value)}
                    className="w-full bg-transparent text-sm outline-none"
                    placeholder="Last name"
                  />
                </div>
                {errors.last_name && <p className="mt-1 text-xs text-red-600">{errors.last_name}</p>}
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Date of Birth *</label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#F4F0FB] px-3 py-2">
                  <FaCalendarAlt className="text-[#36136E]" />
                  <input
                    type="date"
                    value={form.date_of_birth}
                    onChange={(e) => updateField("date_of_birth", e.target.value)}
                    className="w-full bg-transparent text-sm outline-none"
                  />
                </div>
                {errors.date_of_birth && <p className="mt-1 text-xs text-red-600">{errors.date_of_birth}</p>}
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Gender *</label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#F4F0FB] px-3 py-2">
                  <FaVenusMars className="text-[#36136E]" />
                  <select
                    value={form.gender}
                    onChange={(e) => updateField("gender", e.target.value)}
                    className="w-full bg-transparent text-sm outline-none"
                  >
                    {genders.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </div>
                {errors.gender && <p className="mt-1 text-xs text-red-600">{errors.gender}</p>}
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Marital Status *</label>
                <select
                  value={form.marital_status}
                  onChange={(e) => updateField("marital_status", e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-[#F4F0FB] px-3 py-2 text-sm outline-none"
                >
                  {maritalStatuses.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
                {errors.marital_status && <p className="mt-1 text-xs text-red-600">{errors.marital_status}</p>}
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-[#36136E]">Contact Information</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Email Address *</label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#F4F0FB] px-3 py-2">
                  <FaEnvelope className="text-[#36136E]" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="w-full bg-transparent text-sm outline-none"
                    placeholder="name@company.com"
                  />
                </div>
                {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Mobile Number *</label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#F4F0FB] px-3 py-2">
                  <FaPhone className="text-[#36136E]" />
                  <input
                    type="tel"
                    value={form.mobile_number}
                    onChange={(e) => updateField("mobile_number", e.target.value)}
                    className="w-full bg-transparent text-sm outline-none"
                    placeholder="1234567890"
                  />
                </div>
                {errors.mobile_number && <p className="mt-1 text-xs text-red-600">{errors.mobile_number}</p>}
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Alternate Number</label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#F4F0FB] px-3 py-2">
                  <FaPhone className="text-[#36136E]" />
                  <input
                    type="tel"
                    value={form.alternate_number}
                    onChange={(e) => updateField("alternate_number", e.target.value)}
                    className="w-full bg-transparent text-sm outline-none"
                    placeholder="Optional"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700">Current Address *</label>
                <div className="rounded-2xl border border-slate-200 bg-[#F4F0FB] px-3 py-2">
                  <div className="flex items-center gap-3 text-[#36136E]">
                    <FaHome />
                  </div>
                  <textarea
                    value={form.current_address}
                    onChange={(e) => updateField("current_address", e.target.value)}
                    rows={4}
                    className="mt-2 w-full resize-none bg-transparent text-sm outline-none"
                    placeholder="Current address"
                  />
                </div>
                {errors.current_address && <p className="mt-1 text-xs text-red-600">{errors.current_address}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700">Permanent Address *</label>
                <div className="rounded-2xl border border-slate-200 bg-[#F4F0FB] px-3 py-2">
                  <div className="flex items-center gap-3 text-[#36136E]">
                    <FaHome />
                  </div>
                  <textarea
                    value={form.permanent_address}
                    onChange={(e) => updateField("permanent_address", e.target.value)}
                    rows={4}
                    className="mt-2 w-full resize-none bg-transparent text-sm outline-none"
                    placeholder="Permanent address"
                  />
                </div>
                {errors.permanent_address && <p className="mt-1 text-xs text-red-600">{errors.permanent_address}</p>}
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-[#36136E]">Employment Information</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Department *</label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#F4F0FB] px-3 py-2">
                  <FaBuilding className="text-[#36136E]" />
                  <select
                    value={form.department}
                    onChange={(e) => updateField("department", e.target.value)}
                    className="w-full bg-transparent text-sm outline-none"
                  >
                    {departments.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Designation *</label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#F4F0FB] px-3 py-2">
                  <FaBriefcase className="text-[#36136E]" />
                  <input
                    type="text"
                    value={form.designation}
                    onChange={(e) => updateField("designation", e.target.value)}
                    className="w-full bg-transparent text-sm outline-none"
                    placeholder="Designation"
                  />
                </div>
                {errors.designation && <p className="mt-1 text-xs text-red-600">{errors.designation}</p>}
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Employee Type *</label>
                <select
                  value={form.employee_type}
                  onChange={(e) => updateField("employee_type", e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-[#F4F0FB] px-3 py-2 text-sm outline-none"
                >
                  {employeeTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Date of Joining *</label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#F4F0FB] px-3 py-2">
                  <FaCalendarAlt className="text-[#36136E]" />
                  <input
                    type="date"
                    value={form.date_of_joining}
                    onChange={(e) => updateField("date_of_joining", e.target.value)}
                    className="w-full bg-transparent text-sm outline-none"
                  />
                </div>
                {errors.date_of_joining && <p className="mt-1 text-xs text-red-600">{errors.date_of_joining}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700">Reporting Manager *</label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#F4F0FB] px-3 py-2">
                  <FaUser className="text-[#36136E]" />
                  <input
                    type="text"
                    value={form.reporting_manager}
                    onChange={(e) => updateField("reporting_manager", e.target.value)}
                    className="w-full bg-transparent text-sm outline-none"
                    placeholder="Manager name"
                  />
                </div>
                {errors.reporting_manager && <p className="mt-1 text-xs text-red-600">{errors.reporting_manager}</p>}
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-[#36136E]">Emergency Contact</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Contact Person Name *</label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#F4F0FB] px-3 py-2">
                  <FaUser className="text-[#36136E]" />
                  <input
                    type="text"
                    value={form.emergency_contact_name}
                    onChange={(e) => updateField("emergency_contact_name", e.target.value)}
                    className="w-full bg-transparent text-sm outline-none"
                    placeholder="Contact person"
                  />
                </div>
                {errors.emergency_contact_name && <p className="mt-1 text-xs text-red-600">{errors.emergency_contact_name}</p>}
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Relationship *</label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#F4F0FB] px-3 py-2">
                  <FaUserShield className="text-[#36136E]" />
                  <input
                    type="text"
                    value={form.emergency_relationship}
                    onChange={(e) => updateField("emergency_relationship", e.target.value)}
                    className="w-full bg-transparent text-sm outline-none"
                    placeholder="Relationship"
                  />
                </div>
                {errors.emergency_relationship && <p className="mt-1 text-xs text-red-600">{errors.emergency_relationship}</p>}
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Contact Number *</label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#F4F0FB] px-3 py-2">
                  <FaPhone className="text-[#36136E]" />
                  <input
                    type="tel"
                    value={form.emergency_contact_number}
                    onChange={(e) => updateField("emergency_contact_number", e.target.value)}
                    className="w-full bg-transparent text-sm outline-none"
                    placeholder="Contact number"
                  />
                </div>
                {errors.emergency_contact_number && <p className="mt-1 text-xs text-red-600">{errors.emergency_contact_number}</p>}
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Alternate Contact Number</label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#F4F0FB] px-3 py-2">
                  <FaPhone className="text-[#36136E]" />
                  <input
                    type="tel"
                    value={form.emergency_alternate_number}
                    onChange={(e) => updateField("emergency_alternate_number", e.target.value)}
                    className="w-full bg-transparent text-sm outline-none"
                    placeholder="Alternate number"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-[#F4F0FB] p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-[#36136E]">Employee Summary Preview</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-3xl bg-white p-4 shadow-sm">
                <p className="text-xs uppercase tracking-wider text-slate-500">Employee ID</p>
                <p className="mt-2 text-sm font-semibold text-slate-800">{form.employee_id || "-"}</p>
              </div>
              <div className="rounded-3xl bg-white p-4 shadow-sm">
                <p className="text-xs uppercase tracking-wider text-slate-500">Employee Name</p>
                <p className="mt-2 text-sm font-semibold text-slate-800">{`${form.first_name || "-"} ${form.last_name || ""}`.trim()}</p>
              </div>
              <div className="rounded-3xl bg-white p-4 shadow-sm">
                <p className="text-xs uppercase tracking-wider text-slate-500">Department</p>
                <p className="mt-2 text-sm font-semibold text-slate-800">{form.department}</p>
              </div>
              <div className="rounded-3xl bg-white p-4 shadow-sm">
                <p className="text-xs uppercase tracking-wider text-slate-500">Designation</p>
                <p className="mt-2 text-sm font-semibold text-slate-800">{form.designation || "-"}</p>
              </div>
              <div className="rounded-3xl bg-white p-4 shadow-sm sm:col-span-2 lg:col-span-4">
                <p className="text-xs uppercase tracking-wider text-slate-500">Joining Date</p>
                <p className="mt-2 text-sm font-semibold text-slate-800">{form.date_of_joining || "-"}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={handleReset}
              className="rounded-3xl border border-[#36136E] bg-white px-6 py-3 text-sm font-semibold text-[#36136E] transition hover:bg-[#F4F0FB]"
            >
              Reset Form
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-3xl bg-[#36136E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2c0f5b] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
