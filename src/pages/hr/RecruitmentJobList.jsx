import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBriefcase,
  FaCalendarAlt,
  FaCheckCircle,
  FaChevronDown,
  FaEye,
  FaPlus,
  FaRedo,
  FaSearch,
  FaTrash,
  FaUsers,
  FaTimes,
} from "react-icons/fa";

const statusOptions = ["All Jobs", "Open", "Hiring", "Closed"];
const departmentOptions = ["Department", "Engineering", "HR", "Design", "Analytics"];


function statusClasses(status) {
  switch (status) {
    case "Open":
      return "bg-green-100 text-green-700";
    case "Hiring":
      return "bg-purple-100 text-[#36136E]";
    default:
      return "bg-slate-100 text-slate-600";
  }
}

export default function RecruitmentJobList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Jobs");
  const [departmentFilter, setDepartmentFilter] = useState("Department");
  const [jobToDelete, setJobToDelete] = useState(null);
  const [visibleJobs, setVisibleJobs] = useState([]);
  const [loading,setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: "",
    department: "",
    openings: "",
    location: "",
    employmentType: "",
    experience: "",
    salary: "",
    description: "",
    skills: "",
    status: "Open",
  });
  const [formErrors, setFormErrors] = useState({});
  const [summary,setSummary] =useState({
    open_positions:0,
    total_applications:0,
    interviews_scheduled:0,
    hired_candidates:0,
  });

  const filteredJobs = visibleJobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All Jobs" || job.status === statusFilter;
    const matchesDepartment = departmentFilter === "Department" || job.department === departmentFilter;

    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("All Jobs");
    setDepartmentFilter("Department");
  };

  const summaryCards = [
    {
      title: "Open Positions",
      value: summary.open_positions,
      description: "Current active roles",
      icon: FaBriefcase,
    },
    {
      title: "Total Applications",
      value: summary.total_applications,
      description: "Applications received",
      icon: FaUsers,
    },
    {
      title: "Interviews Scheduled",
      value: summary.interviews_scheduled,
      description: "Upcoming interviews",
      icon: FaCalendarAlt,
    },
    {
      title: "Hired Candidates",
      value: summary.hired_candidates,
      description: "Successful hires",
      icon: FaCheckCircle,
    },
  ];

  const loadJobs = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await fetch(
        "http://127.0.0.1:8000/api/recruitment/jobs/",
        {
          headers:{
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if(!response.ok){
        throw new Error("Failed to fetch jobs");
      }

      const data = await response.json();

      setVisibleJobs(data.results);
      setSummary(data.summary);
    }catch(error){
      console.error("Error loading jobs:",error);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  },[]);

const confirmDelete = async () => {
  try{
    const token = localStorage.getItem("accessToken");

    const response = await fetch(
      `http://127.0.0.1:8000/api/recruitment/jobs/${jobToDelete.id}/delete/`,
      {
        method:"DELETE",
        headers:{
          Authorization:`Bearer ${token}`,
        },
      }
    );

    if(!response.ok){
      throw new Error("Failed to delete job.");
    }

    await loadJobs();
    setJobToDelete(null);

  }catch(error){
    console.error(error);
  }
};

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({ ...currentData, [name]: value }));
    setFormErrors((currentErrors) => ({ ...currentErrors, [name]: "" }));
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    setFormErrors({});
  };

  const handleCreateJob = async (event) => {
    event.preventDefault();

  try{
    const token = localStorage.getItem("accessToken");

    const response = await fetch(
      "http://127.0.0.1:8000/api/recruitment/jobs/create/",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formData.jobTitle,
          department: formData.department,
          openings: Number(formData.openings),
          location: formData.location,
          employment_type: formData.employmentType,
          experience_required: formData.experience,
          salary_range: formData.salary,
          description: formData.description,
          skills: formData.skills,
          status: formData.status,
        }),
      }
    );

    const data = await response.json();

    if(!response.ok){
      console.error(data);
      throw new Error("Failed to create job");
    }

    await loadJobs();
    closeCreateModal();

    setFormData({
      jobTitle: "",
      department: "",
      openings: "",
      location: "",
      employmentType: "",
      experience: "",
      salary: "",
      description: "",
      skills: "",
      status: "Open",
    });

  }catch(error){
    console.error(error);
  }
}

  const renderFormField = ({ label, name, error, options, type = "text", placeholder }) => (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-semibold text-slate-700">
        {label}{["jobTitle", "department", "openings", "employmentType"].includes(name) && <span className="text-red-500"> *</span>}
      </label>
      {options ? (
        <select id={name} name={name} value={formData[name]} onChange={handleInputChange} className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#36136E] focus:ring-2 focus:ring-[#36136E]">
          <option value="">Select {label.toLowerCase()}</option>
          {options.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      ) : (
        <input id={name} name={name} type={type} value={formData[name]} onChange={handleInputChange} placeholder={placeholder} className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#36136E] focus:ring-2 focus:ring-[#36136E]" />
      )}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );

  if(loading){
    return(
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-slate-500">Loading jobs..</p>
      </div>
    );
  }

  return (
    <div className="min-h-full space-y-8 bg-white px-6 py-8 text-slate-900">
      <section className="rounded-3xl bg-white p-8 shadow-md">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">Recruitment &amp; Interviews</h1>
            <p className="mt-3 max-w-2xl text-slate-600">
              Manage all recruitment activities, create job openings, monitor applications, and manage hiring progress from one place.
            </p>
          </div>
          <button type="button" onClick={() => setIsCreateModalOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#36136E] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-[#291052] hover:shadow-lg">
            <FaPlus />
            Create Job
          </button>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <div key={card.title} className="rounded-3xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F4F0FB] text-[#36136E]">
              <card.icon />
            </div>
            <p className="text-sm font-semibold text-slate-600">{card.title}</p>
            <p className="mt-3 text-3xl font-bold text-slate-900">{card.value}</p>
            <p className="mt-2 text-sm text-slate-500">{card.description}</p>
          </div>
        ))}
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-md">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
          <label className="relative flex-1">
            <span className="sr-only">Search job title</span>
            <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search job title..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#36136E] focus:ring-2 focus:ring-[#F4F0FB]"
            />
          </label>
          <div className="relative">
            <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400" />
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm text-slate-700 outline-none transition focus:border-[#36136E] sm:min-w-[150px]"
            >
              {statusOptions.map((option) => <option key={option}>{option}</option>)}
            </select>
          </div>
          <div className="relative">
            <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400" />
            <select
              value={departmentFilter}
              onChange={(event) => setDepartmentFilter(event.target.value)}
              className="w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm text-slate-700 outline-none transition focus:border-[#36136E] sm:min-w-[165px]"
            >
              {departmentOptions.map((option) => <option key={option}>{option}</option>)}
            </select>
          </div>
          <button onClick={resetFilters} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-all duration-300 hover:border-[#36136E] hover:text-[#36136E]">
            <FaRedo />
            Refresh
          </button>
        </div>
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-md">
        {filteredJobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <FaBriefcase className="text-5xl text-[#36136E]" />
            <h2 className="mt-5 text-xl font-bold text-slate-900">No job openings found</h2>
            <p className="mt-2 text-sm text-slate-500">Create a new job posting to start recruitment.</p>
            <button type="button" onClick={() => setIsCreateModalOpen(true)} className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[#36136E] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#291052]">
              <FaPlus />
              Create Job
            </button>
          </div>
        ) : (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="border-b border-slate-200 text-sm text-slate-500">
                    <th className="px-4 py-3 font-semibold">Job Title</th>
                    <th className="px-4 py-3 font-semibold">Department</th>
                    <th className="px-4 py-3 font-semibold">Openings</th>
                    <th className="px-4 py-3 font-semibold">Applications</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold">Created Date</th>
                    <th className="px-4 py-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredJobs.map((job) => (
                    <tr key={job.id} className="transition-all duration-300 hover:bg-[#F4F0FB]">
                      <td className="px-4 py-4 font-semibold text-slate-900">{job.title}</td>
                      <td className="px-4 py-4 text-sm text-slate-600">{job.department}</td>
                      <td className="px-4 py-4 text-sm text-slate-600">{job.openings}</td>
                      <td className="px-4 py-4 text-sm text-slate-600">{job.applications}</td>
                      <td className="px-4 py-4"><span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClasses(job.status)}`}>{job.status}</span></td>
                      <td className="px-4 py-4 text-sm text-slate-600">{job.createdDate}</td>
                      <td className="px-4 py-4"><JobActions job={job} onView={() => navigate(`/recruitment/jobs/${job.id}`)} onDelete={() => setJobToDelete(job)} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid gap-4 md:hidden">
              {filteredJobs.map((job) => (
                <article key={job.id} className="rounded-3xl bg-[#F4F0FB] p-5 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-bold text-slate-900">{job.title}</h2>
                      <p className="mt-1 text-sm text-slate-600">{job.department}</p>
                    </div>
                    <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${statusClasses(job.status)}`}>{job.status}</span>
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
                    <div><p className="text-slate-500">Openings</p><p className="mt-1 font-semibold">{job.openings}</p></div>
                    <div><p className="text-slate-500">Applications</p><p className="mt-1 font-semibold">{job.applications}</p></div>
                    <div><p className="text-slate-500">Created Date</p><p className="mt-1 font-semibold">{job.createdDate}</p></div>
                  </div>
                  <div className="mt-5"><JobActions job={job} onView={() => navigate(`/recruitment/jobs/${job.id}`)} onDelete={() => setJobToDelete(job)} /></div>
                </article>
              ))}
            </div>
          </>
        )}
      </section>

      {jobToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-6" role="presentation">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl" role="dialog" aria-modal="true" aria-labelledby="delete-job-title">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="delete-job-title" className="text-xl font-bold text-slate-900">Delete Job</h2>
                <p className="mt-4 text-sm leading-6 text-slate-600">Are you sure you want to permanently remove this job posting?</p>
                <p className="text-sm leading-6 text-slate-600">This action cannot be undone.</p>
              </div>
              <button onClick={() => setJobToDelete(null)} aria-label="Close delete dialog" className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"><FaTimes /></button>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setJobToDelete(null)} className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">Cancel</button>
              <button onClick={confirmDelete} className="rounded-2xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}

      <div className={`fixed inset-0 z-40 flex items-center justify-center bg-slate-900/60 px-4 py-6 transition-opacity duration-300 ${isCreateModalOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}>
        <div className={`max-h-[calc(100vh-3rem)] w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-6 shadow-xl transition-all duration-300 sm:p-8 ${isCreateModalOpen ? "scale-100" : "scale-95"}`} role="dialog" aria-modal="true" aria-labelledby="create-job-title">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id="create-job-title" className="text-2xl font-bold text-slate-900">Create New Job Opening</h2>
              <p className="mt-2 text-sm text-slate-500">Fill in the job details to publish a new recruitment opening.</p>
            </div>
            <button type="button" onClick={closeCreateModal} aria-label="Close create job modal" className="rounded-full p-2 text-slate-400 transition-all duration-300 hover:bg-[#F4F0FB] hover:text-[#36136E]"><FaTimes /></button>
          </div>

          <form onSubmit={handleCreateJob} className="mt-7 space-y-6">
            <div className="grid gap-5 md:grid-cols-2">
              {renderFormField({ label: "Job Title", name: "jobTitle", error: formErrors.jobTitle, placeholder: "e.g. Senior Backend Developer" })}
              {renderFormField({ label: "Department", name: "department", error: formErrors.department, options: ["Engineering", "Human Resources", "Finance", "Marketing", "Design", "Analytics", "Operations"] })}
              {renderFormField({ label: "Number of Openings", name: "openings", type: "number", error: formErrors.openings, placeholder: "e.g. 3" })}
              {renderFormField({ label: "Location", name: "location", placeholder: "e.g. Bengaluru or Remote" })}
              {renderFormField({ label: "Employment Type", name: "employmentType", error: formErrors.employmentType, options: ["Full Time", "Part Time", "Internship", "Contract", "Remote", "Hybrid"] })}
              {renderFormField({ label: "Experience Required", name: "experience", placeholder: "e.g. 1-3 Years" })}
              {renderFormField({ label: "Salary Range", name: "salary", placeholder: "e.g. ₹4 LPA - ₹6 LPA" })}
              {renderFormField({ label: "Job Status", name: "status", options: ["Open", "Hiring", "Closed"] })}
            </div>

            <div>
              <label htmlFor="job-description" className="mb-2 block text-sm font-semibold text-slate-700">Job Description <span className="text-red-500">*</span></label>
              <textarea id="job-description" name="description" value={formData.description} onChange={handleInputChange} placeholder="Enter complete job description..." className="min-h-[150px] w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#36136E] focus:ring-2 focus:ring-[#36136E]" />
              {formErrors.description && <p className="mt-1 text-xs text-red-600">{formErrors.description}</p>}
            </div>

            <div>
              <label htmlFor="required-skills" className="mb-2 block text-sm font-semibold text-slate-700">Required Skills</label>
              <textarea id="required-skills" name="skills" value={formData.skills} onChange={handleInputChange} placeholder={'Python\nDjango\nREST API\nReact\nGit'} className="min-h-[130px] w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#36136E] focus:ring-2 focus:ring-[#36136E]" />
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-100 pt-6">
              <button type="button" onClick={closeCreateModal} className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-600 transition-all duration-300 hover:bg-slate-50">Cancel</button>
              <button type="submit" className="rounded-xl bg-[#36136E] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#291052] hover:shadow-lg">Create Job</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function JobActions({ job, onView, onDelete }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button onClick={onView} className="inline-flex items-center gap-2 rounded-2xl bg-[#36136E] px-3 py-2 text-xs font-semibold text-white transition-all duration-300 hover:bg-[#291052] hover:shadow-lg">
        <FaEye />
        View
      </button>
      <button onClick={onDelete}  className="inline-flex items-center gap-2 rounded-2xl border border-red-300 px-3 py-2 text-xs font-semibold text-red-600 transition-all duration-300 enabled:hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40">
        <FaTrash />
        Delete
      </button>
    </div>
  );
}
