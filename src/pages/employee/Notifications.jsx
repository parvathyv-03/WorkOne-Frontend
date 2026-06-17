import { useState,useEffect } from "react";
import {FaBell,FaClipboardList,FaBullhorn,FaTools,FaCheckCircle,FaFileAlt,FaCalendarAlt,FaRegCalendar,FaRegClipboard,FaUsers,FaInfoCircle,FaRegBell,FaExclamationTriangle,} from "react-icons/fa";

// const summaryCards = [
//   {
//     title: "Leave Updates",
//     count: "28",
//     description: "Recent leave activity",
//     icon: <FaRegCalendar className="h-6 w-6" />,
//     accent: "bg-blue-50 text-blue-600",
//   },
//   {
//     title: "Complaint Updates",
//     count: "14",
//     description: "Pending and reviewed tickets",
//     icon: <FaRegClipboard className="h-6 w-6" />,
//     accent: "bg-yellow-50 text-yellow-700",
//   },
//   {
//     title: "HR Announcements",
//     count: "7",
//     description: "New company announcements",
//     icon: <FaBullhorn className="h-6 w-6" />,
//     accent: "bg-cyan-50 text-cyan-700",
//   },
//   {
//     title: "System Notifications",
//     count: "5",
//     description: "Updates and alerts",
//     icon: <FaTools className="h-6 w-6" />,
//     accent: "bg-slate-50 text-slate-800",
//   },
// ];

// const recentNotifications = [
//   {
//     title: "Leave Request Approved",
//     description: "Your leave request for May 28 has been approved.",
//     time: "Today • 10:15 AM",
//     category: "Leave",
//     badge: "bg-blue-100 text-blue-700",
//   },
//   {
//     title: "Leave Request Rejected",
//     description: "Your leave request for June 3 was rejected due to staffing.",
//     time: "Today • 9:20 AM",
//     category: "Leave",
//     badge: "bg-yellow-100 text-yellow-700",
//   },
//   {
//     title: "Complaint Status Updated",
//     description: "Your IT complaint is now under review by the support team.",
//     time: "Yesterday • 4:05 PM",
//     category: "Complaint",
//     badge: "bg-orange-100 text-orange-700",
//   },
//   {
//     title: "Complaint Resolved",
//     description: "Your workplace issue has been resolved successfully.",
//     time: "May 27 • 2:30 PM",
//     category: "Complaint",
//     badge: "bg-emerald-100 text-emerald-700",
//   },
//   {
//     title: "New HR Announcement",
//     description: "New policy updates are available in the HR portal.",
//     time: "May 26 • 11:00 AM",
//     category: "HR Announcement",
//     badge: "bg-cyan-100 text-cyan-700",
//   },
//   {
//     title: "Company Holiday Notice",
//     description: "The company will observe a public holiday on June 1.",
//     time: "May 25 • 3:45 PM",
//     category: "HR Announcement",
//     badge: "bg-indigo-100 text-indigo-700",
//   },
//   {
//     title: "Payroll Processed",
//     description: "Your monthly payroll has been successfully generated.",
//     time: "May 24 • 8:50 AM",
//     category: "System",
//     badge: "bg-slate-100 text-slate-800",
//   },
//   {
//     title: "System Maintenance Notification",
//     description: "Scheduled maintenance tonight from 11 PM to 1 AM.",
//     time: "May 23 • 5:10 PM",
//     category: "System",
//     badge: "bg-red-100 text-red-700",
//   },
// ];

// const announcements = [
//   { title: "Company Policy Update", description: "Review the updated leave policy for 2026." },
//   { title: "Upcoming Holiday Notice", description: "June 1 will be observed as a paid holiday." },
//   { title: "Employee Engagement Event", description: "Join the team building event next Friday." },
//   { title: "Training Program Announcement", description: "Enroll in the new professional development workshop." },
// ];

