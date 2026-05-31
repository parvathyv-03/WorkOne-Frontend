import { useState } from "react";
import { HiOutlineExclamationCircle, HiOutlineDocumentAdd, HiOutlineClipboardList, HiOutlineEye, HiOutlineUserGroup, HiOutlineCheckCircle } from "react-icons/hi";
import { MdOutlineReportProblem, MdOutlineAttachFile, MdOutlineAnalytics, MdOutlineAccessTime } from "react-icons/md";

const summaryCards = [
  {
    title: "Total Complaints",
    value: "128",
    icon: <MdOutlineAnalytics className="h-6 w-6" />,
    badge: "bg-slate-100 text-slate-800",
  },
  {
    title: "Pending",
    value: "24",
    icon: <HiOutlineExclamationCircle className="h-6 w-6" />,
    badge: "bg-yellow-100 text-yellow-700",
  },
  {
    title: "In Review",
    value: "18",
    icon: <HiOutlineClipboardList className="h-6 w-6" />,
    badge: "bg-blue-100 text-blue-700",
  },
  {
    title: "Resolved",
    value: "86",
    icon: <HiOutlineCheckCircle className="h-6 w-6" />,
    badge: "bg-emerald-100 text-emerald-700",
  },
];

const initialComplaints = [
  {
    id: "CMP-1024",
    category: "Workplace",
    subject: "Uncomfortable seating arrangement",
    date: "May 24, 2026",
    status: "Pending",
    timeline: ["Complaint Submitted", "Assigned to HR", "Under Review"],
  },
  {
    id: "CMP-1025",
    category: "Technical",
    subject: "VPN access issue",
    date: "May 21, 2026",
    status: "In Review",
    timeline: ["Complaint Submitted", "Assigned to HR", "Under Review"],
  },
  {
    id: "CMP-1026",
    category: "Payroll",
    subject: "Incorrect salary deduction",
    date: "May 16, 2026",
    status: "Escalated",
    timeline: ["Complaint Submitted", "Assigned to HR", "Under Review", "Escalated"],
  },
  {
    id: "CMP-1027",
    category: "Management",
    subject: "Lack of role clarity",
    date: "May 10, 2026",
    status: "Resolved",
    timeline: ["Complaint Submitted", "Assigned to HR", "Under Review", "Resolved"],
  },
];

const statusStyles = {
  Pending: "bg-yellow-100 text-yellow-700",
  "In Review": "bg-blue-100 text-blue-700",
  Escalated: "bg-red-100 text-red-700",
  Resolved: "bg-emerald-100 text-emerald-700",
};

