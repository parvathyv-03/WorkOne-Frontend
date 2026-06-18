import {FaClock,FaCalendarAlt,FaExclamationCircle,FaMoneyCheckAlt,} from "react-icons/fa";
import { useState,useEffect } from "react";

export default function EmployeeDashboard(){
    const username = localStorage.getItem("username")

    const [activeMenu,setActiveMenu] = useState("dashboard");
    const [dashboardData,setDashboardData] = useState(null);

    useEffect(() => {
        fetchDashboardData();
    },[]);

    const fetchDashboardData = async () => {
        const token = localStorage.getItem("accessToken");

        const response = await fetch(
            "http://127.0.0.1:8000/api/employee/dashboard/",
            {
                headers:{
                    Authorization:`Bearer ${token}`,
                },
            }
        );

        if (!response.ok){
            console.error("Dashboard API failed");
            return;
        }

        const data = await response.json();
        setDashboardData(data);
    };

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
                                        {dashboardData?.attendance?.status}
                                    </h2>

                                    <p className="mt-2 text-sm text-gray-400">
                                        Check-in : {dashboardData?.attendance?.check_in}
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
                                        {dashboardData?.leave?.total} Days
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
                                        {dashboardData?.complaints?.pending} Pending
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
                                        {dashboardData?.payslip?.month}
                                    </h2>
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
                                                    {dashboardData?.attendance?.days_present}
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
                                            {dashboardData?.leave?.casual} Days
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
                                            {dashboardData?.leave?.sick} Days
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
                                            {dashboardData?.leave?.privilege} Days
                                        </h1>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-3xl bg-white p-6 shadow-md">
                                <h2 className="mb-6 text-2xl font-bold text-gray-800">
                                    Announcements
                                </h2>

                                <div className="space-y-5">

                                    {dashboardData?.announcements?.length > 0 ? (
                                        dashboardData.announcements.map((item) => (
                                            <div
                                                key={item.id}
                                                className="rounded-2xl bg-blue-50 p-5"
                                            >
                                                <h3 className="font-semibold text-blue-700">
                                                    {item.title}
                                                </h3>

                                                <p className="mt-2 text-sm leading-6 text-gray-600">
                                                    {item.description}
                                                </p>

                                                <p className="mt-2 text-xs text-gray-400">
                                                    {new Date(item.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500">
                                            No announcements available.
                                        </p>
                                    )}

                                </div>
                            </div>
                    </div>

                    {/* THIRD SECTION */}

                    <div className="mt-10 grid grid-cols-1 gap-6 xl:grid-cols-2">
                        
                        
                    </div>
                </div>
            </div>

           
        </div>
    );
}