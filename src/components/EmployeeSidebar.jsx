import {
    FaHome,
    FaUser,
    FaClock,
    FaCalendarAlt,
    FaBullhorn,
    FaMoneyCheckAlt,
    FaBell,
    FaSignOutAlt,
} from "react-icons/fa"
import { useNavigate } from "react-router-dom";

export default function EmployeeSidebar({activeMenu,setActiveMenu,}) {

    const menuItems = [
        {
            name:"Dashboard",
            path:"/employee/dashboard",
            icon : <FaHome/>,
        },
        {
            name : "My Profile",
            path:"/employee/profile",
            icon: <FaUser/>
        },
        {
            name: "Attendance",
            path:"/employee/attendance",
            icon: <FaClock/>
        },
        {
            name: "Leave",
            path:"/employee/leave",
            icon: <FaCalendarAlt/>
        },
        {
            name: "Complaints",
            path:"/employee/complaints",
            icon: <FaBullhorn/>
        },
        {
            name: "Payslip",
            path:"/employee/payslip",
            icon: <FaMoneyCheckAlt/>
        },
        {
            name: "Notifications",
            path:"/employee/notifications",
            icon: <FaBell/>
        },
    ];
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        navigate("/");
    };

    return(
        <div className="flex min-h-screen w-72 flex-col bg-slate-900 text-white">
            {/* logo */}

            <div className="border-b border-slate-700 p-6">
                <h1 className="text-3xl font-bold tracking-wide">
                    WorkOne
                </h1>

                <p className="mt-2 text-sm text-slate-400">
                    Employee Portal
                </p>
            </div>

            {/* Menu */}

            <div className="flex-1 px-4 py-6">
                <ul className="space-y-3">
                    {menuItems.map((item,index) => (
                        <li 
                            key={index}
                            onClick={() => navigate(item.path)}
                            className="flex cursor-pointer items-center gap-4 rounded-2xl px-4 py-4 text-lg transition duration hover:bg-slate-800"
                        >
                            <span className="text-xl text-blue-400">
                                {item.icon}
                            </span>

                            <span className="font-medium">
                                {item.name}
                            </span>

                        </li>
                    ))}
                </ul>
            </div>


            {/* logout */}

            <div className="border-t border-slate-700 p-4">
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-4 rounded-2xl bg-red-500 px-4 py-4 text-lg font-medium transition duration-300 hover:bg-red-600">
                        <FaSignOutAlt/>

                        Logout
                    </button>
            </div>
        </div>
    );
}