export default function Complaints() {
  const [selectedComplaint, setSelectedComplaint] = useState(initialComplaints[0]);
  const [form, setForm] = useState({ category: "Workplace", subject: "", description: "", attachment: null });
  const [touched, setTouched] = useState({ subject: false, description: false });

  const handleInputChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTouched({ subject: true, description: true });
  };

  const isSubjectError = touched.subject && !form.subject.trim();
  const isDescriptionError = touched.description && !form.description.trim();

  return (
    <div className="space-y-8 text-slate-900">
      <div className="rounded-3xl bg-white p-8 shadow-md">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Complaints Management</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-900">Complaints Management</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
          Raise, track and manage your workplace concerns with clear status updates and easy follow-up.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <div key={card.title} className="rounded-3xl bg-white p-6 shadow-md transition hover:shadow-xl">
            <div className="flex items-center justify-between gap-4">
              <div className={`inline-flex h-14 w-14 items-center justify-center rounded-3xl ${card.badge}`}>
                {card.icon}
              </div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">{card.title}</span>
            </div>
            <p className="mt-6 text-3xl font-semibold text-slate-900">{card.value}</p>
            <p className="mt-2 text-sm text-slate-600">{card.title}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2 items-stretch">
        <div className="rounded-3xl bg-white p-8 shadow-md h-full">
          <div className="flex flex-col gap-6 h-full">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Raise New Complaint</h2>
              <p className="mt-2 text-sm text-slate-600">Submit a new concern and attach supporting documents if needed.</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-slate-700">
                  Complaint Category
                  <select
                    value={form.category}
                    onChange={(e) => handleInputChange("category", e.target.value)}
                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
                  >
                    <option>Workplace</option>
                    <option>Technical</option>
                    <option>Payroll</option>
                    <option>Management</option>
                  </select>
                </label>
                <label className="space-y-2 text-sm text-slate-700">
                  Subject
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    onBlur={() => setTouched((prev) => ({ ...prev, subject: true }))}
                    placeholder="Enter complaint subject"
                    className={`w-full rounded-3xl border px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white ${
                      isSubjectError ? "border-red-300 bg-red-50" : "border-slate-200 bg-slate-50"
                    }`}
                  />
                  {isSubjectError && <p className="text-xs text-red-600">Subject is required.</p>}
                </label>
              </div>

              <label className="space-y-2 text-sm text-slate-700">
                Description
                <textarea
                  rows="4"
                  value={form.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  onBlur={() => setTouched((prev) => ({ ...prev, description: true }))}
                  placeholder="Describe your complaint in detail"
                  className={`w-full rounded-3xl border px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white ${
                    isDescriptionError ? "border-red-300 bg-red-50" : "border-slate-200 bg-slate-50"
                  }`}
                />
                {isDescriptionError && <p className="text-xs text-red-600">Description is required.</p>}
              </label>

              <label className="space-y-2 text-sm text-slate-700">
                Attachment (Optional)
                <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <div className="flex items-center gap-3 text-slate-700">
                    <MdOutlineAttachFile className="h-5 w-5" />
                    <input
                      type="file"
                      accept="application/pdf,image/png,image/jpeg"
                      onChange={(e) => handleInputChange("attachment", e.target.files?.[0] || null)}
                      className="w-full cursor-pointer bg-transparent text-sm text-slate-700 file:mr-4 file:rounded-full file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:text-white file:transition file:hover:bg-blue-700"
                    />
                  </div>
                </div>
              </label>

              <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-4 text-sm font-semibold text-white transition hover:bg-blue-700"
                   >
                        Submit Complaint
                    </button>
              </div>
            </form>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-md h-full">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">Complaint Status Tracker</h2>
                <p className="mt-2 text-sm text-slate-600">Track complaint progress and review the complete lifecycle.</p>
              </div>
              <div className="rounded-3xl bg-blue-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-blue-700">
                Live Overview
              </div>
            </div>

            <div className="mt-8 overflow-auto">
              <table className="min-w-full text-left text-sm text-slate-700">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="px-4 py-3 font-medium">Complaint ID</th>
                    <th className="px-4 py-3 font-medium">Category</th>
                    <th className="px-4 py-3 font-medium">Subject</th>
                    <th className="px-4 py-3 font-medium">Submitted Date</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {initialComplaints.map((complaint) => (
                    <tr key={complaint.id} className="hover:bg-slate-50">
                      <td className="px-4 py-4 font-semibold text-slate-900">{complaint.id}</td>
                      <td className="px-4 py-4">{complaint.category}</td>
                      <td className="px-4 py-4 truncate text-slate-600" style={{ maxWidth: "180px" }}>
                        {complaint.subject}
                      </td>
                      <td className="px-4 py-4">{complaint.date}</td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[complaint.status]}`}>
                          {complaint.status}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <button
                          type="button"
                          onClick={() => setSelectedComplaint(complaint)}
                          className="inline-flex items-center gap-2 rounded-3xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-700"
                        >
                          <HiOutlineEye className="h-4 w-4" /> View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-8 shadow-md">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Complaint Resolution Timeline</h2>
            <p className="mt-2 text-sm text-slate-600">Follow the selected complaint lifecycle through each milestone.</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-3xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
            <MdOutlineAccessTime className="h-5 w-5" /> Current Complaint: {selectedComplaint.id}
          </div>
        </div>

        <div className="mt-10 space-y-8">
          {selectedComplaint.timeline.map((step, index) => (
            <div key={step} className="flex items-start gap-5">
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm">
                  {index + 1}
                </div>
                {index !== selectedComplaint.timeline.length - 1 && <div className="mt-2 h-full w-px bg-slate-200" />}
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Step {index + 1}</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{step}</p>
              </div>
            </div>
          ))}
          {selectedComplaint.status === "Escalated" && (
            <div className="flex items-start gap-5">
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white shadow-sm">
                  !
                </div>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-red-600">Escalation</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">Complaint has been escalated for senior review.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
