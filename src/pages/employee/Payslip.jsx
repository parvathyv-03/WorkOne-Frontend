import { HiOutlineDownload, HiOutlineDocumentText, HiOutlineReceiptTax, HiOutlineCash, HiOutlineShieldCheck, HiOutlineSparkles, HiOutlineBadgeCheck } from "react-icons/hi";
import { FaChartLine } from "react-icons/fa";

import { useState,useEffect } from "react";

export default function Payslip() {
  const [summaryData,setSummaryData]  = useState([]);
  const [recentPayslips,setRecentPayslips] = useState([]);
  const [deductionsBonuses,setDeductionBonuses] = useState([]);

  useEffect(() => {
    fetchPayslipData();
  },[]);

  const fetchPayslipData = async () => {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(
      "http://127.0.0.1:8000/api/payslip/dashboard/",
      {
        headers:{
          Authorization:`Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    setSummaryData(data.summary);
    setRecentPayslips(data.payslips);
    setDeductionBonuses(data.deductions);
  }

  const getStatusColor = (status) => {
    if (status === "Paid") {
      return "bg-emerald-100 text-emerald-700";
    }

    return "bg-yellow-100 text-yellow-700";
  };

  const iconMap = {
    "Net Salary": <HiOutlineCash className="h-6 w-6"/>,
    "Basic Salary": <HiOutlineDocumentText className="h-6 w-6"/>,
    "Total Earnings": <FaChartLine className="h-6 w-6"/>,
    "Total Deductions": <HiOutlineReceiptTax className="h-6 w-6"/>,
    "Current Month": <HiOutlineBadgeCheck className="h-6 w-6"/>,
  }

  const formatCurrency = (amount) => {
    return `₹${Number(amount).toLocaleString("en-IN")}`;
  };

  const handleDownload = (pdfUrl) => {
    window.open(
      `http://127.0.0.1:8000${pdfUrl}`,
      "_blank"
    );
  };
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
                {iconMap[item.label]}
              </div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">{item.label}</span>
            </div>
            <p className="mt-6 text-3xl font-semibold text-slate-900">
              {item.label === "Current Month"
                ? item.value
                : formatCurrency(item.value)}
            </p>
          </div>
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
                    <td className="px-4 py-4">{formatCurrency(item.net)}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <button 
                        disabled={!item.pdf_url}
                        onClick={() => handleDownload(item.pdf_url)}
                        className="inline-flex items-center gap-2 rounded-3xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-700">
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
                <p className="text-lg font-semibold text-slate-900">{formatCurrency(item.amount)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
