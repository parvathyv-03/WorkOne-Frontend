import { useEffect, useState } from "react";
import { FaDownload,FaUsers,FaMoneyBillWave,FaClock,FaFileInvoiceDollar,FaPercent } from "react-icons/fa";

export default function PayslipManagement() {
  const [searchTerm, setSearchTerm] = useState("");

  const [payslipRecords,setPayslipRecords] = useState([]);


  const filteredPayslipRecords = payslipRecords.filter((record) => {
    if (!searchTerm.trim()) {
      return true;
    }

    return record.id.toLowerCase().includes(searchTerm.trim().toLowerCase());
  });

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

  const loadPayslips = async () => {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(
      "http://127.0.0.1:8000/api/hr/payslips/list/",
      {
        headers:{
          Authorization:`Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    setPayslipRecords(data);
  }

  useEffect(() => {
    loadPayslips();
  },[]);

  return (
    <div className="space-y-8 px-6 py-8 bg-slate-50">
      <div className="rounded-3xl bg-white p-8 shadow-md">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="mt-4 text-4xl font-bold text-slate-900">
                Payslip Management
              </h1>
              <p className="mt-3 max-w-2xl text-slate-600">
                Manage employee payslips, payroll records, salary breakdowns and payment
                history from a centralized dashboard.
              </p>
            </div>

            <div className="flex justify-end lg:flex-1">
              <span className="inline-flex items-center rounded-full bg-[#F4F0FB] px-4 py-2 text-sm font-semibold text-[#36136E] shadow-sm">
                HR Access Only
              </span>
            </div>
          </div>
        </div>

      <div className="grid gap-6">
        <div className="rounded-3xl bg-white p-6 shadow-md">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Employee Payslip Records</h2>
              <p className="mt-2 text-sm text-slate-500">Review current payroll status for all employees.</p>
            </div>
            <div className="w-full sm:w-auto">
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by Employee ID"
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:w-[280px]"
              />
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
                {filteredPayslipRecords.length > 0 ? (
                  filteredPayslipRecords.map((row) => (
                    <tr key={row.id} className="border-b border-slate-100 transition-all duration-300 hover:bg-[#F4F0FB]">
                      <td className="px-4 py-4 text-sm font-semibold text-slate-900">{row.employee_id}</td>
                      <td className="px-4 py-4 text-sm text-slate-900">{row.employee_name}</td>
                      <td className="px-4 py-4 text-sm text-slate-600">{row.department}</td>
                      <td className="px-4 py-4 text-sm text-slate-600">{row.month}</td>
                      <td className="px-4 py-4 text-sm text-slate-900">{row.gross_salary}</td>
                      <td className="px-4 py-4 text-sm text-slate-900">{row.deductions}</td>
                      <td className="px-4 py-4 text-sm font-semibold text-slate-900">{row.net_salary}</td>
                      <td className="px-4 py-4 text-sm">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(row.status)}`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm">
                        <div className="flex flex-wrap gap-2">
                          <button 
                            onClick={() => 
                              window.open(
                                `http://127.0.0.1:8000${row.pdf_url}`,
                                "_blank"  
                              )
                            } 
                            className="rounded-2xl bg-[#F4F0FB] px-3 py-2 text-xs font-semibold text-[#36136E] transition-all duration-300 hover:bg-[#36136E] hover:text-white">
                            <FaDownload className="inline mr-2" />Download
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="py-12 text-center text-sm text-slate-500" colSpan="9">
                      Employee ID not found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}