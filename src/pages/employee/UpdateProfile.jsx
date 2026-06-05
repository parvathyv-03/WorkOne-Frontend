import { useEffect,useState } from "react";
import { FaUser, FaPhone, FaBriefcase, FaHeartbeat } from "react-icons/fa";

export default function UpdateProfile() {
    
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    fetchProfile();
  },[]);

  const fetchProfile = async () => {
    try {
        const token = localStorage.getItem("accessToken");

        const response = await fetch(
            "http://127.0.0.1:8000/api/employee/profile/",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }
        );

        const data = await response.json();

        setFormData({
            employeeId: data.employee_id,
            fullName: data.full_name,
            dateOfBirth: data.date_of_birth,
            gender: data.gender,
            maritalStatus: data.marital_status,

            email: data.email,
            mobileNumber: data.mobile_number,
            alternateNumber: data.alternate_number,
            currentAddress: data.current_address,
            permanentAddress: data.permanent_address,

            department: data.department,
            designation: data.designation,
            employeeType: data.employee_type,
            dateOfJoining: data.date_of_joining,
            reportingManager: data.reporting_manager,

            emergencyContactName: data.emergency_contact_name,
            relationship: data.emergency_relationship,
            emergencyContactNumber: data.emergency_contact_number,
            alternateEmergencyNumber: data.emergency_alternate_number,
        });
    } catch (error){
        console.log(error);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveChanges = async () => {
    try {
        const token = localStorage.getItem("accessToken");

        const response = await fetch(
            "http://127.0.0.1:8000/api/employee/profile/",
            {
                method:"PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization:`Bearer ${token}`,
                },

                body: JSON.stringify({
                    gender: formData.gender,
                    maritalStatus: formData.maritalStatus,

                    mobile_number: formData.mobileNumber,
                    alternate_number: formData.alternateNumber,
                    current_address: formData.currentAddress,
                    permanent_address: formData.permanentAddress,

                    emergency_contact_name:
                        formData.emergencyContactName,

                    emergency_relationship:
                        formData.relationship,

                    emergency_contact_number:
                        formData.emergencyContactNumber,

                    emergency_alternate_number:
                        formData.alternateEmergencyNumber,
                }),
            }
        );

        if (!response.ok){
            throw new Error("Failed to update profile");
        }

        alert("Profile updated successfully!")
    }   catch(error){
        console.log(error);
        alert("Failed to update profile");
    }
  };

  const handleCancel = () => {
    window.history.back();
  };

  if (!formData){
    return <div>Loading..</div>
  }

  const formSections = [
    {
      title: "Basic Information",
      icon: <FaUser className="text-2xl" />,
      fields: [
        { label: "Employee ID", field: "employeeId", type: "text", readOnly: true },
        { label: "Full Name", field: "fullName", type: "text", readOnly: true },
        { label: "Date of Birth", field: "dateOfBirth", type: "date", readOnly: true },
        { label: "Gender", field: "gender", type: "select", options: ["Male", "Female", "Other"], readOnly: true },
        { label: "Marital Status", field: "maritalStatus", type: "select", options: ["Single", "Married", "Divorced", "Widowed"], readOnly: false },
      ],
    },
    {
      title: "Contact Information",
      icon: <FaPhone className="text-2xl" />,
      fields: [
        { label: "Email Address", field: "email", type: "email", readOnly: true },
        { label: "Mobile Number", field: "mobileNumber", type: "text", readOnly: false },
        { label: "Alternate Number", field: "alternateNumber", type: "text", readOnly: false },
        { label: "Current Address", field: "currentAddress", type: "textarea", readOnly: false },
        { label: "Permanent Address", field: "permanentAddress", type: "textarea", readOnly: false },
      ],
    },
    {
      title: "Employment Information",
      icon: <FaBriefcase className="text-2xl" />,
      fields: [
        { label: "Department", field: "department", type: "text", readOnly: true },
        { label: "Designation", field: "designation", type: "text", readOnly: true },
        { label: "Employee Type", field: "employeeType", type: "select", options: ["Full-Time", "Part-Time", "Contract", "Intern"], readOnly: false },
        { label: "Date of Joining", field: "dateOfJoining", type: "date", readOnly: true },
        { label: "Reporting Manager", field: "reportingManager", type: "text", readOnly: true },
      ],
    },
    {
      title: "Emergency Contact",
      icon: <FaHeartbeat className="text-2xl" />,
      fields: [
        { label: "Contact Person Name", field: "emergencyContactName", type: "text", readOnly: false },
        { label: "Relationship", field: "relationship", type: "text", readOnly: false },
        { label: "Contact Number", field: "emergencyContactNumber", type: "text", readOnly: false },
        { label: "Alternate Contact Number", field: "alternateEmergencyNumber", type: "text", readOnly: false },
      ],
    },
  ];

  return (
    <div className="space-y-8 font-sans text-slate-900">
      <div className="rounded-3xl bg-white p-8 shadow-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Employee Profile</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">Update Profile Details</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Update and maintain your personal, contact, employment, and emergency contact information.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {formSections.map((section) => (
          <div key={section.title} className="overflow-hidden rounded-3xl bg-white p-8 shadow-md transition duration-300 hover:shadow-xl">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-blue-50 text-blue-600">
                {section.icon}
              </div>
              <h2 className="text-2xl font-semibold text-slate-900">{section.title}</h2>
            </div>

            <div className="mt-8 space-y-6">
              {section.fields.map((fieldConfig) => (
                <div key={fieldConfig.field} className="border-b border-slate-100 pb-6 last:border-b-0 last:pb-0">
                  <label className="text-sm font-medium text-slate-500 uppercase tracking-[0.2em]">
                    {fieldConfig.label}
                  </label>

                  {fieldConfig.type === "text" || fieldConfig.type === "email" || fieldConfig.type === "date" ? (
                    <input
                      type={fieldConfig.type}
                      value={formData[fieldConfig.field]}
                      onChange={(e) => handleInputChange(fieldConfig.field, e.target.value)}
                      readOnly={fieldConfig.readOnly}
                      placeholder={`Enter ${fieldConfig.label.toLowerCase()}`}
                      className={`mt-2 w-full rounded-3xl border px-4 py-3 text-base font-medium transition outline-none ${
                        fieldConfig.readOnly
                          ? "border-slate-200 bg-slate-100 text-slate-700 cursor-not-allowed"
                          : "border-slate-200 bg-slate-50 text-slate-900 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                      }`}
                    />
                  ) : fieldConfig.type === "select" ? (
                    <select
                      value={formData[fieldConfig.field]}
                      onChange={(e) => handleInputChange(fieldConfig.field, e.target.value)}
                      className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-medium text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    >
                      {fieldConfig.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : fieldConfig.type === "textarea" ? (
                    <textarea
                      value={formData[fieldConfig.field]}
                      onChange={(e) => handleInputChange(fieldConfig.field, e.target.value)}
                      placeholder={`Enter ${fieldConfig.label.toLowerCase()}`}
                      rows="3"
                      className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-medium text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-4">
        <button
          onClick={handleCancel}
          type="button"
          className="rounded-3xl border border-slate-300 bg-slate-50 px-6 py-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          Cancel
        </button>
        <button
          onClick={handleSaveChanges}
          type="button"
          className="rounded-3xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
