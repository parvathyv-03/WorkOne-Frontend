
import {
        FaClock,
        FaCalendarAlt,
        FaExclamationCircle,
        FaMoneyCheckAlt,
} from "react-icons/fa";
import { useState } from "react";

export default function EmployeeDashboard(){
    const username = localStorage.getItem("username")

    const [activeMenu,setActiveMenu] = useState("dashboard");
    return(
        <div className="flex">
            

            <div className="flex-1 bg-gray-100 min-h-screen">
               

                <div className="p-8">
                    <h1 className="text-4xl font-bold text-gray-800">
                        Welcome Back, {username}
                    </h1>

                    <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                        <div className="rounded-3xl bg-white p-6 shadow-md transition hover:shadow-xl">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500">
                                        Attendance
                                    </p>

                                    <h2 className="mt-2 text-3xl font-bold text-gray-800">
                                        Present
                                    </h2>

                                    <p className="mt-2 text-sm text-gray-400">
                                        Check-in : 9:12 AM
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-blue-100 p-4 text-3xl text-blue-600">
                                    <FaClock/>
                                </div>
                            </div>

                        </div>

                        {/* leave card */}

                        <div className="rounded-3xl bg-white p-6 shadow-md transition hover:shadow-xl">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500">
                                        Leave Balance
                                    </p>

                                    <h2 className="mt-2 text-3xl font-bold text-gray-800">
                                        12 Days
                                    </h2>

                                    <p className="mt-2 text-sm text-gray-400">
                                        Annual leave remaining
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-green-100 p-4 text-3xl text-green-600">
                                    <FaCalendarAlt/>
                                </div>
                            </div>
                        </div>

                        {/* complaint card */}

                        <div className="rounded-3xl bg-white p-6 shadow-md transition hover:shadow-xl">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500">
                                        Complaints
                                    </p>

                                    <h2 className="mt-2 text-3xl font-bold text-gray-800">
                                        2 Pending
                                    </h2>

                                    <p className="mt-2 text-sm text-gray-400">
                                        Requires Attention
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-orange-100 p-4 text-3xl text-orange-500">
                                    <FaExclamationCircle/>
                                </div>
                            </div>
                        </div>

                        {/* payslip card */}

                        <div className="rounded-3xl bg-white p-6 shadow-md transition hover:shadow-xl">

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500">
                                        Latest Payslip
                                    </p>

                                    <h2 className="mt-2 text-3xl font-bold text-gray-800">
                                        April 2026
                                    </h2>

                                    <p className="mt-2 text-sm text-blue-500">
                                        View Payslip
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-purple-100 p-4 text-3xl text-purple-600">
                                    <FaMoneyCheckAlt/>
                                </div>
                            </div>
                        </div>
                    </div>
                        <div className="mt-10 grid grid-cols-1 gap-6 xl:grid-cols-3">
                                {/* attendance overview */}

                                <div className="rounded-3xl bg-white p-6 shadow-md">
                                    <h2 className="mb-6 text-2xl font-bold text-gray-800">
                                        Attendance Overview
                                    </h2>

                                    <div className="flex flex-col items-center justify-center">
                                        <div className="flex h-40 w-40 items-center justify-center rounded-full border-8 border-blue-500">
                                            <div className="text-center">
                                                <h1 className="text-4xl font-bold text-gray-800">
                                                    20
                                                </h1>

                                                <p className="text-gray-500">
                                                    Days Present
                                                </p>
                                            </div>
                                        </div>


                                        <p className="mt-6 text-gray-400">
                                            This month (May 2026)
                                        </p>
                                    </div>
                                </div>
                        

                            {/* leave balance */}

                            <div className="rounded-3xl bg-white p-6 shadow-md">
                                <h2 className="mb-6 text-2xl font-bold text-gray-800">
                                    Leave Balance
                                </h2>

                                <div className="space-y-5">
                                    <div className="flex items-center justify-between rounded-2xl bg-gray-50 p-4">
                                        <div>
                                            <p className="font-semibold text-gray-700">
                                                Casual Leave
                                            </p>

                                            <p className="text-sm text-gray-400">
                                                Remaining
                                            </p>
                                        </div>

                                        <h1 className="text-xl font-bold text-blue-700">
                                            6 Days
                                        </h1>
                                    </div>

                                    <div className="flex items-center justify-between rounded-2xl bg-gray-50 p-4">
                                        <div>
                                            <p className="font-semibold text-gray-700">
                                                Sick Leave
                                            </p>

                                            <p className="text-sm text-gray-400">
                                                Remaining
                                            </p>
                                        </div>

                                        <h1 className="text-xl font-bold text-green-600">
                                            3 Days
                                        </h1>
                                    </div>

                                    <div className="flex items-center justify-between rounded-2xl bg-gray-50 p-4">
                                        <div>
                                            <p className="font-semibold text-gray-700">
                                                Privilege Leave
                                            </p>

                                            <p className="text-sm text-gray-400">
                                                Remaining
                                            </p>
                                        </div>

                                        <h1 className="text-xl font-bold text-orange-500">
                                            3 Days
                                        </h1>
                                    </div>
                                </div>
                            </div>

                            {/* upcoming events */}

                            <div className="rounded-3xl bg-white p-6 shadow-md">
                                <h2 className="mb-6 text-2xl font-bold text-gray-800">
                                    Upcoming Events
                                </h2>

                                <div className="space-y-5">

                                    <div className="rounded-2xl bg-gray-50 p-4">
                                        <h3 className="font-semibold text-gray-800">
                                            Team Meeting
                                        </h3>

                                        <p className="mt-1 text-sm text-gray-400">
                                            May 20 | 10:00 AM
                                        </p>
                                    </div>

                                    <div className="rounded-2xl bg-gray-50 p-4">
                                        <h3 className="font-semibold text-gray-800">
                                            Project Deadline
                                        </h3>

                                        <p className="mt-1 text-sm text-gray-400">
                                            May 22 | End of day
                                        </p>
                                    </div>

                                    <div className="rounded-2xl bg-gray-50 p-4">
                                        <h3 className="font-semibold text-gray-800">
                                            HR Policy Update
                                        </h3>

                                        <p className="mt-1 text-sm text-gray-400">
                                            May 25 | 2:00 PM
                                        </p>
                                    </div>
                                </div>
                            </div>
                    </div>

                    {/* THIRD SECTION */}

                    <div className="mt-10 grid grid-cols-1 gap-6 xl:grid-cols-2">
                        {/* RECENT ACTIVITIES */}

                        <div className="rounded-3xl bg-white p-6 shadow-md">

                            <h2 className="mb-6 text-2xl font-bold text-gray-800">
                                Recent Activities
                            </h2>

                            <div className="space-y-5">

                                <div className="flex items-start gap-4 border-b pb-4">

                                    <div className="mt-1 h-3 w-3 rounded-full bg-green-500"></div>

                                    <div>
                                        <p className="font-medium text-gray-700">
                                            Your leave request has been approved.
                                        </p>

                                        <p className="text-sm text-gray-400">
                                            2 Hours ago.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 border-b pb-4">
                                    <div className="mt-1 h-3 w-3 rounded-full bg-blue-500"></div>

                                        <div>
                                            <p className="font-medium text-gray-700">
                                                You checked in at 9:12 AM.
                                            </p>

                                            <p className="text-sm text-gray-400">
                                                Today
                                            </p>
                                        </div>
                                </div>
                                    

                                    <div className="flex items-start gap-4">

                                        <div className="mt-1 h-3 w-3 rounded-full bg-orange-500"></div>

                                        <div>
                                            <p className="font-medium text-gray-700">
                                                New payslip is available.
                                            </p>

                                            <p className="text-sm text-gray-400">
                                                Yesterday
                                            </p>
                                        </div>
                                    </div>
                                
                            </div>
                        </div>
                            {/* announcements */}

                            <div className="rounded-3xl bg-white p-6 shadow-md">

                                <h2 className="mb-6 text-2xl font-bold text-gray-800">
                                    Announcements
                                </h2>

                                <div className="space-y-5">
                                    <div className="rounded-2xl bg-blue-50 p-5">

                                        <h3 className="font-semibold text-blue-700">
                                            Holiday Notice
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-gray-600">
                                            Office will remain closed on May 26 due to public holiday.
                                        </p>
                                    </div>

                                    <div className="rounded-2xl bg-green-50 p-5">
                                        <h3 className="font-semibold text-green-700">
                                            Health Checkup Camp
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-gray-600">
                                            Free employee health checkup camp on May 30.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        
                    </div>
                </div>
            </div>

           
        </div>
    );
}