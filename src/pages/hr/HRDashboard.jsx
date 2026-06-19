import {
  FaUsers,
  FaCheckCircle,
  FaCalendarAlt,
  FaExclamationTriangle,
  FaUserTie,
  FaBuilding,
  FaBell,
  FaClipboard,
  FaUserCog,
  FaLeaf,
  FaHistory,
  FaChartBar,
  FaBellSlash,
  FaComments,
} from "react-icons/fa";

export default function HRDashboard() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const summaryCards = [
    { title: "Total Employees", value: "124", icon: FaUsers },
    { title: "Today's Attendance", value: "112", icon: FaCheckCircle },
    { title: "Pending Leave Requests", value: "8", icon: FaCalendarAlt },
    { title: "Open Complaints", value: "3", icon: FaExclamationTriangle },
    { title: "Upcoming Interviews", value: "5", icon: FaUserTie },
    { title: "Departments", value: "7", icon: FaBuilding },
  ];

  const departments = [
    { name: "IT Department", count: 35 },
    { name: "HR Department", count: 12 },
    { name: "Finance Department", count: 18 },
    { name: "Marketing Department", count: 22 },
    { name: "Operations Department", count: 37 },
  ];

  const recruitment = [
    { stage: "Applications Received", count: 120 },
    { stage: "Shortlisted", count: 35 },
    { stage: "Interviews Scheduled", count: 15 },
    { stage: "Offers Sent", count: 5 },
  ];

  const notifications = [
    { title: "New Leave Request", message: "John Doe submitted a leave request.", time: "10 minutes ago" },
    { title: "Complaint Escalated", message: "Employee complaint requires review.", time: "1 hour ago" },
    { title: "Payroll Generated", message: "June payroll has been processed.", time: "Today" },
  ];

  

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-3xl bg-white p-6 shadow-md sm:p-8">
        <div>
          <h1 className="text-4xl font-semibold text-slate-900">HR Dashboard</h1>
          <p className="mt-2 text-slate-600">Manage employees, attendance, payroll, recruitment and organizational insights.</p>
        </div>
        <div className="rounded-3xl bg-[#F4F0FB] px-6 py-4 text-center shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#7B6AC4]">Today</p>
          <p className="mt-1 text-lg font-semibold text-[#36136E]">{today}</p>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {summaryCards.map((card) => {
          const IconComponent = card.icon;
          return (
            <div
              key={card.title}
              className="rounded-3xl bg-white p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-[#F4F0FB] text-[#36136E]">
                <IconComponent className="text-lg" />
              </div>
              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{card.title}</p>
              <h2 className="mt-3 text-3xl font-bold text-slate-900">{card.value}</h2>
            </div>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 shadow-md transition hover:shadow-lg">
          <h2 className="mb-6 text-xl font-semibold text-slate-900">Department Overview</h2>
          <div className="space-y-5">
            {departments.map((dept) => (
              <div key={dept.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <p className="font-medium text-slate-700">{dept.name}</p>
                  <span className="rounded-full bg-[#F4F0FB] px-3 py-1 text-xs font-semibold text-[#36136E]">
                    {dept.count} employees
                  </span>
                </div>
                <div className="h-2 rounded-full bg-slate-200">
                  <div
                    className="h-2 rounded-full bg-[#36136E]"
                    style={{ width: `${(dept.count / 37) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-md transition hover:shadow-lg">
          <h2 className="mb-6 text-xl font-semibold text-slate-900">Attendance Overview</h2>
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="relative flex h-56 w-56 items-center justify-center rounded-full bg-[#F4F0FB]">
                <div className="absolute inset-6 rounded-full bg-white" />
                <div className="relative z-10 text-center">
                  <p className="text-5xl font-bold text-[#36136E]">90%</p>
                  <p className="mt-2 text-sm uppercase tracking-[0.18em] text-slate-500">Attendance Rate</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-3xl bg-[#F9F8FF] p-4 text-center">
              <p className="text-2xl font-bold text-slate-900">112</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">Present</p>
            </div>
            <div className="rounded-3xl bg-[#F4F0FB] p-4 text-center">
              <p className="text-2xl font-bold text-slate-900">8</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">Absent</p>
            </div>
            <div className="rounded-3xl bg-[#F4F0FB] p-4 text-center">
              <p className="text-2xl font-bold text-slate-900">4</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">On Leave</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-md transition hover:shadow-lg">
          <h2 className="mb-6 text-xl font-semibold text-slate-900">Recruitment Pipeline</h2>
          <div className="space-y-3">
            {recruitment.map((item, index) => (
              <div
                key={item.stage}
                className="rounded-3xl bg-gradient-to-r from-[#F4F0FB] to-[#F9F8FF] p-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#36136E] text-xs font-bold text-white">
                      {index + 1}
                    </div>
                    <p className="text-sm font-medium text-slate-700">{item.stage}</p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-[#36136E] shadow-sm">
                    {item.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-md transition hover:shadow-lg sm:p-8">
        <h2 className="mb-6 text-2xl font-semibold text-slate-900">Recent Notifications</h2>
        <div className="space-y-4">
          {notifications.map((notif, index) => (
            <div
              key={index}
              className="flex items-start gap-4 rounded-3xl border border-slate-200 bg-[#F9F8FF] p-5 transition hover:border-[#36136E] hover:bg-[#F4F0FB]"
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-[#36136E]/10 text-[#36136E]">
                <FaBell className="text-lg" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-900">{notif.title}</p>
                <p className="mt-1 text-sm text-slate-600">{notif.message}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.16em] text-slate-500">{notif.time}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    
    </div>
  );
}
