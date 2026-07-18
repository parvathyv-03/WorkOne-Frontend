import { useEffect, useState } from "react";
import { FaCalendarCheck,FaUserTimes,FaExclamationCircle,FaClock,FaSignInAlt,FaSignOutAlt,FaCalendarAlt,FaChartBar,FaStopwatch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Attendance() {
  const navigate = useNavigate();

  const actionCards = [
    {
      title: "Monthly Report",
      path:"/employee/attendance/monthly-report",
      icon: (
        <FaChartBar/>
      ),
    },
  ];

  const[checkedIn,setCheckedIn] = useState(false);
  const[checkInTime,setCheckedInTime]=useState(null);
  const[elapsed,setElapsed]=useState("00:00:00");

  const [calendarData,setCalendarData] = useState([]);
  const [recentActivity,setRecentActivity] = useState([])
  const [summary,setSummary] = useState(null);

    const summaryCards = [
    {
      title: "Present Days",
      value: summary?.present_days || 0,
      subtitle: "This month",
      icon: (
        <FaCalendarCheck/>
      ),
    },
    {
      title: "Absent Days",
      value: summary?.absent_days || 0,
      subtitle: "This month",
      icon: (
        <FaUserTimes/>
      ),
    },
    {
      title: "Late Check-ins",
      value: summary?.late_days || 0,
      subtitle: "This month",
      icon: (
        <FaExclamationCircle/>
      ),
    },
    {
      title: "Total Work Hours",
      value: `${summary?.total_hours || 0}h`,
      subtitle: "This month",
      icon: (
        <FaClock/>
      ),
    },
  ];

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    fetch(
      "http://127.0.0.1:8000/api/attendance/calendar/",{
        headers:{
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => res.json())
    .then((data) => setCalendarData(data));
  },[]);

  useEffect(() => {
    const token = 
    localStorage.getItem("accessToken");

    fetch(
      "http://127.0.0.1:8000/api/attendance/recent/",
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    )

    .then(res => res.json())
    .then(data => setRecentActivity(data));
  },[]);

  

  useEffect(() => {
    const token =
    localStorage.getItem("accessToken");

    fetch(
      "http://127.0.0.1:8000/api/attendance/summary/",
      {
        headers:{
          Authorization:
          `Bearer ${token}`
        }
      }
    )

    .then(res => res.json())
    .then(data => setSummary(data));
  },[]);


  useEffect(() => {
     const token = localStorage.getItem("accessToken");

     fetch(
      "http://127.0.0.1:8000/api/attendance/status/",
      {
        headers:{
          Authorization:
          `Bearer ${token}`
        }
      }
     )
     .then(res => res.json())
     .then(data => {
      setCheckedIn(
        data.check_in &&
        !data.checked_out
      );

      setCheckedInTime(data.check_in);
     });
  },[])

  const handleAttendance =
  async () => {
    const token = localStorage.getItem("accessToken");
    const url = checkedIn
    ? "attendance/check-out/"
    :"attendance/check-in/";

    const response =
    await fetch(
      `http://127.0.0.1:8000/api/${url}`,
      {
        method:"POST",
        headers:{
          Authorization:
          `Bearer ${token}`
        }
      }
    );

    const data = await response.json();

    if(response.ok){
      if(checkedIn){
        setCheckedIn(false);
        setCheckedInTime(null);
      } else {
        setCheckedIn(true);
        setCheckedInTime(new Date(data.check_in));
      }
    }
  };

  useEffect(() => {

      if(
          !checkedIn ||
          !checkInTime
      ) return;

      const interval =
      setInterval(() => {

          const diff =
          Math.floor(
              (
                  new Date() -
                  new Date(checkInTime)
              ) / 1000
          );

          const hours =
          String(
              Math.floor(diff/3600)
          ).padStart(2,"0");

          const minutes =
          String(
              Math.floor(
                  (diff%3600)/60
              )
          ).padStart(2,"0");

          const seconds =
          String(
              diff%60
          ).padStart(2,"0");

          setElapsed(
              `${hours}:${minutes}:${seconds}`
          );

      },1000);

      return () =>
          clearInterval(interval);

  },[
      checkedIn,
      checkInTime
  ]);


  return (
    <div className="space-y-8  text-slate-900">
      {/* Page Heading */}
      <div className="rounded-3xl bg-white p-8 shadow-md">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Employee Management</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-900">Attendance</h1>
        <p className="mt-2 text-slate-600">Track your daily check-ins, work hours, and attendance records.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card) => (
          <div
            key={card.title}
            className="overflow-hidden rounded-3xl bg-white p-6 shadow-md transition duration-300 hover:shadow-xl"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-600">{card.title}</p>
                <p className="mt-3 text-3xl font-bold text-slate-900">{card.value}</p>
                <p className="mt-2 text-xs text-slate-500">{card.subtitle}</p>
              </div>
              <div className="rounded-2xl bg-blue-50 p-3 text-blue-600">
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Attendance Actions Section */}
      <div>
        <h2 className="mb-6 text-xl font-semibold text-slate-900">Quick Actions</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 mb-6">

          <div
            className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
            onClick={handleAttendance}
          >
            <div className="flex flex-col items-center gap-4">

              <div
                className={`rounded-2xl p-4 text-white transition duration-300
                ${
                  checkedIn
                    ? "bg-red-600"
                    : "bg-green-600"
                }`}
              >
                {checkedIn ? (
                  <FaSignOutAlt />
                ) : (
                  <FaSignInAlt />
                )}
              </div>

              <p className="text-center text-sm font-semibold text-slate-900">
                {checkedIn ? "Check Out" : "Check In"}
              </p>

              {checkedIn && (
                <p className="text-xs font-medium text-blue-600">
                  {elapsed}
                </p>
              )}

            </div>
          </div>
          {actionCards.map((card) => (
            <button
              key={card.title}
              onClick={() => navigate(card.path)}
              type="button"
              className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 p-4 text-blue-600 transition duration-300 group-hover:from-blue-100 group-hover:to-blue-200">
                  {card.icon}
                </div>
                <p className="text-center text-sm font-semibold text-slate-900 transition group-hover:text-blue-600">
                  {card.title}
                </p>
              </div>
            </button>
          ))}

        </div>
      </div>

      {/* Recent Attendance Activity */}
      <div className="rounded-3xl bg-white p-8 shadow-md">
        <h2 className="mb-6 text-xl font-semibold text-slate-900">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b border-slate-100 px-4 py-4 transition hover:bg-slate-50"
            >
              <div className="flex-1">
                <p className="font-medium text-slate-900">{activity.date}</p>
                <p className="mt-1 text-sm text-slate-600">
                  {activity.checkIn} - {activity.checkOut}
                </p>
              </div>
              <div className="flex items-center gap-6">
                <span
                  className={`rounded-full px-4 py-1 text-sm font-medium ${
                    activity.status === "On Time"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {activity.status}
                </span>
                <p className="w-20 text-right font-semibold text-slate-900">{activity.hours}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Attendance Calendar Preview */}
      <div className="rounded-3xl bg-white p-8 shadow-md">
        <h2 className="mb-6 text-xl font-semibold text-slate-900">Attendance Calendar</h2>
        <div className="grid grid-cols-7 gap-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="py-3 text-center text-xs font-semibold text-slate-600 uppercase">
              {day}
            </div>
          ))}
          {Array.from({ length: 35 }).map((_, index) => {
            const day = index - 2;
            const isCurrentMonth = day > 0 && day <= 31;
            const status = calendarData[day];

            return (
              <div
                key={index}
                className={`flex h-12 items-center justify-center rounded-lg text-sm font-medium  ${
                   status === "Present"
                      ? "bg-green-100 text-green-700"
                      : status === "Late"
                      ? "bg-yellow-100 text-yellow-700"
                      : status === "Absent"
                      ? "bg-red-100 text-red-700"
                      : "bg-slate-100 text-slate-600"
                }`}
              >
                {isCurrentMonth ? day : ""}
              </div>
            );
          })}
        </div>
        <div className="mt-6 flex gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-green-100"></div>
            <span className="text-slate-600">Present</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-red-100"></div>
            <span className="text-slate-600">Absent</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-slate-100"></div>
            <span className="text-slate-600">No Data</span>
          </div>
        </div>
      </div>
    </div>
  );
}