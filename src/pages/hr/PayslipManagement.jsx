import {
  FaUsers,
  FaMoneyBillWave,
  FaClock,
  FaFileInvoiceDollar,
  FaPercent,
  FaPlusCircle,
  FaUpload,
  FaHistory,
  FaLayerGroup,
  FaEye,
  FaDownload,
  FaEdit,
  FaChartLine,
  FaArrowUp,
  FaArrowDown,
  FaChartPie,
  FaClipboardList,
  FaReceipt,
  FaShieldAlt,
  FaBriefcase,
  FaCheckCircle
} from "react-icons/fa";

export default function PayslipManagement() {
  const summaryCards = [
    {
      title: "Total Employees Paid",
      value: "118",
      trend: "+4 this month",
      icon: FaUsers,
      accent: "bg-[#F4F0FB] text-[#36136E]",
    },
    {
      title: "Total Payroll Amount",
      value: "$412,560",
      trend: "Payroll settled",
      icon: FaMoneyBillWave,
      accent: "bg-[#F4F0FB] text-[#36136E]",
    },
    {
      title: "Pending Payslips",
      value: "6",
      trend: "2 awaiting review",
      icon: FaClock,
      accent: "bg-[#F4F0FB] text-[#36136E]",
    },
    {
      title: "Generated This Month",
      value: "122",
      trend: "On schedule",
      icon: FaFileInvoiceDollar,
      accent: "bg-[#F4F0FB] text-[#36136E]",
    },
    {
      title: "Total Deductions",
      value: "$34,725",
      trend: "Tax & benefits",
      icon: FaPercent,
      accent: "bg-[#F4F0FB] text-[#36136E]",
    },
  ];

  const quickActions = [
    {
      title: "Generate Payslip",
      icon: FaPlusCircle,
      description: "Create new salary slips",
    },
    {
      title: "Upload Payslip",
      icon: FaUpload,
      description: "Import payroll documents",
    },
    {
      title: "Payroll History",
      icon: FaHistory,
      description: "Review past payments",
    },
    {
      title: "Salary Structure",
      icon: FaLayerGroup,
      description: "Manage salary rules",
    },
  ];

  const payslipRecords = [
    {
      id: "EMP001",
      name: "John Smith",
      department: "IT",
      month: "June 2024",
      gross: "$7,500",
      deductions: "$650",
      net: "$6,850",
      status: "Paid",
    },
    {
      id: "EMP002",
      name: "Sarah Wilson",
      department: "HR",
      month: "June 2024",
      gross: "$6,200",
      deductions: "$510",
      net: "$5,690",
      status: "Paid",
    },
    {
      id: "EMP003",
      name: "Michael Brown",
      department: "Finance",
      month: "June 2024",
      gross: "$8,100",
      deductions: "$730",
      net: "$7,370",
      status: "Pending",
    },
    {
      id: "EMP004",
      name: "Emily Davis",
      department: "Marketing",
      month: "June 2024",
      gross: "$5,900",
      deductions: "$480",
      net: "$5,420",
      status: "Paid",
    },
    {
      id: "EMP005",
      name: "David Martinez",
      department: "IT",
      month: "June 2024",
      gross: "$7,200",
      deductions: "$640",
      net: "$6,560",
      status: "Paid",
    },
    {
      id: "EMP006",
      name: "Jessica Anderson",
      department: "Operations",
      month: "June 2024",
      gross: "$6,750",
      deductions: "$590",
      net: "$6,160",
      status: "Rejected",
    },
    {
      id: "EMP007",
      name: "Robert Taylor",
      department: "Finance",
      month: "June 2024",
      gross: "$7,880",
      deductions: "$720",
      net: "$7,160",
      status: "Paid",
    },
    {
      id: "EMP008",
      name: "Lisa White",
      department: "HR",
      month: "June 2024",
      gross: "$5,450",
      deductions: "$470",
      net: "$4,980",
      status: "Pending",
    },
  ];

  const salaryComponents = [
    { label: "Basic Salary", value: "$5,000" },
    { label: "HRA", value: "$1,200" },
    { label: "Allowance", value: "$650" },
    { label: "Bonus", value: "$300" },
    { label: "Tax", value: "-$420" },
    { label: "PF", value: "-$200" },
    { label: "Insurance", value: "-$120" },
    { label: "Net Salary", value: "$6,210" },
  ];

  const activities = [
    {
      id: 1,
      icon: FaReceipt,
      text: "Payslip generated for John Smith",
      time: "10 minutes ago",
    },
    {
      id: 2,
      icon: FaCheckCircle,
      text: "Payroll approved by HR Manager",
      time: "1 hour ago",
    },
    {
      id: 3,
      icon: FaShieldAlt,
      text: "Salary credited successfully",
      time: "2 hours ago",
    },
    {
      id: 4,
      icon: FaDownload,
      text: "Payslip downloaded for Emily Davis",
      time: "4 hours ago",
    },
  ];

  const analyticsCards = [
    {
      title: "Average Salary",
      value: "$6,850",
      trend: "+3.2%",
      icon: FaChartLine,
      accent: "bg-[#F4F0FB] text-[#36136E]",
    },
    {
      title: "Highest Salary",
      value: "$8,100",
      trend: "This month",
      icon: FaArrowUp,
      accent: "bg-[#F4F0FB] text-[#36136E]",
    },
    {
      title: "Lowest Salary",
      value: "$4,980",
      trend: "Stable",
      icon: FaArrowDown,
      accent: "bg-[#F4F0FB] text-[#36136E]",
    },
    {
      title: "Payroll Growth",
      value: "+5.8%",
      trend: "Month over month",
      icon: FaChartPie,
      accent: "bg-[#F4F0FB] text-[#36136E]",
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="space-y-8 px-6 py-8 bg-slate-50">
      <div className="rounded-3xl bg-white p-8 shadow-md">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="mt-4 text-4xl font-bold text-slate-900">
              Payslip Management
            </h1>
            <p className="mt-3 max-w-2xl text-slate-600">
              Manage employee payslips, payroll records, salary breakdowns and payment history from a centralized dashboard.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:w-[560px]">
            <div className="min-w-[220px] rounded-3xl bg-[#FBF7FF] px-6 py-5 text-center shadow-sm">
              <p className="text-sm font-semibold text-slate-500">Total Payroll</p>
              <p className="mt-3 text-3xl font-bold text-[#36136E]">$412.6K</p>
            </div>
            <div className="min-w-[220px] rounded-3xl bg-[#F4F0FB] px-6 py-5 text-center shadow-sm">
              <p className="text-sm font-semibold text-slate-500">Payslips</p>
              <p className="mt-3 text-3xl font-bold text-[#36136E]">122</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-5">
        <div className="xl:col-span-3 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {summaryCards.map((card) => (
            <div key={card.title} className="rounded-3xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg">
              <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${card.accent}`}>
                <card.icon className="text-lg" />
              </div>
              <p className="text-sm font-semibold text-slate-600">{card.title}</p>
              <p className="mt-3 text-3xl font-bold text-slate-900">{card.value}</p>
              <p className="mt-2 text-sm text-slate-500">{card.trend}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-5">
        <div className="xl:col-span-3 grid gap-6 sm:grid-cols-2 xl:grid-cols-2">
          {quickActions.map((action) => (
            <div key={action.title} className="group cursor-pointer rounded-3xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F4F0FB] text-[#36136E] transition-all duration-300 group-hover:bg-[#36136E] group-hover:text-white">
                <action.icon className="text-lg" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">{action.title}</h3>
              <p className="mt-2 text-sm text-slate-500">{action.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-5">
        <div className="xl:col-span-3 rounded-3xl bg-white p-6 shadow-md">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Employee Payslip Records</h2>
              <p className="mt-2 text-sm text-slate-500">Review current payroll status for all employees.</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b border-slate-200 text-sm text-slate-600">
                  <th className="px-4 py-3">Employee ID</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Department</th>
                  <th className="px-4 py-3">Month</th>
                  <th className="px-4 py-3">Gross Salary</th>
                  <th className="px-4 py-3">Deductions</th>
                  <th className="px-4 py-3">Net Salary</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {payslipRecords.map((row) => (
                  <tr key={row.id} className="border-b border-slate-100 transition-all duration-300 hover:bg-[#F4F0FB]">
                    <td className="px-4 py-4 text-sm font-semibold text-slate-900">{row.id}</td>
                    <td className="px-4 py-4 text-sm text-slate-900">{row.name}</td>
                    <td className="px-4 py-4 text-sm text-slate-600">{row.department}</td>
                    <td className="px-4 py-4 text-sm text-slate-600">{row.month}</td>
                    <td className="px-4 py-4 text-sm text-slate-900">{row.gross}</td>
                    <td className="px-4 py-4 text-sm text-slate-900">{row.deductions}</td>
                    <td className="px-4 py-4 text-sm font-semibold text-slate-900">{row.net}</td>
                    <td className="px-4 py-4 text-sm">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(row.status)}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <div className="flex flex-wrap gap-2">
                        <button className="rounded-2xl bg-[#F4F0FB] px-3 py-2 text-xs font-semibold text-[#36136E] transition-all duration-300 hover:bg-[#36136E] hover:text-white">
                          <FaEye className="inline mr-2" />View
                        </button>
                        <button className="rounded-2xl bg-[#F4F0FB] px-3 py-2 text-xs font-semibold text-[#36136E] transition-all duration-300 hover:bg-[#36136E] hover:text-white">
                          <FaDownload className="inline mr-2" />Download
                        </button>
                        <button className="rounded-2xl bg-[#F4F0FB] px-3 py-2 text-xs font-semibold text-[#36136E] transition-all duration-300 hover:bg-[#36136E] hover:text-white">
                          <FaEdit className="inline mr-2" />Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="xl:col-span-2 space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-md">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Salary Components</h3>
              <FaBriefcase className="text-[#36136E]" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {salaryComponents.map((item) => (
                <div key={item.label} className="rounded-3xl bg-[#F4F0FB] p-4 shadow-sm">
                  <p className="text-sm text-slate-500">{item.label}</p>
                  <p className="mt-3 text-xl font-semibold text-slate-900">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-md">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Recent Payroll Activity</h3>
              <FaClipboardList className="text-[#36136E]" />
            </div>
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 rounded-3xl bg-[#F4F0FB] p-4">
                  <div className="rounded-2xl bg-white p-3 text-[#36136E] shadow-sm">
                    <activity.icon className="text-lg" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{activity.text}</p>
                    <p className="mt-1 text-xs text-slate-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-md">
            <h3 className="mb-4 text-lg font-bold text-slate-900">Payroll Analytics</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {analyticsCards.map((card) => (
                <div key={card.title} className="rounded-3xl bg-[#F4F0FB] p-4 shadow-sm">
                  <div className={`mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl ${card.accent}`}>
                    <card.icon className="text-lg" />
                  </div>
                  <p className="text-sm text-slate-500">{card.title}</p>
                  <p className="mt-2 text-2xl font-bold text-slate-900">{card.value}</p>
                  <p className="mt-1 text-sm text-slate-500">{card.trend}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}