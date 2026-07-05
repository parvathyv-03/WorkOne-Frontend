import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaBriefcase,
  FaBuilding,
  FaCalendarAlt,
  FaEnvelope,
  FaHome,
  FaIdBadge,
  FaPhone,
  FaSave,
  FaSpinner,
  FaUser,
  FaUserShield,
} from "react-icons/fa";

const initialForm = {
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
  username: "",
  role: "Employee",
};

const departments = ["IT", "HR", "Finance", "Marketing", "Operations", "Administration"];
const employeeTypes = ["Full Time", "Part Time", "Contract", "Intern"];
const genders = ["Male", "Female", "Other"];
const maritalStatuses = ["Single", "Married", "Divorced", "Widowed"];


function InputField({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  icon: Icon,
  error,
  readOnly = false,
  required = true,
  isTextArea = false,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
        {required ? " *" : ""}
      </label>
      {isTextArea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={3}
          readOnly={readOnly}
          placeholder={placeholder}
          className="w-full rounded-2xl border border-slate-200 bg-[#F4F0FB] px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-300 focus:border-[#36136E]"
        />
      ) : (
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#F4F0FB] px-3 py-2.5">
          {Icon ? <Icon className="text-[#36136E]" /> : null}
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            placeholder={placeholder}
            className="w-full bg-transparent text-sm text-slate-700 outline-none"
          />
        </div>
      )}
      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}

