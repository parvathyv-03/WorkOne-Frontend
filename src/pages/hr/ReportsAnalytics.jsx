import {
  FaUsers,
  FaChartLine,
  FaCalendarAlt,
  FaClipboardList,
  FaFileInvoiceDollar,
  FaLayerGroup,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
  FaDownload,
  FaChartBar,
  FaFileExport,
  FaWallet,
  FaBriefcase,
  FaShieldAlt,
} from "react-icons/fa";

export default function ReportsAnalytics() {
  const summaryCards = [
    {
      title: "Total Employees",
      value: "248",
      trend: "+6% from last month",
      icon: FaUsers,
    },
    {
      title: "Attendance Rate",
      value: "92%",
      trend: "+2% from last month",
      icon: FaChartLine,
    },
    {
      title: "Leave Requests This Month",
      value: "34",
      trend: "-8% from last month",
      icon: FaCalendarAlt,
    },
    {
      title: "Open Complaints",
      value: "7",
      trend: "Stable trend",
      icon: FaExclamationTriangle,
    },
    {
      title: "Payroll Processed",
      value: "$412K",
      trend: "+5% month over month",
      icon: FaFileInvoiceDollar,
    },
    {
      title: "Active Departments",
      value: "8",
      trend: "+1 new department",
      icon: FaLayerGroup,
    },
  ];

  const attendanceOverview = [
    { label: "Present", value: 72, color: "bg-green-500" },
    { label: "Absent", value: 12, color: "bg-red-500" },
    { label: "Late Entries", value: 9, color: "bg-orange-500" },
    { label: "Work From Home", value: 7, color: "bg-purple-500" },
  ];

  const leaveAnalytics = [
    { label: "Casual Leave Usage", value: 48, color: "bg-violet-600" },
    { label: "Sick Leave Usage", value: 28, color: "bg-sky-500" },
    { label: "Privilege Leave Usage", value: 18, color: "bg-pink-500" },
    { label: "Pending Leave Requests", value: 12, color: "bg-yellow-500" },
  ];

  const departmentPerformance = [
    { department: "Engineering", employees: 64, attendance: 94, rating: "A+" },
    { department: "HR", employees: 18, attendance: 90, rating: "A" },
    { department: "Finance", employees: 22, attendance: 91, rating: "A" },
    { department: "Marketing", employees: 30, attendance: 88, rating: "B+" },
    { department: "Operations", employees: 28, attendance: 93, rating: "A" },
  ];

  const complaintAnalytics = [
    { label: "Total Complaints", value: "46", percent: "100%", icon: FaClipboardList },
    { label: "Resolved", value: "32", percent: "70%", icon: FaCheckCircle },
    { label: "Pending", value: "9", percent: "20%", icon: FaTimesCircle },
    { label: "Escalated", value: "5", percent: "10%", icon: FaExclamationTriangle },
  ];

  const payrollAnalytics = [
    { label: "Total Salary Processed", value: "$412K", icon: FaWallet },
    { label: "Total Bonuses", value: "$32K", icon: FaBriefcase },
    { label: "Total Deductions", value: "$34K", icon: FaShieldAlt },
    { label: "Payslips Generated", value: "122", icon: FaFileInvoiceDollar },
  ];

  const exportReports = [
    { label: "Export Attendance Report", icon: FaFileExport },
    { label: "Export Leave Report", icon: FaFileExport },
    { label: "Export Payroll Report", icon: FaFileExport },
    { label: "Export Employee Report", icon: FaFileExport },
    { label: "Export Complaint Report", icon: FaFileExport },
  ];

  const recentReports = [
    {
      name: "Monthly Attendance Summary",
      date: "June 19, 2026",
      by: "HR Analytics",
      status: "Ready",
    },
    {
      name: "Leave Balance Report",
      date: "June 18, 2026",
      by: "Payroll Team",
      status: "Ready",
    },
    {
      name: "Payroll Audit Export",
      date: "June 17, 2026",
      by: "Finance Lead",
      status: "Processing",
    },
    {
      name: "Department Performance"
      ,date: "June 16, 2026",
      by: "HR Analytics",
      status: "Ready",
    },
    {
      name: "Complaints Resolution Summary",
      date: "June 15, 2026",
      by: "Compliance",
      status: "Ready",
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "Ready":
        return "bg-green-100 text-green-700";
      case "Processing":
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
            <h1 className="text-4xl font-bold text-slate-900">Reports & Analytics</h1>
            <p className="mt-3 max-w-3xl text-slate-600">
              Monitor workforce performance, attendance trends, leave analytics, and organizational insights.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        {summaryCards.map((card) => (
          <div key={card.title} className="rounded-3xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F4F0FB] text-[#36136E]">
              <card.icon className="text-lg" />
            </div>
            <p className="text-sm font-semibold text-slate-600">{card.title}</p>
            <p className="mt-3 text-3xl font-bold text-slate-900">{card.value}</p>
            <p className="mt-2 text-sm text-slate-500">{card.trend}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2 rounded-3xl bg-white p-6 shadow-md">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Monthly Attendance Overview</h2>
              <p className="mt-2 text-sm text-slate-500">Attendance distribution across the workforce.</p>
            </div>
            <FaChartBar className="text-[#36136E] text-2xl" />
          </div>
          <div className="space-y-5">
            {attendanceOverview.map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
                  <p>{item.label}</p>
                  <p>{item.value}%</p>
                </div>
                <div className="h-3 rounded-full bg-slate-100">
                  <div className={`${item.color} h-full rounded-full`} style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-md">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Leave Analytics</h2>
              <p className="mt-2 text-sm text-slate-500">Leave breakdown and pending requests.</p>
            </div>
            <FaCalendarAlt className="text-[#36136E] text-2xl" />
          </div>
          <div className="space-y-5">
            {leaveAnalytics.map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
                  <p>{item.label}</p>
                  <p>{item.value}%</p>
                </div>
                <div className="h-3 rounded-full bg-slate-100">
                  <div className={`${item.color} h-full rounded-full`} style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2 rounded-3xl bg-white p-6 shadow-md">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Department Performance</h2>
              <p className="mt-2 text-sm text-slate-500">Attendance and ratings by department.</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-600">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="px-4 py-3">Department Name</th>
                  <th className="px-4 py-3">Employees</th>
                  <th className="px-4 py-3">Attendance %</th>
                  <th className="px-4 py-3">Performance Rating</th>
                </tr>
              </thead>
              <tbody>
                {departmentPerformance.map((item) => (
                  <tr key={item.department} className="border-b border-slate-100 transition-all duration-300 hover:bg-[#F4F0FB]">
                    <td className="px-4 py-4 text-slate-900">{item.department}</td>
                    <td className="px-4 py-4">{item.employees}</td>
                    <td className="px-4 py-4">{item.attendance}%</td>
                    <td className="px-4 py-4 font-semibold text-slate-900">{item.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-md">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Complaint Analytics</h2>
              <FaTimesCircle className="text-[#36136E] text-2xl" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {complaintAnalytics.map((item) => (
                <div key={item.label} className="rounded-3xl bg-[#F4F0FB] p-4 shadow-sm">
                  <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#36136E]">
                    <item.icon className="text-lg" />
                  </div>
                  <p className="text-sm text-slate-500">{item.label}</p>
                  <p className="mt-2 text-2xl font-bold text-slate-900">{item.value}</p>
                  <p className="mt-1 text-sm text-slate-500">{item.percent}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-md">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Payroll Analytics</h2>
              <FaWallet className="text-[#36136E] text-2xl" />
            </div>
            <div className="grid gap-4">
              {payrollAnalytics.map((item) => (
                <div key={item.label} className="rounded-3xl bg-[#F4F0FB] p-4 shadow-sm">
                  <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#36136E]">
                    <item.icon className="text-lg" />
                  </div>
                  <p className="text-sm text-slate-500">{item.label}</p>
                  <p className="mt-2 text-2xl font-bold text-slate-900">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2 rounded-3xl bg-white p-6 shadow-md">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Recent Reports</h2>
              <p className="mt-2 text-sm text-slate-500">Latest generated HR reports ready for download.</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-600">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="px-4 py-3">Report Name</th>
                  <th className="px-4 py-3">Generated Date</th>
                  <th className="px-4 py-3">Generated By</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Download</th>
                </tr>
              </thead>
              <tbody>
                {recentReports.map((report) => (
                  <tr key={report.name} className="border-b border-slate-100 transition-all duration-300 hover:bg-[#F4F0FB]">
                    <td className="px-4 py-4 text-slate-900">{report.name}</td>
                    <td className="px-4 py-4">{report.date}</td>
                    <td className="px-4 py-4">{report.by}</td>
                    <td className="px-4 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadge(report.status)}`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <button className="rounded-2xl bg-[#F4F0FB] px-4 py-2 text-xs font-semibold text-[#36136E] transition-all duration-300 hover:bg-[#36136E] hover:text-white">
                        <FaDownload className="inline mr-2" />Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-md">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Export Reports</h2>
            <FaFileExport className="text-[#36136E] text-2xl" />
          </div>
          <div className="grid gap-4">
            {exportReports.map((item) => (
              <button key={item.label} className="flex items-center justify-between rounded-3xl bg-[#F4F0FB] px-5 py-4 text-left text-sm font-semibold text-[#36136E] transition-all duration-300 hover:bg-[#36136E] hover:text-white">
                <span>{item.label}</span>
                <item.icon className="text-lg" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}