// const systems = [
//   { title: "Password Expiry Reminder", description: "Your password expires in 7 days. Update it soon." },
//   { title: "Profile Completion Reminder", description: "Complete your profile to access more HR services." },
//   { title: "Payroll Generated Successfully", description: "May payroll was processed without issues." },
//   { title: "Scheduled System Maintenance", description: "Maintenance starts tonight at 11 PM." },
// ];

export default function Notifications() {
  const [summaryCards,setSummaryCards] = useState([]);
  const [recentNotifications,setRecentNotifications] = useState([]);

  const fetchNotificationData = async () => {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(
      "http://127.0.0.1:8000/api/notifications/dashboard/",{
        headers:{
          Authorization:`Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    setSummaryCards(data.summary);
    setRecentNotifications(data.notifications);
  };

  useEffect(() => {
    fetchNotificationData();
  },[]);

  const announcements = 
    (recentNotifications || []).filter(
      item => item.category === "HR Announcement"
    );

  const systems = 
    (recentNotifications || []).filter(
      item => item.category === "System"
    );

  const iconMap = {
      "Leave Updates":<FaRegCalendar className="h-6 w-6" />,
      "Complaint Updates": <FaRegClipboard className="h-6 w-6" />,
      "HR Announcements":<FaBullhorn className="h-6 w-6" />,
      "System Notifications":<FaTools className="h-6 w-6" />,
  }

  const accentMap = {
    "Leave Updates": "bg-blue-50 text-blue-600",
    "Complaint Updates": "bg-yellow-50 text-yellow-700",
    "HR Announcements": "bg-cyan-50 text-cyan-700",
    "System Notifications": "bg-slate-50 text-slate-800",
  }
  

  return (
    <div className="space-y-8 text-slate-900">
      <div className="rounded-3xl bg-white p-8 shadow-md">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Notifications Center</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-900">Notifications Center</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
          Stay updated with important employee activities and company announcements.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <div key={card.title} className="rounded-3xl bg-white p-6 shadow-md transition hover:shadow-xl">
            <div className="flex items-center justify-between gap-4">
              <div className={`inline-flex h-14 w-14 items-center justify-center rounded-3xl ${accentMap[card.title]}`}>
                {iconMap[card.title]}
              </div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">{card.title}</span>
            </div>
            <p className="mt-6 text-3xl font-semibold text-slate-900">{card.count}</p>
            <p className="mt-2 text-sm text-slate-600">{card.description}</p>
          </div>
        ))}
      </div>


      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <div className="rounded-3xl bg-white p-8 shadow-md">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Recent Notifications</h2>
              <p className="mt-2 text-sm text-slate-600">Your latest alerts and announcements in one place.</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-3xl bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-700">
              <FaRegBell className="h-4 w-4" /> Live Feed
            </div>
          </div>

          <div className="mt-8 space-y-4">
            {recentNotifications.map((notice) => (
              <div key={notice.title} className="group rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:shadow-lg">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-lg font-semibold text-slate-900">{notice.title}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{notice.description}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${notice.badge}`}>{notice.category}</span>
                    <p className="text-xs text-slate-500">{notice.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-md">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">HR Announcements</h2>
                <p className="mt-2 text-sm text-slate-600">Important HR updates and upcoming events.</p>
              </div>
              <FaUsers className="h-6 w-6 text-blue-600" />
            </div>
            <div className="mt-6 space-y-4">
              {announcements.map((item) => (
                <div key={item.title} className="rounded-3xl bg-slate-50 px-5 py-4 transition hover:bg-slate-100">
                  <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                  <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-md">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">System Notifications</h2>
                <p className="mt-2 text-sm text-slate-600">Critical system alerts and reminders.</p>
              </div>
              <FaInfoCircle className="h-6 w-6 text-slate-600" />
            </div>
            <div className="mt-6 space-y-4">
              {systems.map((item) => (
                <div key={item.title} className="rounded-3xl bg-slate-50 px-5 py-4 transition hover:bg-slate-100">
                  <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                  <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