function SelectField({ label, name, value, onChange, options, error, required = true }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
        {required ? " *" : ""}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-2xl border border-slate-200 bg-[#F4F0FB] px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-300 focus:border-[#36136E]"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}

export default function EditEmployee() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validate = () => {
    const validation = {};

    if (!form.employee_id.trim()) validation.employee_id = "Employee ID is required.";
    if (!form.first_name.trim()) validation.first_name = "First name is required.";
    if (!form.last_name.trim()) validation.last_name = "Last name is required.";
    if (!form.date_of_birth) validation.date_of_birth = "Date of birth is required.";
    if (!form.gender) validation.gender = "Gender is required.";
    if (!form.marital_status) validation.marital_status = "Marital status is required.";

    if (!form.email.trim()) validation.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) validation.email = "Enter a valid email address.";

    if (!form.mobile_number.trim()) validation.mobile_number = "Mobile number is required.";
    else if (!/^\d{10,}$/.test(form.mobile_number.replace(/\D/g, ""))) validation.mobile_number = "Enter a valid mobile number with at least 10 digits.";

    if (form.alternate_number.trim() && !/^\d{10,}$/.test(form.alternate_number.replace(/\D/g, ""))) {
      validation.alternate_number = "Enter a valid alternate phone number.";
    }

    if (!form.current_address.trim()) validation.current_address = "Current address is required.";
    if (!form.permanent_address.trim()) validation.permanent_address = "Permanent address is required.";
    if (!form.department) validation.department = "Department is required.";
    if (!form.designation.trim()) validation.designation = "Designation is required.";
    if (!form.employee_type) validation.employee_type = "Employee type is required.";
    if (!form.date_of_joining) validation.date_of_joining = "Date of joining is required.";
    if (!form.reporting_manager.trim()) validation.reporting_manager = "Reporting manager is required.";
    if (!form.emergency_contact_name.trim()) validation.emergency_contact_name = "Emergency contact name is required.";
    if (!form.emergency_relationship.trim()) validation.emergency_relationship = "Relationship is required.";
    if (!form.emergency_contact_number.trim()) validation.emergency_contact_number = "Emergency contact number is required.";
    if (form.emergency_alternate_number.trim() && !/^\d{10,}$/.test(form.emergency_alternate_number.replace(/\D/g, ""))) {
      validation.emergency_alternate_number = "Enter a valid alternate contact number.";
    }

    setErrors(validation);
    return Object.keys(validation).length === 0;
  };

  useEffect(() => {
    const loadEmployee = async () => {
      setLoading(true);
      setAlertMessage("");

      const token = localStorage.getItem("accessToken");

      try {
        
        const response = await fetch(
            `http://127.0.0.1:8000/api/hr/employees/${id}/`,
            {
                headers:{
                    Authorization:`Bearer ${token}`,
                },
            }
        );

        if(!response.ok){
            throw new Error("Unable to load employee.");
        }
        const data = await response.json();

        setForm(data);

      } catch (error) {

        setAlertType("error");
        setAlertMessage(error.message || "Unable to load employee data.");

      } finally {
        setLoading(false);
      }
    };

    loadEmployee();

  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) return;

    setIsSaving(true);
    setAlertMessage("");

    const token = localStorage.getItem("accessToken");

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/hr/employees/${id}/`,
        {
            method:"PATCH",
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if(!response.ok){
        setErrors(data);

        return;
      }

      setAlertType("success");
      setAlertMessage(data.message)

      setTimeout(() => {
        navigate("/hr/employees");

      },1500);

    } catch (error) {
      setAlertType("error");
      setAlertMessage(error.message || "Unable to update employee.");
    } finally {
      setIsSaving(false);
    }
  };

  const fullName = `${form.first_name} ${form.last_name}`.trim() || "Employee Name";

  return (
    <div className="min-h-screen bg-[#F4F0FB] p-6 md:p-10">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <button
              type="button"
              onClick={() => navigate("/hr/employees/addemployee")}
              className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-[#36136E] transition hover:text-[#4A1D96]"
            >
              <FaArrowLeft />
              Back to Employee List
            </button>
            <h1 className="text-3xl font-semibold text-[#36136E]">Edit Employee</h1>
            <p className="mt-2 text-slate-600">
              Update employee information and maintain accurate employee records.
            </p>
           
          </div>
          <span className="inline-flex items-center rounded-full bg-[#F4F0FB] px-4 py-2 text-sm font-semibold text-[#36136E] shadow-sm">
            HR Access Only
          </span>
        </div>

        {alertMessage ? (
          <div
            className={`rounded-3xl px-5 py-4 text-sm shadow-sm ${
              alertType === "success"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {alertMessage}
          </div>
        ) : null}

        {loading ? (
          <div className="flex items-center justify-center rounded-3xl bg-white p-12 shadow-sm">
            <div className="flex flex-col items-center gap-3 text-[#36136E]">
              <FaSpinner className="animate-spin text-3xl" />
              <p className="text-sm font-semibold">Loading employee details...</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F4F0FB] text-[#36136E]">
                  <FaUser />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-[#36136E]">Basic Information</h2>
                  <p className="text-sm text-slate-500">Core personal details and identity.</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <InputField
                  label="Employee ID"
                  name="employee_id"
                  value={form.employee_id}
                  onChange={(event) => updateField("employee_id", event.target.value)}
                  placeholder="EMP-1024"
                  icon={FaIdBadge}
                  error={errors.employee_id}
                  readOnly
                />
                <InputField
                  label="First Name"
                  name="first_name"
                  value={form.first_name}
                  onChange={(event) => updateField("first_name", event.target.value)}
                  placeholder="First Name"
                  icon={FaUser}
                  error={errors.first_name}
                />
                <InputField
                  label="Last Name"
                  name="last_name"
                  value={form.last_name}
                  onChange={(event) => updateField("last_name", event.target.value)}
                  placeholder="Last Name"
                  icon={FaUser}
                  error={errors.last_name}
                />
                <InputField
                  label="Date of Birth"
                  name="date_of_birth"
                  value={form.date_of_birth}
                  onChange={(event) => updateField("date_of_birth", event.target.value)}
                  type="date"
                  icon={FaCalendarAlt}
                  error={errors.date_of_birth}
                />
                <SelectField
                  label="Gender"
                  name="gender"
                  value={form.gender}
                  onChange={(event) => updateField("gender", event.target.value)}
                  options={genders}
                  error={errors.gender}
                />
                <SelectField
                  label="Marital Status"
                  name="marital_status"
                  value={form.marital_status}
                  onChange={(event) => updateField("marital_status", event.target.value)}
                  options={maritalStatuses}
                  error={errors.marital_status}
                />
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F4F0FB] text-[#36136E]">
                  <FaHome />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-[#36136E]">Contact Information</h2>
                  <p className="text-sm text-slate-500">Email, phone, and address details.</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <InputField
                  label="Email"
                  name="email"
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  type="email"
                  placeholder="name@company.com"
                  icon={FaEnvelope}
                  error={errors.email}
                />
                <InputField
                  label="Mobile Number"
                  name="mobile_number"
                  value={form.mobile_number}
                  onChange={(event) => updateField("mobile_number", event.target.value)}
                  placeholder="9876543210"
                  icon={FaPhone}
                  error={errors.mobile_number}
                />
                <InputField
                  label="Alternate Number"
                  name="alternate_number"
                  value={form.alternate_number}
                  onChange={(event) => updateField("alternate_number", event.target.value)}
                  placeholder="9876543211"
                  icon={FaPhone}
                  error={errors.alternate_number}
                />
                <InputField
                  label="Current Address"
                  name="current_address"
                  value={form.current_address}
                  onChange={(event) => updateField("current_address", event.target.value)}
                  placeholder="Current address"
                  icon={FaHome}
                  error={errors.current_address}
                  isTextArea
                />
                <InputField
                  label="Permanent Address"
                  name="permanent_address"
                  value={form.permanent_address}
                  onChange={(event) => updateField("permanent_address", event.target.value)}
                  placeholder="Permanent address"
                  icon={FaHome}
                  error={errors.permanent_address}
                  isTextArea
                />
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F4F0FB] text-[#36136E]">
                  <FaBriefcase />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-[#36136E]">Employment Information</h2>
                  <p className="text-sm text-slate-500">Department, role, and employment details.</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <SelectField
                  label="Department"
                  name="department"
                  value={form.department}
                  onChange={(event) => updateField("department", event.target.value)}
                  options={departments}
                  error={errors.department}
                />
                <InputField
                  label="Designation"
                  name="designation"
                  value={form.designation}
                  onChange={(event) => updateField("designation", event.target.value)}
                  placeholder="Senior Developer"
                  icon={FaBuilding}
                  error={errors.designation}
                />
                <SelectField
                  label="Employee Type"
                  name="employee_type"
                  value={form.employee_type}
                  onChange={(event) => updateField("employee_type", event.target.value)}
                  options={employeeTypes}
                  error={errors.employee_type}
                />
                <InputField
                  label="Date of Joining"
                  name="date_of_joining"
                  value={form.date_of_joining}
                  onChange={(event) => updateField("date_of_joining", event.target.value)}
                  type="date"
                  icon={FaCalendarAlt}
                  error={errors.date_of_joining}
                />
                <InputField
                  label="Reporting Manager"
                  name="reporting_manager"
                  value={form.reporting_manager}
                  onChange={(event) => updateField("reporting_manager", event.target.value)}
                  placeholder="Manager name"
                  icon={FaUserShield}
                  error={errors.reporting_manager}
                />
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F4F0FB] text-[#36136E]">
                  <FaPhone />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-[#36136E]">Emergency Contact</h2>
                  <p className="text-sm text-slate-500">Next-of-kin and emergency details.</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <InputField
                  label="Emergency Contact Name"
                  name="emergency_contact_name"
                  value={form.emergency_contact_name}
                  onChange={(event) => updateField("emergency_contact_name", event.target.value)}
                  placeholder="Emergency contact"
                  icon={FaUser}
                  error={errors.emergency_contact_name}
                />
                <InputField
                  label="Relationship"
                  name="emergency_relationship"
                  value={form.emergency_relationship}
                  onChange={(event) => updateField("emergency_relationship", event.target.value)}
                  placeholder="Spouse"
                  error={errors.emergency_relationship}
                />
                <InputField
                  label="Emergency Contact Number"
                  name="emergency_contact_number"
                  value={form.emergency_contact_number}
                  onChange={(event) => updateField("emergency_contact_number", event.target.value)}
                  placeholder="9876543212"
                  icon={FaPhone}
                  error={errors.emergency_contact_number}
                />
                <InputField
                  label="Alternate Contact Number"
                  name="emergency_alternate_number"
                  value={form.emergency_alternate_number}
                  onChange={(event) => updateField("emergency_alternate_number", event.target.value)}
                  placeholder="9876543213"
                  icon={FaPhone}
                  error={errors.emergency_alternate_number}
                />
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F4F0FB] text-[#36136E]">
                  <FaUserShield />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-[#36136E]">Account Information</h2>
                  <p className="text-sm text-slate-500">Account access and current status.</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <InputField
                  label="Username"
                  name="username"
                  value={form.username}
                  onChange={(event) => updateField("username", event.target.value)}
                  placeholder="Username"
                  icon={FaUser}
                  error={errors.username}
                  readOnly
                />
                <InputField
                  label="Role"
                  name="role"
                  value={form.role}
                  onChange={(event) => updateField("role", event.target.value)}
                  placeholder="Employee"
                  icon={FaUserShield}
                  error={errors.role}
                  readOnly
                />

              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F4F0FB] text-[#36136E]">
                  <FaIdBadge />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-[#36136E]">Employee Summary</h2>
                  <p className="text-sm text-slate-500">Quick preview of the current employee profile.</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <div className="rounded-2xl bg-[#F4F0FB] p-4">
                  <p className="text-sm text-slate-500">Employee ID</p>
                  <p className="mt-1 font-semibold text-slate-900">{form.employee_id || "N/A"}</p>
                </div>
                <div className="rounded-2xl bg-[#F4F0FB] p-4">
                  <p className="text-sm text-slate-500">Full Name</p>
                  <p className="mt-1 font-semibold text-slate-900">{fullName}</p>
                </div>
                <div className="rounded-2xl bg-[#F4F0FB] p-4">
                  <p className="text-sm text-slate-500">Department</p>
                  <p className="mt-1 font-semibold text-slate-900">{form.department}</p>
                </div>
                <div className="rounded-2xl bg-[#F4F0FB] p-4">
                  <p className="text-sm text-slate-500">Joining Date</p>
                  <p className="mt-1 font-semibold text-slate-900">{form.date_of_joining || "-"}</p>
                </div>
             
              
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-4 md:flex-row md:justify-end">
              <button
                type="button"
                onClick={() => navigate("/hr/employees")}
                className="rounded-3xl border border-[#36136E] bg-white px-6 py-3 font-semibold text-[#36136E] transition-all duration-300 hover:bg-[#F4F0FB]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving || loading}
                className="flex items-center justify-center gap-2 rounded-3xl bg-[#36136E] px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-[#4A1D96] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSaving ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <FaSave />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
