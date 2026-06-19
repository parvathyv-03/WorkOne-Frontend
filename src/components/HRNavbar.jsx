import { FaBell,FaSearch } from "react-icons/fa";

export default function HRNavbar(){
    return (
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2 shadow-sm">
            {/* Left side */}

            <div>
                <h1 className="text-3xl font-bold text-slate-800">
                    WorkOne.
                </h1>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search.."
                        className="w-80 rounded-full border border-gray-300 bg-gray-100 py-3 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:bg-white"
                    />

                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"/>
                </div>

                {/* notification button */}
                <button className="relative rounded-full bg-gray-100 p-4 transition hover:bg-gray-200">
                    <FaBell className="text-xl text-slate-700"/>

                    {/* notification dot */}
                    <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-red-500"></span>
                </button>

                {/* Profile */}
                <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white shadow-md">
                    HR
                </div>
            </div>
        </div>
    )
}