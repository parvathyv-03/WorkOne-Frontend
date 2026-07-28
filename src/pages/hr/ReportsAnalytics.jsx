import { useEffect, useState } from "react";
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
  FaChartBar,
  FaFileExport,
  FaWallet,
  FaBriefcase,
} from "react-icons/fa";

export default function ReportsAnalytics() {

  const [summaryCards,setSummaryCards] = useState([]);
  const [attendanceOverview,setAttendanceOverview] = useState([]);
  const [leaveAnalytics,setLeaveAnalytics] = useState([]);
  const [complaintAnalytics,setComplaintAnalytics] = useState([]);
  const[payrollAnalytics,setPayrollAnalytics] = useState([]);

  useEffect(() => {
    loadSummary();
    loadAttendance();
    loadLeave();
    loadComplaintPayroll();
  },[]);

  const loadSummary = async () => {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(
      "http://127.0.0.1:8000/api/hr/reports/summary/",
      {
        headers:{
          Authorization:`Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    setSummaryCards([
         {
          title: "Total Employees",
          value: data.total_employees,
          icon: FaUsers,
        },
        {
          title: "Attendance Rate",
          value: `${data.attendance_rate}%`,
          icon: FaChartLine,
        },
        {
          title: "Leave Requests This Month",
          value: data.leave_requests,
          icon: FaCalendarAlt,
        },
        {
          title: "Open Complaints",
          value: data.open_complaints,
          icon: FaExclamationTriangle,
        },
        {
          title: "Payroll Processed",
          value: `Rs.${Number(data.payroll_processed).toLocaleString()}`,
          icon: FaFileInvoiceDollar,
        },
        {
          title: "Active Departments",
          value: data.active_departments,
          icon: FaLayerGroup,
        },
    ])
  }

  const loadAttendance = async () => {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(
      "http://127.0.0.1:8000/api/hr/reports/attendance/",
      {
        headers:{
          Authorization:`Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    setAttendanceOverview(data);
  }

  const loadLeave = async () => {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(
      "http://127.0.0.1:8000/api/hr/reports/leave/",
      {
        headers:{
          Authorization:`Bearer ${token}`
        },
      }
    );

    const data = await response.json();

    setLeaveAnalytics(data);

  };

  const loadComplaintPayroll = async () => {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(
      "http://127.0.0.1:8000/api/hr/reports/complaints-payroll/",
      {
        headers:{
          Authorization:`Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    setComplaintAnalytics([
      {
        ...data.complaints[0],
        icon:FaClipboardList,
      },
      {
        ...data.complaints[1],
        icon:FaClipboardList,
      },
      {
        ...data.complaints[2],
        icon:FaClipboardList,
      },
      {
        ...data.complaints[3],
        icon:FaClipboardList,
      },
    ]);

    setPayrollAnalytics([
        {
          ...data.payroll[0],
          icon: FaWallet,
        },
        {
          ...data.payroll[1],
          icon: FaBriefcase,
        },
        {
          ...data.payroll[2],
          icon: FaFileInvoiceDollar,
        },
        {
          ...data.payroll[3],
          icon: FaLayerGroup,
        },
      ]);
 
  };

  const colorMap = {
    violet: "bg-violet-600",
    sky: "bg-sky-500",
    pink: "bg-pink-500",
    yellow: "bg-yellow-500",

    green: "bg-green-500",
    red: "bg-red-500",
    orange: "bg-orange-500",
  };


  const exportReports = [
    { label: "Export Attendance Report",reportType:"attendance", icon: FaFileExport },
    { label: "Export Leave Report", reportType:"leaves",icon: FaFileExport },
    { label: "Export Payroll Report", reportType:"payroll",icon: FaFileExport },
    { label: "Export Employee Report",reportType:"employees", icon: FaFileExport },
    { label: "Export Complaint Report",reportType:"complaints", icon: FaFileExport },
  ];

  const exportReport = async (reportType) =>{
    const token = localStorage.getItem("accessToken");

   const response = await fetch(
    `http://127.0.0.1:8000/api/hr/reports/export/${reportType}/`,
    {
      headers:{
        Authorization:`Bearer ${token}`,
      },
    }
   );

   const blob = await response.blob();
   const url = window.URL.createObjectURL(blob);
   window.open(url,"_blank");
  };

  return (
    <div className="space-y-8 bg-slate-50 px-6 py-8">
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
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 shadow-md xl:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Monthly Attendance Overview</h2>
              <p className="mt-2 text-sm text-slate-500">Attendance distribution across the workforce.</p>
            </div>
            <FaChartBar className="text-2xl text-[#36136E]" />
          </div>
          <div className="space-y-5">
            {attendanceOverview.map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
                  <p>{item.label}</p>
                  <p>{item.value}%</p>
                </div>
                <div className="h-3 rounded-full bg-slate-100">
                  <div className="h-3 rounded-full bg-slate-100">
                      <div
                        className={`${item.color} h-full rounded-full`}
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
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
            <FaCalendarAlt className="text-2xl text-[#36136E]" />
          </div>
          <div className="space-y-5">
            {leaveAnalytics.map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
                  <p>{item.label}</p>
                  <p>{item.value}%</p>
                </div>
                <div className="h-3 rounded-full bg-slate-100">
                  <div className={`${colorMap[item.color]} h-full rounded-full`} style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl bg-white p-6 shadow-md">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Complaint Analytics</h2>
            <FaTimesCircle className="text-2xl text-[#36136E]" />
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
            <FaWallet className="text-2xl text-[#36136E]" />
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

      <div className="rounded-3xl bg-white p-6 shadow-md">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Export Reports</h2>
          <FaFileExport className="text-2xl text-[#36136E]" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {exportReports.map((item) => (
            <button key={item.label} onClick={() => exportReport(item.reportType)} className="flex items-center justify-between rounded-3xl bg-[#F4F0FB] px-5 py-4 text-left text-sm font-semibold text-[#36136E] transition-all duration-300 hover:bg-[#36136E] hover:text-white">
              <span>{item.label}</span>
              <item.icon className="text-lg" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}