import React, { useMemo, useState } from "react";
import { FaSearch, FaEye, FaDownload, FaCheckCircle, FaFilePdf, FaTimes } from "react-icons/fa";

const DOCUMENT_TYPES = ["Resume", "Degree Certificate", "Experience Certificate", "Offer Letter"];
const STATUSES = ["Verified", "Pending Verification"];

const dummyDocuments = [
  { id: "EMP-001", name: "John David", docType: "Resume", uploadDate: "2026-06-22", status: "Verified" },
  { id: "EMP-002", name: "Sarah Williams", docType: "Degree Certificate", uploadDate: "2026-06-21", status: "Pending Verification" },
  { id: "EMP-003", name: "Michael Johnson", docType: "Experience Certificate", uploadDate: "2026-06-20", status: "Verified" },
  { id: "EMP-004", name: "Emily Brown", docType: "Offer Letter", uploadDate: "2026-06-19", status: "Pending Verification" },
  { id: "EMP-005", name: "David Martinez", docType: "Resume", uploadDate: "2026-06-18", status: "Verified" },
  { id: "EMP-006", name: "Jessica Chen", docType: "Degree Certificate", uploadDate: "2026-06-17", status: "Pending Verification" },
  { id: "EMP-007", name: "Robert Wilson", docType: "Experience Certificate", uploadDate: "2026-06-16", status: "Verified" },
];

function getStatusBadgeClass(status) {
  return status === "Verified"
    ? "inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700"
    : "inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700";
}

