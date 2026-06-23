import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaFolderOpen } from "react-icons/fa";

export default function ManageEmployeesHome() {
  const navigate = useNavigate();

  const stats = {
    total: 0,
    active: 0,
    documents: 0,
  };

  return (
    <div className="min-h-screen bg-[#F4F0FB] p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-[#36136E]">Employee Management</h1>
          <p className="mt-2 text-sm md:text-base text-gray-600">
            Manage employee records, onboarding, and employee documents from one centralized workspace.
          </p>
        </header>

        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-8 shadow-sm hover:-translate-y-2 hover:shadow-lg transition-transform duration-200">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-purple-100 text-[#36136E] text-2xl">
                  <FaUsers />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-[#36136E]">Employee Records</h2>
                  <p className="mt-2 text-sm text-gray-600">
                    Create employee accounts, manage employee profiles, update information, and maintain employee records.
                  </p>

                  <ul className="mt-4 space-y-2 text-sm text-gray-700">
                    <li className="flex items-center gap-3"><span className="inline-block w-2 h-2 bg-[#36136E] rounded-full" /> Add New Employee</li>
                    <li className="flex items-center gap-3"><span className="inline-block w-2 h-2 bg-[#36136E] rounded-full" /> View Employee Profiles</li>
                    <li className="flex items-center gap-3"><span className="inline-block w-2 h-2 bg-[#36136E] rounded-full" /> Update Employee Details</li>
                    <li className="flex items-center gap-3"><span className="inline-block w-2 h-2 bg-[#36136E] rounded-full" /> Manage Employee Information</li>
                  </ul>

                  <div className="mt-6">
                    <button onClick={() => navigate("/hr/employees/addemployee")} className="bg-[#36136E] text-white px-4 py-2 rounded-full shadow hover:opacity-95 transition">
                      Open Employee Records
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm hover:-translate-y-2 hover:shadow-lg transition-transform duration-200">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-purple-100 text-[#36136E] text-2xl">
                  <FaFolderOpen />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-[#36136E]">Employee Documents</h2>
                  <p className="mt-2 text-sm text-gray-600">
                    View and manage documents uploaded by employees including certificates, identification documents, and employment records.
                  </p>

                  <ul className="mt-4 space-y-2 text-sm text-gray-700">
                    <li className="flex items-center gap-3"><span className="inline-block w-2 h-2 bg-[#36136E] rounded-full" /> Uploaded Certificates</li>
                    <li className="flex items-center gap-3"><span className="inline-block w-2 h-2 bg-[#36136E] rounded-full" /> Identity Documents</li>
                    <li className="flex items-center gap-3"><span className="inline-block w-2 h-2 bg-[#36136E] rounded-full" /> Employee Files</li>
                    <li className="flex items-center gap-3"><span className="inline-block w-2 h-2 bg-[#36136E] rounded-full" /> Verification Documents</li>
                  </ul>

                  <div className="mt-6">
                    <button onClick={() => navigate("/hr/employees/uploadeddocuments")} className="bg-[#36136E] text-white px-4 py-2 rounded-full shadow hover:opacity-95 transition">
                      View Documents
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
