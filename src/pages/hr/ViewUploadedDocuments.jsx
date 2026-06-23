import React, { useMemo, useState } from "react";
import { FaSearch, FaFilter, FaEye, FaDownload, FaCheckCircle, FaTimesCircle, FaClock, FaFilePdf, FaFileImage } from "react-icons/fa";

const documentsData = [
  {
    id: "EMP-1001",
    name: "John David",
    department: "IT",
    documentType: "Aadhaar Card",
    uploadDate: "2026-06-18",
    fileName: "john_david_aadhaar.pdf",
    status: "Verified",
    remarks: "Verified and archived.",
  },
  {
    id: "EMP-1002",
    name: "Sarah Williams",
    department: "HR",
    documentType: "Resume",
    uploadDate: "2026-06-19",
    fileName: "sarah_resume.pdf",
    status: "Pending",
    remarks: "Pending HR verification.",
  },
  {
    id: "EMP-1003",
    name: "Michael Johnson",
    department: "Finance",
    documentType: "PAN Card",
    uploadDate: "2026-06-20",
    fileName: "michael_pan.pdf",
    status: "Rejected",
    remarks: "Document is unclear; resend required.",
  },
  {
    id: "EMP-1004",
    name: "Emily Brown",
    department: "Marketing",
    documentType: "Degree Certificate",
    uploadDate: "2026-06-21",
    fileName: "emily_degree.pdf",
    status: "Verified",
    remarks: "Approved by HR team.",
  },
  {
    id: "EMP-1005",
    name: "David Martinez",
    department: "Operations",
    documentType: "Passport",
    uploadDate: "2026-06-22",
    fileName: "david_passport.pdf",
    status: "Pending",
    remarks: "Awaiting final verification.",
  },
];

const departments = ["All", "IT", "HR", "Finance", "Operations", "Marketing"];
const documentTypes = ["All", "Aadhaar Card", "PAN Card", "Resume", "Degree Certificate", "Experience Certificate", "Passport", "Bank Passbook", "Offer Letter", "Relieving Letter"];
const statuses = ["All", "Verified", "Pending", "Rejected"];
const verificationActivity = [
  { time: "2m ago", title: "Document Approved", detail: "HR approved Aadhaar Card for John David." },
  { time: "1h ago", title: "New Upload Received", detail: "Sarah Williams uploaded her Resume." },
  { time: "3h ago", title: "Document Rejected", detail: "PAN Card rejected for Michael Johnson." },
];

function statusBadge(status) {
  const base = "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold";
  if (status === "Verified") return `${base} bg-emerald-100 text-emerald-700`;
  if (status === "Pending") return `${base} bg-amber-100 text-amber-700`;
  if (status === "Rejected") return `${base} bg-red-100 text-red-700`;
  return `${base} bg-slate-100 text-slate-700`;
}

