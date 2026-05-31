import { FaCalendarCheck,
         FaUserTimes,
         FaExclamationCircle,
         FaClock,
         FaSignInAlt,
         FaSignOutAlt,
         FaCalendarAlt,
         FaChartBar,
         FaStopwatch } from "react-icons/fa";

export default function Attendance() {
  const summaryCards = [
    {
      title: "Present Days",
      value: "18",
      subtitle: "This month",
      icon: (
        <FaCalendarCheck/>
      ),
    },
    {
      title: "Absent Days",
      value: "2",
      subtitle: "This month",
      icon: (
        <FaUserTimes/>
      ),
    },
    {
      title: "Late Check-ins",
      value: "5",
      subtitle: "This month",
      icon: (
        <FaExclamationCircle/>
      ),
    },
    {
      title: "Total Work Hours",
      value: "164h",
      subtitle: "This month",
      icon: (
        <FaClock/>
      ),
    },
  ];

  const actionCards = [
    {
      title: "Mark Check In",
      icon: (
        <FaSignInAlt/>
      ),
    },
    {
      title: "Mark Check Out",
      icon: (
        <FaSignOutAlt/>
      ),
    },
    {
      title: "View Attendance Calendar",
      icon: (
        <FaCalendarAlt/>
      ),
    },
    {
      title: "Monthly Report",
      icon: (
        <FaChartBar/>
      ),
    },
    {
      title: "Work Hour Summary",
      icon: (
        <FaStopwatch/>
      ),
    },
  ];

  const recentActivity = [
    { date: "May 28, 2024", checkIn: "09:15 AM", checkOut: "06:45 PM", status: "On Time", hours: "9h 30m" },
    { date: "May 27, 2024", checkIn: "09:45 AM", checkOut: "07:10 PM", status: "Late", hours: "9h 25m" },
    { date: "May 26, 2024", checkIn: "09:00 AM", checkOut: "06:30 PM", status: "On Time", hours: "9h 30m" },
    { date: "May 25, 2024", checkIn: "09:20 AM", checkOut: "06:55 PM", status: "On Time", hours: "9h 35m" },
    { date: "May 24, 2024", checkIn: "10:15 AM", checkOut: "07:30 PM", status: "Late", hours: "9h 15m" },
  ];

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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {actionCards.map((card) => (
            <button
              key={card.title}
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
            const isPresent = isCurrentMonth && Math.random() > 0.15;
            const isAbsent = isCurrentMonth && !isPresent && Math.random() > 0.7;

            return (
              <div
                key={index}
                className={`flex h-12 items-center justify-center rounded-lg text-sm font-medium transition ${
                  !isCurrentMonth
                    ? "text-slate-300"
                    : isPresent
                      ? "bg-green-100 text-green-700"
                      : isAbsent
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