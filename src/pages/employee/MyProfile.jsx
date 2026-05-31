import { FaUser,FaUserEdit,FaKey,FaFileAlt,FaChevronRight } from "react-icons/fa";

export default function MyProfile() {
  const cards = [
    {
      title: "View Personal Information",
      description: "Access your contact, emergency, and job details in one place.",
      icon: (
        <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-blue-50 text-blue-600">
          <FaUser className="text-2xl"/>
        </div>
      ),
    },
    {
      title: "Update Profile Details",
      description: "Keep your personal and professional profile information current.",
      icon: (
        <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-blue-50 text-blue-600">
          <FaUserEdit className="text-2xl"/>
        </div>
      ),
    },
    {
      title: "Change Password",
      description: "Update your password regularly to secure your employee account.",
      icon: (
        <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-blue-50 text-blue-600">
            <FaKey className="text-2xl"/>
        </div>
      ),
    },
    {
      title: "View Uploaded Documents",
      description: "Review your certificates, agreements, and HR documents anytime.",
      icon: (
        <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-blue-50 text-blue-600">
          <FaFileAlt className="text-2xl"/>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8  text-slate-900">
      <div className="rounded-3xl bg-white p-8 shadow-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Employee Profile</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">My Profile</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Manage your profile settings, access personal information, and keep your HR records updated with secure, easy-to-use actions.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-900 px-6 py-4 text-white shadow-md shadow-slate-900/10">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-300">Current Status</p>
            <p className="mt-2 text-2xl font-semibold text-white">Active Employee</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <button
            key={card.title}
            type="button"
            className="group overflow-hidden rounded-3xl bg-white p-6 text-left shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-center justify-between gap-4">
              {card.icon}
              <div className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white">Action</div>
            </div>
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-slate-900 transition group-hover:text-blue-600">
                {card.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {card.description}
              </p>
            </div>
            <div className="mt-8 flex items-center text-sm font-medium text-slate-500 transition group-hover:text-blue-600">
              <span>Open</span>
              <FaChevronRight className="ml-2 text-sm"/>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