function initials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function ViewUploadedDocuments() {
  const [selectedDocId, setSelectedDocId] = useState(documentsData[0].id);
  const [searchName, setSearchName] = useState("");
  const [searchId, setSearchId] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [documentTypeFilter, setDocumentTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredDocuments = useMemo(() => {
    return documentsData.filter((doc) => {
      const matchesName = doc.name.toLowerCase().includes(searchName.toLowerCase());
      const matchesId = doc.id.toLowerCase().includes(searchId.toLowerCase());
      const matchesDepartment = departmentFilter === "All" || doc.department === departmentFilter;
      const matchesType = documentTypeFilter === "All" || doc.documentType === documentTypeFilter;
      const matchesStatus = statusFilter === "All" || doc.status === statusFilter;
      return matchesName && matchesId && matchesDepartment && matchesType && matchesStatus;
    });
  }, [searchName, searchId, departmentFilter, documentTypeFilter, statusFilter]);

  const selectedDocument = documentsData.find((item) => item.id === selectedDocId) || documentsData[0];

  const totalDocuments = documentsData.length;
  const verifiedCount = documentsData.filter((doc) => doc.status === "Verified").length;
  const pendingCount = documentsData.filter((doc) => doc.status === "Pending").length;
  const rejectedCount = documentsData.filter((doc) => doc.status === "Rejected").length;

  return (
    <div className="min-h-screen bg-[#F4F0FB] p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-white/50">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-[#36136E]">Employee Documents</h1>
              <p className="mt-2 text-sm text-slate-600">
                View, verify, and manage documents uploaded by employees.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-3xl bg-[#F4F0FB] px-4 py-3 text-sm font-semibold text-[#36136E] shadow-sm">
                Total Documents: <span className="text-[#36136E]">{totalDocuments}</span>
              </div>
              <div className="rounded-3xl bg-[#F4F0FB] px-4 py-3 text-sm font-semibold text-[#36136E] shadow-sm">
                Pending Verification: <span className="text-[#36136E]">{pendingCount}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-3xl bg-white p-5 shadow-sm hover:shadow-md transition">
            <p className="text-sm text-slate-500">Total Documents</p>
            <p className="mt-3 text-3xl font-semibold text-[#36136E]">{totalDocuments}</p>
          </div>
          <div className="rounded-3xl bg-white p-5 shadow-sm hover:shadow-md transition">
            <p className="text-sm text-slate-500">Verified Documents</p>
            <p className="mt-3 text-3xl font-semibold text-[#36136E]">{verifiedCount}</p>
          </div>
          <div className="rounded-3xl bg-white p-5 shadow-sm hover:shadow-md transition">
            <p className="text-sm text-slate-500">Pending Verification</p>
            <p className="mt-3 text-3xl font-semibold text-[#36136E]">{pendingCount}</p>
          </div>
          <div className="rounded-3xl bg-white p-5 shadow-sm hover:shadow-md transition">
            <p className="text-sm text-slate-500">Rejected Documents</p>
            <p className="mt-3 text-3xl font-semibold text-[#36136E]">{rejectedCount}</p>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm border border-white/50">
          <div className="grid gap-4 lg:grid-cols-[1.5fr_1.2fr] xl:grid-cols-[2fr_1fr]">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-2">
              <div className="rounded-3xl bg-[#F4F0FB] p-4">
                <label className="text-xs font-semibold uppercase tracking-[1px] text-slate-500">Search by Employee Name</label>
                <div className="mt-3 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2">
                  <FaSearch className="text-slate-400" />
                  <input
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className="w-full bg-transparent text-sm outline-none"
                    placeholder="John David"
                  />
                </div>
              </div>
              <div className="rounded-3xl bg-[#F4F0FB] p-4">
                <label className="text-xs font-semibold uppercase tracking-[1px] text-slate-500">Search by Employee ID</label>
                <div className="mt-3 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2">
                  <FaSearch className="text-slate-400" />
                  <input
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    className="w-full bg-transparent text-sm outline-none"
                    placeholder="EMP-1001"
                  />
                </div>
              </div>
              <div className="rounded-3xl bg-[#F4F0FB] p-4">
                <label className="text-xs font-semibold uppercase tracking-[1px] text-slate-500">Filter by Department</label>
                <select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              <div className="rounded-3xl bg-[#F4F0FB] p-4">
                <label className="text-xs font-semibold uppercase tracking-[1px] text-slate-500">Filter by Document Type</label>
                <select
                  value={documentTypeFilter}
                  onChange={(e) => setDocumentTypeFilter(e.target.value)}
                  className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
                >
                  {documentTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="rounded-3xl bg-[#F4F0FB] p-4">
                <label className="text-xs font-semibold uppercase tracking-[1px] text-slate-500">Filter by Verification Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => {
                  setSearchName("");
                  setSearchId("");
                  setDepartmentFilter("All");
                  setDocumentTypeFilter("All");
                  setStatusFilter("All");
                }}
                className="inline-flex items-center justify-center gap-2 rounded-3xl bg-[#36136E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2c0f5b]"
              >
                <FaFilter /> Reset Filters
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
              <div className="border-b border-slate-200 px-6 py-4">
                <h2 className="text-lg font-semibold text-[#36136E]">Uploaded Documents</h2>
                <p className="mt-1 text-sm text-slate-500">Review employee-submitted files and take action quickly.</p>
              </div>
              <div className="max-h-[460px] overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                  <thead className="bg-[#F4F0FB]">
                    <tr>
                      <th className="px-6 py-4 font-semibold text-slate-600">Employee ID</th>
                      <th className="px-6 py-4 font-semibold text-slate-600">Employee Name</th>
                      <th className="px-6 py-4 font-semibold text-slate-600">Department</th>
                      <th className="px-6 py-4 font-semibold text-slate-600">Document Type</th>
                      <th className="px-6 py-4 font-semibold text-slate-600">Upload Date</th>
                      <th className="px-6 py-4 font-semibold text-slate-600">File Name</th>
                      <th className="px-6 py-4 font-semibold text-slate-600">Status</th>
                      <th className="px-6 py-4 font-semibold text-slate-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {filteredDocuments.map((doc) => (
                      <tr
                        key={doc.id}
                        onClick={() => setSelectedDocId(doc.id)}
                        className={`cursor-pointer transition ${selectedDocId === doc.id ? "bg-[#F4F0FB]" : "hover:bg-slate-50"}`}
                      >
                        <td className="px-6 py-4 font-medium text-slate-700">{doc.id}</td>
                        <td className="px-6 py-4 text-slate-600">{doc.name}</td>
                        <td className="px-6 py-4 text-slate-600">{doc.department}</td>
                        <td className="px-6 py-4 text-slate-600">{doc.documentType}</td>
                        <td className="px-6 py-4 text-slate-600">{doc.uploadDate}</td>
                        <td className="px-6 py-4 text-slate-600">{doc.fileName}</td>
                        <td className="px-6 py-4"> <span className={statusBadge(doc.status)}>{doc.status}</span></td>
                        <td className="px-6 py-4 text-slate-600">
                          <div className="flex flex-wrap gap-2">
                            <button className="inline-flex items-center gap-2 rounded-2xl bg-[#F4F0FB] px-3 py-2 text-xs font-semibold text-[#36136E] transition hover:bg-[#ece5fa]">
                              <FaEye /> View
                            </button>
                            <button className="inline-flex items-center gap-2 rounded-2xl bg-[#F4F0FB] px-3 py-2 text-xs font-semibold text-[#36136E] transition hover:bg-[#ece5fa]">
                              <FaDownload /> Download
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredDocuments.length === 0 && (
                      <tr>
                        <td colSpan={8} className="px-6 py-8 text-center text-slate-500">
                          No documents match the current filter.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-[#36136E]">Recent Uploads</h3>
                  <p className="mt-1 text-sm text-slate-500">Latest documents added by employees.</p>
                </div>
              </div>
              <div className="mt-5 space-y-4">
                {documentsData.slice(0, 3).map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between rounded-3xl border border-slate-200 bg-[#F4F0FB] p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#36136E] text-lg font-semibold text-white">
                        {initials(doc.name)}
                      </div>
                      <div>
                        <p className="font-semibold text-[#36136E]">{doc.name}</p>
                        <p className="text-sm text-slate-500">{doc.documentType}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-600">{doc.uploadDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