export default function ViewUploadedDocuments() {
  const [searchName, setSearchName] = useState("");
  const [searchId, setSearchId] = useState("");
  const [filterDocType, setFilterDocType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedDoc, setSelectedDoc] = useState(dummyDocuments[0]);
  const [showPreview, setShowPreview] = useState(false);

  const filteredDocuments = useMemo(() => {
    return dummyDocuments.filter((doc) => {
      const matchName = doc.name.toLowerCase().includes(searchName.toLowerCase());
      const matchId = doc.id.toLowerCase().includes(searchId.toLowerCase());
      const matchType = filterDocType === "All" || doc.docType === filterDocType;
      const matchStatus = filterStatus === "All" || doc.status === filterStatus;
      return matchName && matchId && matchType && matchStatus;
    });
  }, [searchName, searchId, filterDocType, filterStatus]);

  const totalDocs = dummyDocuments.length;
  const verifiedDocs = dummyDocuments.filter((d) => d.status === "Verified").length;
  const pendingDocs = dummyDocuments.filter((d) => d.status === "Pending Verification").length;
  const employeesUploaded = new Set(dummyDocuments.map((d) => d.id)).size;

  const handleReset = () => {
    setSearchName("");
    setSearchId("");
    setFilterDocType("All");
    setFilterStatus("All");
  };

  return (
    <div className="min-h-screen bg-[#F4F0FB] p-6 md:p-10">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header Section */}
        <div>
          <h1 className="text-3xl font-semibold text-[#36136E]">Employee Documents</h1>
          <p className="mt-2 text-slate-600">View, verify and manage employee uploaded documents.</p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-3xl bg-white p-6 shadow-sm hover:shadow-md transition">
            <p className="text-sm text-slate-500">Total Documents</p>
            <p className="mt-3 text-3xl font-semibold text-[#36136E]">{totalDocs}</p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm hover:shadow-md transition">
            <p className="text-sm text-slate-500">Verified Documents</p>
            <p className="mt-3 text-3xl font-semibold text-[#36136E]">{verifiedDocs}</p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm hover:shadow-md transition">
            <p className="text-sm text-slate-500">Pending Verification</p>
            <p className="mt-3 text-3xl font-semibold text-[#36136E]">{pendingDocs}</p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm hover:shadow-md transition">
            <p className="text-sm text-slate-500">Employees Uploaded</p>
            <p className="mt-3 text-3xl font-semibold text-[#36136E]">{employeesUploaded}</p>
          </div>
        </div>

        {/* Search & Filter Section */}
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {/* Search Employee Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">Search Employee</label>
              <div className="mt-3 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2">
                <FaSearch className="text-slate-400" size={14} />
                <input
                  type="text"
                  placeholder="Employee name..."
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none"
                />
              </div>
            </div>

            {/* Search Employee ID */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">Search ID</label>
              <div className="mt-3 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2">
                <FaSearch className="text-slate-400" size={14} />
                <input
                  type="text"
                  placeholder="Employee ID..."
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none"
                />
              </div>
            </div>

            {/* Filter Document Type */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">Document Type</label>
              <select
                value={filterDocType}
                onChange={(e) => setFilterDocType(e.target.value)}
                className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none"
              >
                <option value="All">All Types</option>
                {DOCUMENT_TYPES.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Filter Status */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none"
              >
                <option value="All">All Status</option>
                {STATUSES.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            {/* Reset Button */}
            <div className="flex items-end">
              <button
                onClick={handleReset}
                className="w-full rounded-2xl bg-[#36136E] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#2c0f5b]"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="space-y-6">
          {/* Documents Table */}
          <div>
            <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
              <div className="border-b border-slate-200 px-6 py-4">
                <h2 className="text-lg font-semibold text-[#36136E]">Documents</h2>
              </div>
              {filteredDocuments.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <FaFilePdf className="mb-3 text-5xl text-slate-300" />
                  <p className="text-slate-500">No employee documents available.</p>
                </div>
              ) : (
                <div className="max-h-[600px] overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-[#F4F0FB] border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-3 font-semibold text-slate-600">Employee ID</th>
                        <th className="px-6 py-3 font-semibold text-slate-600">Name</th>
                        <th className="px-6 py-3 font-semibold text-slate-600">Document Type</th>
                        <th className="px-6 py-3 font-semibold text-slate-600">Upload Date</th>
                        <th className="px-6 py-3 font-semibold text-slate-600">Status</th>
                        <th className="px-6 py-3 font-semibold text-slate-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {filteredDocuments.map((doc) => (
                        <tr key={doc.id} className="hover:bg-slate-50 transition">
                          <td className="px-6 py-3 font-medium text-slate-700">{doc.id}</td>
                          <td className="px-6 py-3 text-slate-600">{doc.name}</td>
                          <td className="px-6 py-3 text-slate-600">{doc.docType}</td>
                          <td className="px-6 py-3 text-slate-600">{doc.uploadDate}</td>
                          <td className="px-6 py-3">
                            <span className={getStatusBadgeClass(doc.status)}>
                              {doc.status}
                            </span>
                          </td>
                          <td className="px-6 py-3">
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setSelectedDoc(doc);
                                  setShowPreview(true);
                                }}
                                className="rounded-lg bg-[#F4F0FB] p-2 text-[#36136E] hover:bg-[#ece5fa] transition"
                                title="View Document"
                              >
                                <FaEye size={16} />
                              </button>
                              <button
                                className="rounded-lg bg-[#F4F0FB] p-2 text-[#36136E] hover:bg-[#ece5fa] transition"
                                title="Download Document"
                              >
                                <FaDownload size={16} />
                              </button>
                              {doc.status === "Pending Verification" && (
                                <button
                                  className="rounded-lg bg-emerald-100 p-2 text-emerald-700 hover:bg-emerald-200 transition"
                                  title="Verify Document"
                                >
                                  <FaCheckCircle size={16} />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Document Preview Panel */}
          {showPreview && (
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[#36136E]">Document Details</h3>
                <button
                  onClick={() => setShowPreview(false)}
                  className="rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <FaTimes size={20} />
                </button>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                <div className="rounded-2xl bg-[#F4F0FB] p-4">
                  <p className="text-xs font-semibold uppercase text-slate-500">Employee Name</p>
                  <p className="mt-1 text-slate-800">{selectedDoc.name}</p>
                </div>
                <div className="rounded-2xl bg-[#F4F0FB] p-4">
                  <p className="text-xs font-semibold uppercase text-slate-500">Employee ID</p>
                  <p className="mt-1 text-slate-800">{selectedDoc.id}</p>
                </div>
                <div className="rounded-2xl bg-[#F4F0FB] p-4">
                  <p className="text-xs font-semibold uppercase text-slate-500">Document Type</p>
                  <p className="mt-1 text-slate-800">{selectedDoc.docType}</p>
                </div>
                <div className="rounded-2xl bg-[#F4F0FB] p-4">
                  <p className="text-xs font-semibold uppercase text-slate-500">Upload Date</p>
                  <p className="mt-1 text-slate-800">{selectedDoc.uploadDate}</p>
                </div>
                <div className="rounded-2xl bg-[#F4F0FB] p-4">
                  <p className="text-xs font-semibold uppercase text-slate-500">Status</p>
                  <p className="mt-2">
                    <span className={getStatusBadgeClass(selectedDoc.status)}>
                      {selectedDoc.status}
                    </span>
                  </p>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <button className="flex-1 rounded-2xl border border-[#36136E] bg-white px-4 py-2 text-sm font-semibold text-[#36136E] hover:bg-[#F4F0FB] transition">
                  View Document
                </button>
                {selectedDoc.status === "Pending Verification" && (
                  <button className="flex-1 rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition">
                    Verify Document
                  </button>
                )}
                <button className="flex-1 rounded-2xl border border-[#36136E] bg-white px-4 py-2 text-sm font-semibold text-[#36136E] hover:bg-[#F4F0FB] transition">
                  Download
                </button>
                <button
                  onClick={() => setShowPreview(false)}
                  className="flex-1 rounded-2xl bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-300 transition"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

