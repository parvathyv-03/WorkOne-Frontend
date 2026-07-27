import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HRNavbar from "../../components/HRNavbar";
import HRSidebar from "../../components/HRSidebar";
import {
  FaArrowLeft,
  FaBriefcase,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaPlus,
  FaSearch,
  FaTimes,
  FaUsers,
} from "react-icons/fa";



export default function RecruitmentJobDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("description");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    status: "Sourced",
  });
  const statusColumns = ["Sourced", "In Progress", "Interview", "Hired", "Rejected"];

    const [job,setJob] = useState(null);
    const [candidates,setCandidates] = useState([]);

    useEffect(() => {
        loadJob();
        loadCandidates();
    },[id]);

    const loadJob = async () => {
        const token = localStorage.getItem("accessToken");

        const response = await fetch(
            `http://127.0.0.1:8000/api/recruitment/jobs/${id}/`,
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        setJob(data);
    }

    const loadCandidates = async () => {
        const token = localStorage.getItem("accessToken");

        const response = await fetch(
            `http://127.0.0.1:8000/api/recruitment/jobs/${id}/candidates/`,
            {
                headers:{
                    Authorization:`Bearer ${token}`,
                },
            }
        );

        const data = await response.json();

        setCandidates(data.results);
    };

    const handleAddCandidate = async (event) => {
        event.preventDefault();

        if(!formData.name.trim() || !formData.email.trim()){
            return;
        }

        try{
            const token = localStorage.getItem("accessToken");

            const response = await fetch(
                `http://127.0.0.1:8000/api/recruitment/jobs/${id}/candidates/`,
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                        Authorization:`Bearer ${token}`,
                    },
                    body:JSON.stringify({
                        name:formData.name.trim(),
                        email:formData.email.trim(),
                        status:formData.status,
                    }),
                }
            );

            const data = await response.json();

            if(!response.ok){
                console.error(data);
                throw new Error("Failed to add candidate");
            }

            await loadCandidates();

            setFormData({
                name:"",
                email:"",
                status:"Sourced",
            });

            setIsModalOpen(false);
        }catch(error){
            console.error(error);
        }
    };

  const filteredCandidates = candidates.filter((candidate) => {
    const query = searchTerm.toLowerCase();
    return (
      candidate.name.toLowerCase().includes(query) ||
      candidate.email.toLowerCase().includes(query)
    );
  });

  const getCandidatesByStatus = (status) =>
    filteredCandidates.filter((candidate) => candidate.status === status);

  const handleStatusChange = async (candidateId,newStatus) => {
    try{
        const token = localStorage.getItem("accessToken");

        const response = await fetch(
            `http://127.0.0.1:8000/api/recruitment/candidates/${candidateId}/status/`,
            {
                method:"PATCH",
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${token}`,
                },
                body:JSON.stringify({
                    status:newStatus,
                }),
            }
        );

        const data = await response.json();

        if(!response.ok){
            console.error(data);
            throw new Error("Failed to update status");
        }

        await loadCandidates();
    }catch(error){
        console.error(error);
    }
  };



  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <HRSidebar />

      <div className="flex-1 min-h-screen">
        <HRNavbar />

        <div className="px-6 py-6 max-w-full space-y-8">
          <div className="rounded-[32px] border border-slate-100 bg-white p-4 shadow-[0_20px_60px_-20px_rgba(54,19,110,0.15)] sm:p-6 lg:p-8">
            <button
              onClick={() => navigate("/hr/recruitment")}
              className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-[#36136E] transition hover:text-[#4c1d95]"
            >
              <FaArrowLeft /> Back to Job List
            </button>

            <div className="mb-6">
              <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">{job?.title}</h1>
            </div>

            <div className="mb-8 flex flex-wrap gap-3 border-b border-slate-200 pb-4">
              <button
                onClick={() => setActiveTab("description")}
                className={`inline-flex items-center gap-2 border-b-2 px-2 pb-3 text-sm font-semibold transition ${
                  activeTab === "description"
                    ? "border-[#36136E] text-[#36136E]"
                    : "border-transparent text-slate-500"
                }`}
              >
                <FaBriefcase className={activeTab === "description" ? "text-[#36136E]" : "text-slate-400"} />
                Job Description
              </button>
              <button
                onClick={() => setActiveTab("candidates")}
                className={`inline-flex items-center gap-2 border-b-2 px-2 pb-3 text-sm font-semibold transition ${
                  activeTab === "candidates"
                    ? "border-[#36136E] text-[#36136E]"
                    : "border-transparent text-slate-500"
                }`}
              >
                <FaUsers className={activeTab === "candidates" ? "text-[#36136E]" : "text-slate-400"} />
                Candidates
              </button>
            </div>

            {activeTab === "description" ? (
              <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-md sm:p-8">
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="space-y-5">
                    <div className="rounded-2xl bg-[#F4F0FB] p-4">
                      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#36136E]">Job Details</p>
                      <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        {[
                          { label: "Job Title", value: job?.title },
                          { label: "Department", value: job?.department },
                          { label: "Location", value: job?.location },
                          { label: "Employment Type", value: job?.employment_type },
                          { label: "Experience Required", value: job?.experience_required },
                          { label: "Salary Range", value: job?.salary_range },
                          { label: "Status", value: job?.status },
                        ].map((item) => (
                          <div key={item.label}>
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{item.label}</p>
                            <p className="mt-1 text-sm font-medium text-slate-800">{item.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-2xl border border-slate-200 p-4">
                      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Required Skills</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {(job.skills || "").split("/n").map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full bg-[#F4F0FB] px-3 py-1 text-sm font-medium text-[#36136E]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-[#FCFAFF] p-5">
                    <div className="flex items-center gap-2 text-[#36136E]">
                      <FaBriefcase />
                      <p className="text-sm font-semibold uppercase tracking-[0.24em]">Description</p>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-slate-600">{job?.description}</p>
                    <div className="mt-6 space-y-3 rounded-2xl bg-white p-4 shadow-sm">
                      <div className="flex items-center gap-3 text-slate-700">
                        <FaMapMarkerAlt className="text-[#36136E]" />
                        <span>{job?.location}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-700">
                        <FaCalendarAlt className="text-[#36136E]" />
                        <span>Posted recently and actively hiring</span>
                      </div>
                    
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-md sm:p-8">
                <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Candidates</h2>
                    <p className="mt-1 text-sm text-slate-500">Track applicants across the hiring pipeline.</p>
                  </div>

                  <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center lg:w-auto lg:justify-end">
                    <label className="relative block w-full sm:w-[280px] lg:w-[320px]">
                      <FaSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        placeholder="Search candidate by name or email..."
                        className="w-full rounded-full border border-slate-200 bg-[#F4F0FB] py-3 pl-10 pr-4 text-sm text-slate-700 outline-none ring-0 transition focus:border-[#36136E]"
                      />
                    </label>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#36136E] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#4c1d95]"
                    >
                      <FaPlus /> Add Candidate
                    </button>
                  </div>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-3 md:gap-5">
                  {statusColumns.map((status) => {
                    const statusCandidates = getCandidatesByStatus(status);

                    return (
                      <div
                        key={status}
                        className="min-w-[280px] flex-1 rounded-[24px] border border-slate-200 bg-[#F4F0FB] p-4 shadow-sm"
                      >
                        <div className="mb-4 flex items-center justify-between">
                          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-700">{status}</h3>
                          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#36136E] shadow-sm">
                            {statusCandidates.length}
                          </span>
                        </div>

                        <div className="space-y-4">
                          {statusCandidates.length === 0 ? (
                            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-4 text-center text-sm text-slate-500">
                              No candidates
                            </div>
                          ) : (
                            statusCandidates.map((candidate) => (
                              <div
                                key={candidate.id}
                                className="w-full rounded-3xl border border-slate-200 bg-white p-4 shadow-md transition-all duration-300 hover:shadow-lg"
                              >
                                <div className="flex items-start gap-3">
                                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#F4F0FB] text-sm font-semibold text-[#36136E]">
                                    {candidate.name.charAt(0)}
                                  </div>
                                  <div className="min-w-0 flex-1 space-y-3">
                                    <div>
                                      <p className="font-semibold text-slate-900">{candidate.name}</p>
                                      <p className="mt-1 overflow-hidden break-words break-all text-sm text-slate-500">
                                        {candidate.email}
                                      </p>
                                    </div>

                                    <div>
                                      <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                                        Status
                                      </label>
                                      <select
                                        value={candidate.status}
                                        onChange={(event) => handleStatusChange(candidate.id, event.target.value)}
                                        className="w-full rounded-2xl border border-slate-200 bg-[#F4F0FB] px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-[#36136E]"
                                      >
                                        {statusColumns.map((option) => (
                                          <option key={option} value={option}>
                                            {option}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4">
              <div className="w-full max-w-lg rounded-[28px] bg-white p-6 shadow-2xl sm:p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">Add Candidate</h3>
                    <p className="mt-1 text-sm text-slate-500">Create a new candidate entry for this role.</p>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                  >
                    <FaTimes />
                  </button>
                </div>

                <form onSubmit={handleAddCandidate} className="mt-6 space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Candidate Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#36136E]"
                      placeholder="Enter candidate name"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Email Address *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#36136E]"
                      placeholder="Enter candidate email"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Status *</label>
                    <select
                      value={formData.status}
                      onChange={(event) => setFormData({ ...formData, status: event.target.value })}
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#36136E]"
                    >
                      {statusColumns.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-full bg-[#36136E] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#4c1d95]"
                    >
                      Add Candidate
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
