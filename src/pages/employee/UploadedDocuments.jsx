import React, { useState,useEffect } from 'react'
import { FaFilePdf } from 'react-icons/fa'
import { AiOutlineEye } from 'react-icons/ai'
import { FiDownload, FiEdit, FiUpload } from 'react-icons/fi'
import { RiExchangeFill } from 'react-icons/ri'

const DUMMY_DOCS = [
  {
    id: 1,
    name: 'Resume.pdf',
    category: 'Resume',
    uploadDate: '2026-05-10',
    modifiedDate: '2026-05-12',
    size: '124 KB',
    status: 'Verified',
    description: 'Latest CV with updated projects and certifications.'
  },
  {
    id: 2,
    name: 'Degree_Certificate.pdf',
    category: 'Degree Certificate',
    uploadDate: '2024-08-01',
    modifiedDate: '2024-08-01',
    size: '1.2 MB',
    status: 'Verified',
    description: 'Bachelor of Technology degree certificate.'
  },
  {
    id: 3,
    name: 'Experience_Certificate.pdf',
    category: 'Experience Certificate',
    uploadDate: '2025-02-15',
    modifiedDate: '2025-02-20',
    size: '560 KB',
    status: 'Pending Verification',
    description: 'Experience certificate from previous employer.'
  },
  {
    id: 4,
    name: 'Offer_Letter.pdf',
    category: 'Offer Letter',
    uploadDate: '2023-11-04',
    modifiedDate: '2023-11-04',
    size: '98 KB',
    status: 'Verified',
    description: 'Original offer letter for current employment.'
  }
]

function Badge({ status }) {
  const verified = status.toLowerCase().includes('verified')
  const pending = status.toLowerCase().includes('pending')
  return (
    <span className={
      `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${verified ? 'bg-green-100 text-green-800' : pending ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`
    }>
      {status}
    </span>
  )
}

