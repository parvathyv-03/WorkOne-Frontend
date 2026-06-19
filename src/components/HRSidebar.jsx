import {
  FaHome,
  FaUsers,
  FaCalendarAlt,
  FaClock,
  FaComments,
  FaMoneyCheckAlt,
  FaUserTie,
  FaChartBar,
  FaBell,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function HRSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/hr/dashboard",
      icon: <FaHome />,
    },
    {
      name: "Manage Employees",
      path: "/hr/employees",
      icon: <FaUsers />,
    },
    {
      name: "Leave Management",
      path: "/hr/leave",
      icon: <FaCalendarAlt />,
    },
    {
      name: "Attendance Tracking",
      path: "/hr/attendance",
      icon: <FaClock />,
    },
    {
      name: "Complaint Management",
      path: "/hr/complaints",
      icon: <FaComments />,
    },
    {
      name: "Payslip Management",
      path: "/hr/payslip",
      icon: <FaMoneyCheckAlt />,
    },
    {
      name: "Recruitment & Interviews",
      path: "/hr/recruitment",
      icon: <FaUserTie />,
    },
    {
      name: "Reports & Analytics",
      path: "/hr/reports",
      icon: <FaChartBar />,
    },
    {
      name: "Notifications",
      path: "/hr/notification",
      icon: <FaBell />,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <aside className="flex min-h-screen w-72 flex-col bg-slate-900 text-white">
      <div className="border-b border-slate-700 p-6">
        <h1 className="text-3xl font-bold tracking-wide">WorkOne</h1>
        <p className="mt-2 text-sm text-slate-400">HR Portal</p>
      </div>

      <div className="flex-1 px-4 py-6">
        <ul className="space-y-3">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-2xl px-4 py-4 text-lg font-medium no-underline transition duration-300 ${
                  isActive
                    ? "bg-[#36136E] text-white shadow-lg"
                    : "text-gray-300 hover:bg-slate-800"
                }`
              }
            >
              <span
                className={`text-xl transition duration-300 ${
                  location.pathname === item.path
                    ? "text-white"
                    : "text-purple-300"
                }`}
              >
                {item.icon}
              </span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </ul>
      </div>

      <div className="border-t border-slate-700 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-4 rounded-2xl bg-red-500 px-4 py-4 text-lg font-medium text-white transition duration-300 hover:bg-red-600"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
}
