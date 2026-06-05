import { FaUser, FaPhone, FaBriefcase, FaHeartbeat } from "react-icons/fa";
import { useEffect,useState } from "react";

export default function PersonalInfo() {

    const [profile,setProfile] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        console.log(token);
       
        fetch("http://127.0.0.1:8000/api/employee/profile/",{
            headers:{
                Authorization:`Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => setProfile(data))
            .catch((err) => console.log(err));
    },[]);

    if(!profile){
        return <div>Loading...</div>
    }

  const infoSections = [
    {
      title: "Basic Information",
      icon: <FaUser className="text-2xl" />,
      fields: [
        { label: "Employee ID", value: profile.employee_id },
        { label: "Full Name", value: profile.full_name },
        { label: "Date of Birth", value: profile.date_of_birth },
        { label: "Gender", value: profile.gender },
        { label: "Marital Status", value: profile.marital_status },
      ],
    },
    {
      title: "Contact Information",
      icon: <FaPhone className="text-2xl" />,
      fields: [
        { label: "Email Address", value: profile.email },
        { label: "Mobile Number", value: profile.mobile_number  },
        { label: "Alternate Number", value: profile.alternate_number },
        { label: "Current Address", value: profile.current_address },
        { label: "Permanent Address", value: profile.permanent_address  },
      ],
    },
    {
      title: "Employment Information",
      icon: <FaBriefcase className="text-2xl" />,
      fields: [
        { label: "Department", value: profile.department },
        { label: "Designation", value: profile.designation },
        { label: "Employee Type", value: profile.employee_type },
        { label: "Date of Joining", value: profile.date_of_joining },
        { label: "Reporting Manager", value: profile.reporting_manager },
      ],
    },
    {
      title: "Emergency Contact",
      icon: <FaHeartbeat className="text-2xl" />,
      fields: [
        { label: "Contact Person Name", value: profile.emergency_contact_name  },
        { label: "Relationship", value: profile.emergency_relationship },
        { label: "Contact Number", value: profile.emergency_contact_number  },
        { label: "Alternate Contact Number", value: profile.emergency_alternate_number },
      ],
    },
  ];

  return (
    <div className="space-y-8 text-slate-900">
      <div className="rounded-3xl bg-white p-8 shadow-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Employee Profile</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">Personal Information</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              View your personal, contact, employment, and emergency details maintained by the HR department.
            </p>
          </div>
          
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {infoSections.map((section) => (
          <div
            key={section.title}
            className="overflow-hidden rounded-3xl bg-white p-8 shadow-md transition duration-300 hover:shadow-xl"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-blue-50 text-blue-600">
                {section.icon}
              </div>
              <h2 className="text-2xl font-semibold text-slate-900">{section.title}</h2>
            </div>

            <div className="mt-8 space-y-6">
              {section.fields.map((field) => (
                <div key={field.label} className="border-b border-slate-100 pb-6 last:border-b-0 last:pb-0">
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-[0.2em]">{field.label}</p>
                  <p className="mt-2 text-base font-semibold text-slate-900">{field.value}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