export default function UploadedDocuments() {
  const [docs,setDocs] = useState([])

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    fetch(
        "http://127.0.0.1:8000/api/employee/documents/",
        {
            headers:{
                Authorization:`Bearer ${token}`,
            },
        }
    )

    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        setDocs(data);
    })
    .catch((err) => console.log(err));
  },[]);

  const [previewDoc, setPreviewDoc] = useState(null)
  const [editDoc, setEditDoc] = useState(null)
  const [replaceDoc, setReplaceDoc] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)

  // Summary
  const total = docs.length
  const verified = docs.filter(d => d.status.toLowerCase().includes('verified')).length
  const pending = docs.filter(d => d.status.toLowerCase().includes('pending')).length
  const lastUpload = 
    docs.length > 0 ? docs.reduce((a,b) => a.uploaded_at > b.uploaded_at ? a:b ).uploaded_at : "N/A";

  function handleView(doc) {
    window.open(doc.document_url,"_blank");
  }

  function handleDownload(doc) {
    // placeholder: in real app, trigger download
    window.open(doc.document_url,"_blank");
  }

  function handleReplace(doc) {
    setReplaceDoc(doc)
    setSelectedFile(null)
  }

  function handleEdit(doc) {
    setEditDoc({ ...doc })
  }

  function closeAll() {
    setPreviewDoc(null)
    setEditDoc(null)
    setReplaceDoc(null)
    setSelectedFile(null)
  }

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="text-sm font-semibold text-[#2563eb] uppercase">Employee Documents</div>
        <h1 className="text-2xl font-bold text-slate-900">Uploaded Documents</h1>
        <p className="text-sm text-slate-500">View and manage your uploaded employment documents.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl shadow-md p-4">
          <div className="text-xs text-slate-500">Total Documents</div>
          <div className="text-2xl font-semibold text-slate-900">{total}</div>
        </div>
        <div className="bg-white rounded-3xl shadow-md p-4">
          <div className="text-xs text-slate-500">Verified Documents</div>
          <div className="text-2xl font-semibold text-slate-900">{verified}</div>
        </div>
        <div className="bg-white rounded-3xl shadow-md p-4">
          <div className="text-xs text-slate-500">Pending Documents</div>
          <div className="text-2xl font-semibold text-slate-900">{pending}</div>
        </div>
        <div className="bg-white rounded-3xl shadow-md p-4">
          <div className="text-xs text-slate-500">Last Upload Date</div>
          <div className="text-2xl font-semibold text-slate-900">{lastUpload}</div>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {docs.map(doc => (
          <div key={doc.id} className="bg-white rounded-3xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-lg bg-[#f8fafc] flex items-center justify-center text-[#dc2626]">
                  <FaFilePdf className="w-7 h-7" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-lg font-medium text-slate-900">{doc.category}</div>
                    <div className="text-sm text-slate-500 mt-1">{doc.description}</div>
                  </div>
                  <div className="text-right space-y-2">
                    <Badge status={doc.status} />
                    {/* <div className="text-xs text-slate-400">{doc.size}</div> */}
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-slate-500">
                  <div>Uploaded: <span className="text-slate-700 font-medium">{new Date(doc.uploaded_at).toLocaleDateString()}</span></div>
                  <div>Modified: <span className="text-slate-700 font-medium">{new Date(doc.updated_at).toLocaleDateString()}</span></div>
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  <button onClick={() => handleView(doc)} className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-[#2563eb] text-white text-sm hover:opacity-95 transition">
                    <AiOutlineEye /> View PDF
                  </button>

                  <button onClick={() => handleDownload(doc)} className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white border border-slate-200 text-sm text-slate-700 hover:shadow-sm transition">
                    <FiDownload /> Download
                  </button>

                  <button onClick={() => handleReplace(doc)} className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white border border-slate-200 text-sm text-slate-700 hover:shadow-sm transition">
                    <RiExchangeFill /> Replace Document
                  </button>

                  
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setPreviewDoc(null)} />
          <div className="relative bg-white w-[95%] md:w-3/4 lg:w-2/3 rounded-3xl shadow-xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <div className="text-sm text-slate-500">Preview</div>
                <div className="text-lg font-semibold text-slate-900">{previewDoc.name}</div>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => handleDownload(previewDoc)} className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-[#2563eb] text-white text-sm">
                  <FiDownload /> Download
                </button>
                <button onClick={() => setPreviewDoc(null)} className="px-3 py-2 rounded-full bg-white border">Close</button>
              </div>
            </div>
            <div className="p-6">
              <div className="w-full h-[60vh] bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
                <div className="text-center">
                  <FaFilePdf className="mx-auto text-red-500 w-12 h-12" />
                  <div className="mt-4 font-medium text-slate-700">PDF Preview Placeholder</div>
                  <div className="mt-2 text-sm text-slate-500">Rendering of the PDF will appear here.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Replace Modal */}
      {replaceDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setReplaceDoc(null)} />
          <div className="relative bg-white w-full max-w-xl rounded-3xl shadow-xl overflow-hidden">
            <div className="p-6 border-b">
              <div className="text-lg font-semibold">Replace Document</div>
              <div className="text-sm text-slate-500">Replace: {replaceDoc.name}</div>
            </div>
            <div className="p-6">
              <div
                className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center cursor-pointer"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault()
                  const f = e.dataTransfer.files?.[0]
                  if (f && f.type === 'application/pdf') setSelectedFile(f)
                  else if (f) alert('Please upload a PDF file')
                }}
              >
                <div className="flex items-center justify-center gap-3">
                  <FiUpload className="w-6 h-6 text-slate-400" />
                  <div>
                    <div className="font-medium">Drag & drop a PDF here</div>
                    <div className="text-sm text-slate-500">or click to browse</div>
                  </div>
                </div>
                <input type="file" accept="application/pdf" onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)} className="mt-4 w-full" />
                {selectedFile && <div className="mt-3 text-sm text-slate-700">Selected: {selectedFile.name}</div>}
                <div className="mt-4">
                  <div className="w-full h-3 bg-slate-100 rounded-full">
                    <div className="h-3 bg-[#2563eb] rounded-full w-1/3 transition-all" />
                  </div>
                  <div className="text-xs text-slate-400 mt-2">Upload progress placeholder</div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-3">
                <button onClick={() => setReplaceDoc(null)} className="px-4 py-2 rounded-full bg-white border">Cancel</button>
                <button onClick={() => { alert('Replaced (placeholder)'); setReplaceDoc(null) }} className="px-4 py-2 rounded-full bg-[#2563eb] text-white">Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
