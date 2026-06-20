import {
  FaBriefcase,
  FaUsers,
  FaCalendarAlt,
  FaCheckCircle,
  FaSearch,
  FaFilter,
  FaEye,
  FaClipboardList,
  FaUpload,
  FaChartLine,
  FaBolt,
  FaUserCheck,
  FaHeart,
  FaFileAlt,
  FaClock,
  FaChartBar,
  FaArrowUp,
} from "react-icons/fa";

export default function RecruitmentInterviews() {
  const summaryCards = [
    {
      title: "Open Positions",
      value: "12",
      icon: FaBriefcase,
      description: "Current active roles",
    },
    {
      title: "Total Applications",
      value: "156",
      icon: FaUsers,
      description: "Applications received",
    },
    {
      title: "Scheduled Interviews",
      value: "18",
      icon: FaCalendarAlt,
      description: "Interviews scheduled",
    },
    {
      title: "Hired Candidates",
      value: "7",
      icon: FaCheckCircle,
      description: "Successful hires",
    },
  ];

  const jobOpenings = [
    {
      role: "Python Django Developer",
      department: "Engineering",
      openings: 3,
      applications: 42,
      status: "Open",
    },
    {
      role: "React Frontend Developer",
      department: "Engineering",
      openings: 2,
      applications: 34,
      status: "Open",
    },
    {
      role: "UI/UX Designer",
      department: "Design",
      openings: 1,
      applications: 18,
      status: "Hiring",
    },
    {
      role: "HR Executive",
      department: "Human Resources",
      openings: 1,
      applications: 20,
      status: "Closed",
    },
    {
      role: "Data Analyst",
      department: "Analytics",
      openings: 2,
      applications: 26,
      status: "Open",
    },
  ];

  const applications = [
    {
      name: "Priya Sharma",
      position: "React Frontend Developer",
      experience: "4 years",
      date: "June 12, 2026",
    },
    {
      name: "Marcus Lee",
      position: "Python Django Developer",
      experience: "5 years",
      date: "June 10, 2026",
    },
    {
      name: "Tanya Patel",
      position: "UI/UX Designer",
      experience: "3 years",
      date: "June 08, 2026",
    },
    {
      name: "Amit Joshi",
      position: "Data Analyst",
      experience: "2 years",
      date: "June 06, 2026",
    },
    {
      name: "Sara Wilson",
      position: "HR Executive",
      experience: "6 years",
      date: "June 05, 2026",
    },
  ];

  const interviews = [
    {
      name: "John Mathew",
      position: "Python Developer",
      date: "June 20, 2026",
      time: "10:30 AM",
      interviewer: "Sarah Wilson",
      status: "Scheduled",
    },
    {
      name: "Anjali Rao",
      position: "React Developer",
      date: "June 21, 2026",
      time: "11:15 AM",
      interviewer: "David Martinez",
      status: "Pending",
    },
    {
      name: "Karan Singh",
      position: "Data Analyst",
      date: "June 22, 2026",
      time: "2:00 PM",
      interviewer: "Emily Davis",
      status: "Scheduled",
    },
    {
      name: "Nina Kapoor",
      position: "UI/UX Designer",
      date: "June 19, 2026",
      time: "9:00 AM",
      interviewer: "Jessica Anderson",
      status: "Completed",
    },
  ];

  const pipelineStages = [
    { stage: "Application Received", count: 156 },
    { stage: "Screening", count: 84 },
    { stage: "Technical Interview", count: 42 },
    { stage: "HR Interview", count: 18 },
    { stage: "Selected", count: 7 },
  ];

  const analytics = [
    {
      title: "Offer Acceptance Rate",
      value: "82%",
      icon: FaArrowUp,
      detail: "Strong candidate fit",
    },
    {
      title: "Interview Success Rate",
      value: "67%",
      icon: FaChartLine,
      detail: "Positive outcomes",
    },
    {
      title: "Average Hiring Time",
      value: "14 Days",
      icon: FaClock,
      detail: "From application to offer",
    },
    {
      title: "Candidate Satisfaction",
      value: "4.6/5",
      icon: FaHeart,
      detail: "Recruitment experience",
    },
  ];

  const quickActions = [
    {
      title: "Create Job Posting",
      icon: FaFileAlt,
    },
    {
      title: "Schedule Interview",
      icon: FaCalendarAlt,
    },
    {
      title: "Export Candidate Report",
      icon: FaUpload,
    },
    {
      title: "View Recruitment Analytics",
      icon: FaChartBar,
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "Open":
        return "bg-green-100 text-green-700";
      case "Hiring":
        return "bg-purple-100 text-[#36136E]";
      case "Closed":
        return "bg-slate-100 text-slate-700";
      case "Scheduled":
        return "bg-blue-100 text-blue-700";
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="space-y-8 px-6 py-8 bg-slate-50">
      <div className="rounded-3xl bg-white p-8 shadow-md">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="mt-4 text-4xl font-bold text-slate-900">
              Recruitment & Interviews Management
            </h1>
            <p className="mt-3 max-w-2xl text-slate-600">
              Manage job openings, applications, interview schedules, and candidate progress from a centralized dashboard.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <div key={card.title} className="rounded-3xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F4F0FB] text-[#36136E]">
              <card.icon className="text-lg" />
            </div>
            <p className="text-sm font-semibold text-slate-600">{card.title}</p>
            <p className="mt-3 text-3xl font-bold text-slate-900">{card.value}</p>
            <p className="mt-2 text-sm text-slate-500">{card.description}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2 rounded-3xl bg-white p-6 shadow-md">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Active Job Openings</h2>
              <p className="mt-2 text-sm text-slate-500">Open roles and application volume.</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-600">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="px-4 py-3">Position</th>
                  <th className="px-4 py-3">Department</th>
                  <th className="px-4 py-3">Openings</th>
                  <th className="px-4 py-3">Applications</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {jobOpenings.map((job) => (
                  <tr key={job.role} className="border-b border-slate-100 transition-all duration-300 hover:bg-[#F4F0FB]">
                    <td className="px-4 py-4 text-slate-900">{job.role}</td>
                    <td className="px-4 py-4">{job.department}</td>
                    <td className="px-4 py-4">{job.openings}</td>
                    <td className="px-4 py-4">{job.applications}</td>
                    <td className="px-4 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadge(job.status)}`}>
                        {job.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-md">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Recent Applications</h3>
              <FaUserCheck className="text-[#36136E]" />
            </div>
            <div className="space-y-4">
              {applications.map((app) => (
                <div key={app.name} className="rounded-3xl bg-[#F4F0FB] p-4 transition-all duration-300 hover:bg-[#F0EBFF]">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{app.name}</p>
                      <p className="mt-1 text-xs text-slate-500">{app.position}</p>
                    </div>
                    <span className="text-xs font-semibold text-slate-500">{app.date}</span>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <span className="rounded-2xl bg-white px-3 py-1 text-xs font-semibold text-slate-700">{app.experience}</span>
                    <button className="rounded-2xl bg-[#36136E] px-4 py-2 text-xs font-semibold text-white transition-all duration-300 hover:bg-[#4A1D96]">
                      View Profile
                    </button>
                    <button className="rounded-2xl border border-[#36136E] bg-white px-4 py-2 text-xs font-semibold text-[#36136E] transition-all duration-300 hover:bg-[#36136E] hover:text-white">
                      Shortlist
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-md">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Upcoming Interviews</h3>
              <FaCalendarAlt className="text-[#36136E]" />
            </div>
            <div className="space-y-4">
              {interviews.map((invite) => (
                <div key={invite.name} className="rounded-3xl bg-[#F4F0FB] p-4 transition-all duration-300 hover:bg-[#F0EBFF]">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{invite.name}</p>
                      <p className="text-xs text-slate-500">{invite.position}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadge(invite.status)}`}>
                      {invite.status}
                    </span>
                  </div>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    <p className="text-xs text-slate-600"><strong>Date:</strong> {invite.date}</p>
                    <p className="text-xs text-slate-600"><strong>Time:</strong> {invite.time}</p>
                    <p className="text-xs text-slate-600 sm:col-span-2"><strong>Interviewer:</strong> {invite.interviewer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2 rounded-3xl bg-white p-6 shadow-md">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Recruitment Pipeline</h3>
            <FaChartBar className="text-[#36136E]" />
          </div>
          <div className="space-y-4">
            {pipelineStages.map((stage) => (
              <div key={stage.stage} className="rounded-3xl bg-[#F4F0FB] p-4 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-semibold text-slate-900">{stage.stage}</p>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700">{stage.count}</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-slate-200">
                  <div className="h-full rounded-full bg-[#36136E]" style={{ width: `${Math.min(100, (stage.count / 156) * 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-md">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Hiring Analytics</h3>
              <FaChartLine className="text-[#36136E]" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {analytics.map((metric) => (
                <div key={metric.title} className="rounded-3xl bg-[#F4F0FB] p-4 shadow-sm">
                  <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#36136E] shadow-sm">
                    <metric.icon className="text-lg" />
                  </div>
                  <p className="text-sm text-slate-500">{metric.title}</p>
                  <p className="mt-2 text-2xl font-bold text-slate-900">{metric.value}</p>
                  <p className="mt-1 text-sm text-slate-500">{metric.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-md">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Quick Actions</h3>
              <FaBolt className="text-[#36136E]" />
            </div>
            <div className="grid gap-4">
              {quickActions.map((action) => (
                <button key={action.title} className="flex items-center justify-between rounded-3xl border border-[#E7E5F1] bg-[#F4F0FB] px-5 py-4 text-left transition-all duration-300 hover:border-[#36136E] hover:bg-[#36136E] hover:text-white">
                  <div>
                    <p className="font-semibold">{action.title}</p>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#36136E] shadow-sm transition-all duration-300 group-hover:bg-white">
                    <action.icon className="text-lg" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}