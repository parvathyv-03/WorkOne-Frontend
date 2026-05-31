import { HiOutlineDownload, HiOutlineDocumentText, HiOutlineReceiptTax, HiOutlineCash, HiOutlineShieldCheck, HiOutlineSparkles, HiOutlineBadgeCheck } from "react-icons/hi";
import { FaChartLine } from "react-icons/fa";

const summaryData = [
  { label: "Net Salary", value: "Rs.49,500", icon: <HiOutlineCash className="h-6 w-6" /> },
  { label: "Basic Salary", value: "Rs.45,000", icon: <HiOutlineDocumentText className="h-6 w-6" /> },
  { label: "Total Earnings", value: "Rs.58,000", icon: <FaChartLine className="h-6 w-6" /> },
  { label: "Total Deductions", value: "Rs.8,500", icon: <HiOutlineReceiptTax className="h-6 w-6" /> },
  { label: "Current Month", value: "May 2026", icon: <HiOutlineBadgeCheck className="h-6 w-6" /> },
];

const actionCards = [
  { title: "Download Payslip PDF", icon: <HiOutlineDownload className="h-7 w-7" /> },
  { title: "View Salary History", icon: <HiOutlineDocumentText className="h-7 w-7" /> },
  { title: "View Deductions", icon: <HiOutlineReceiptTax className="h-7 w-7" /> },
  { title: "View Bonuses", icon: <HiOutlineSparkles className="h-7 w-7" /> },
];

const recentPayslips = [
  { month: "May 2026", net: "Rs.49,500", status: "Paid", statusColor: "bg-emerald-100 text-emerald-700" },
  { month: "April 2026", net: "Rs.48,800", status: "Paid", statusColor: "bg-emerald-100 text-emerald-700" },
  { month: "March 2026", net: "Rs.47,900", status: "Paid", statusColor: "bg-emerald-100 text-emerald-700" },
  { month: "February 2026", net: "Rs.47,200", status: "Pending", statusColor: "bg-yellow-100 text-yellow-700" },
];

const deductionsBonuses = [
  { label: "Tax", amount: "Rs.5,000" },
  { label: "PF", amount: "Rs.2,000" },
  { label: "Insurance", amount: "Rs.1,300" },
  { label: "Performance Bonus", amount: "Rs.1,000" },
  { label: "Other Allowances", amount: "Rs.1,500" },
];

export default function Payslip() {
  return (
    <div className="space-y-8  text-slate-900">
      <div className="rounded-3xl bg-white p-8 shadow-md">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Payslip Management</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-900">Payslip Management</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
          View and manage your salary information in one polished dashboard section.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-5">
        {summaryData.map((item) => (
          <div key={item.label} className="rounded-3xl bg-white p-6 shadow-md transition hover:shadow-xl">
            <div className="flex items-center justify-between gap-4">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-blue-50 text-blue-600">
                {item.icon}
              </div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">{item.label}</span>
            </div>
            <p className="mt-6 text-3xl font-semibold text-slate-900">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
        {actionCards.map((action) => (
          <button
            key={action.title}
            type="button"
            className="group rounded-3xl bg-white p-6 text-left shadow-md transition duration-300 hover:-translate-y-0.5 hover:shadow-xl"
          >
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-100">
              {action.icon}
            </div>
            <p className="mt-6 text-base font-semibold text-slate-900 transition group-hover:text-blue-600">{action.title}</p>
          </button>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <div className="rounded-3xl bg-white p-8 shadow-md">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Recent Payslips</h2>
              <p className="mt-2 text-sm text-slate-600">Review your most recent salary statements and download as needed.</p>
            </div>
            <div className="rounded-3xl bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">Latest</div>
          </div>

          <div className="mt-8 overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-700">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="px-4 py-3 font-medium">Month</th>
                  <th className="px-4 py-3 font-medium">Net Salary</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Download</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {recentPayslips.map((item) => (
                  <tr key={item.month} className="hover:bg-slate-50">
                    <td className="px-4 py-4 font-semibold text-slate-900">{item.month}</td>
                    <td className="px-4 py-4">{item.net}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${item.statusColor}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <button className="inline-flex items-center gap-2 rounded-3xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-700">
                        <HiOutlineDownload className="h-4 w-4" /> Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-md">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Deductions & Bonuses</h2>
              <p className="mt-2 text-sm text-slate-600">See the breakdown of your salary adjustments for the month.</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-3xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
              <HiOutlineShieldCheck className="h-5 w-5" /> Secure
            </div>
          </div>

          <div className="mt-8 space-y-4">
            {deductionsBonuses.map((item) => (
              <div key={item.label} className="flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-3xl bg-blue-50 text-blue-600">
                    {item.label === "Performance Bonus" ? <HiOutlineSparkles className="h-5 w-5" /> : <HiOutlineDocumentText className="h-5 w-5" />}
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">{item.label}</p>
                    <p className="text-sm text-slate-500">{item.label === "Other Allowances" ? "Additional monthly allowance" : ""}</p>
                  </div>
                </div>
                <p className="text-lg font-semibold text-slate-900">{item.amount}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
