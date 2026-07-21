import { useEffect, useState } from "react";
import {
  FaBell,
  FaBullhorn,
  FaClipboardList,
  FaCalendarAlt,
  FaExclamationCircle,
  FaCheckCircle,
  FaRegBell,
  FaRegCalendarAlt,
  FaRegPaperPlane,
  FaTimes,
} from "react-icons/fa";

const categoryOptions = [
  "HR Announcement",
  "System",
  "Leave",
  "Complaint",
];

const priorityOptions = ["Low", "Medium", "High"];

const badgeStyles = {
  Published: "bg-emerald-100 text-emerald-700",
  Draft: "bg-amber-100 text-amber-700",
};

export default function Notification() {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState(categoryOptions[0]);
    const [priority, setPriority] = useState("Low");
    const [message, setMessage] = useState("");
    const [notificationsList,setNotificationsList] = useState([]);
    const [preview, setPreview] = useState(null);
    const [summaryData,setSummaryData] = useState({
      total_notifications:0,
      hr_announcements:0,
      leave_updates:0,
      complaint_updates:0,
      system_notifications:0,
    });

    const summaryCards = [
    {
      title:"Total Notifications",
      count:summaryData.total_notifications,
      icon:FaBell,
      accent:"bg-[#F4F0FB] text-[#36136E]",
    },
    {
      title:"HR Announcements",
      count:summaryData.hr_announcements,
      icon:FaBullhorn,
      accent:"bg-[#F4F0FB] text-[#36136E]",
    },
    {
      title:"Leave Updates",
      count:summaryData.leave_updates,
      icon:FaCalendarAlt,
      accent:"bg-[#F4F0FB] text-[#36136E]",
    },
    {
      title:"Complaint Updates",
      count:summaryData.complaint_updates,
      icon:FaExclamationCircle,
      accent:"bg-[#F4F0FB] text-[#36136E]",
    },
  ];

  const publishNotification = async () => {
    try{
      const response = await fetch (
        "http://127.0.0.1:8000/api/hr/notifications/publish/",
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${localStorage.getItem("accessToken")}`,
          },
          body:JSON.stringify({
            title,
            description:message,
            category,
            priority,
            status:"Published",
          }),
        }
      );

      if(response.ok){
        alert("Notification published successfully.")

        handleClear();
        loadNotifications();
      }else{
        const error = await response.json();
        console.log(error)
      }

    } catch(err){
      console.log(err);
    }
  };


  const handleClear = () => {
    setTitle("");
    setCategory(categoryOptions[0]);
    setPriority("Low");
    setMessage("");
  };

  const loadNotifications = async () => {
    try{
      const response = await fetch(
        "http://127.0.0.1:8000/api/hr/notifications/list/",
        {
          headers:{
            Authorization:`Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if(!response.ok){
        console.log("Failed to load notifications");
        return;
      }

      const data = await response.json();

      setSummaryData(data.summary);

      setNotificationsList(data.notifications);

      if(data.notifications.length > 0){
        setPreview(data.notifications[0]);
      } else {
        setPreview(null);
      }
    }catch(error){
      console.log(error);
    }
  };

  useEffect(() => {
    loadNotifications();
  },[]);

  return (
    <div className="space-y-8 px-6 py-8 font-sans text-slate-900" style={{ fontFamily: "Poppins, sans-serif" }}>
      <div className="rounded-3xl bg-white p-8 shadow-md">
        <div className="max-w-4xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#36136E]/70">
            Notification Management
          </p>
          <h1 className="text-4xl font-bold text-slate-900">Employee Notifications</h1>
          <p className="max-w-3xl text-sm text-slate-600 leading-7">
            Create and manage announcements, alerts, and updates that will be visible to employees.
          </p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((item) => (
          <div
            key={item.title}
            className="rounded-3xl bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className={`inline-flex h-14 w-14 items-center justify-center rounded-3xl ${item.accent}`}>
              <item.icon className="text-lg" />
            </div>
            <p className="mt-5 text-sm font-semibold text-slate-500">{item.title}</p>
            <p className="mt-4 text-3xl font-bold text-slate-900">{item.count}</p>
            <div className="mt-3 rounded-3xl bg-[#F7F4FF] px-3 py-2 text-xs font-medium text-[#36136E]">
              Updated 2 days ago
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2 rounded-3xl bg-white p-6 shadow-md">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Create New Notification</h2>
              <p className="mt-2 text-sm text-slate-500">
                Publish a new message for employees with priority and category settings.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-3xl bg-[#F4F0FB] px-4 py-2 text-sm font-semibold text-[#36136E]">
              <FaBullhorn /> New Post
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Notification Title</span>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter notification title"
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#36136E] focus:bg-white"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Category</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#36136E] focus:bg-white"
              >
                {categoryOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>

            <label className="lg:col-span-2 space-y-2">
              <span className="text-sm font-medium text-slate-700">Message</span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                placeholder="Write the notification message for employees..."
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 outline-none transition focus:border-[#36136E] focus:bg-white"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Priority</span>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#36136E] focus:bg-white"
              >
                {priorityOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button onClick={publishNotification} disabled={!title.trim() || !message.trim()} className="inline-flex items-center justify-center rounded-3xl bg-[#36136E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2c0f5d]">
              <FaCheckCircle className="mr-2" /> Publish Notification
            </button>
            <button
              onClick={handleClear}
              className="inline-flex items-center justify-center rounded-3xl border border-slate-300 bg-slate-50 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#36136E] hover:text-[#36136E]"
            >
              <FaTimes className="mr-2" /> Clear Form
            </button>
          </div>
        </div>

        <div className="rounded-3xl bg-[#F9F7FF] p-6 shadow-md">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Notification Preview</h2>
              <p className="mt-2 text-sm text-slate-500">How the message will appear in the employee dashboard.</p>
            </div>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-[#E9E0FF] text-[#36136E]">
              <FaRegBell className="text-lg" />
            </div>
          </div>

          <div className="space-y-5 rounded-[2rem] border border-[#E6E0F6] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div className="inline-flex items-center gap-3 rounded-3xl bg-[#F4F0FB] px-4 py-2 text-sm font-semibold text-[#36136E]">
                <FaBullhorn /> {preview?.category}
              </div>
            </div>
            <h3 className="text-lg font-semibold text-slate-900">{preview?.title}</h3>
            <p className="text-sm leading-7 text-slate-600">{preview?.description}</p>
            <div className="flex items-center justify-between text-sm text-slate-500">
              <span>{preview?.created_at && new Date(preview.created_at).toLocaleDateString()}</span>
              <span
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                  preview ? badgeStyles[preview?.status] : ""
                }`}
              >
                <FaCheckCircle /> {preview?.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="rounded-3xl bg-white p-6 shadow-md">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Recent Notifications</h2>
              <p className="mt-2 text-sm text-slate-500">Latest employee announcements and system alerts.</p>
            </div>
            <div className="inline-flex items-center gap-3 rounded-3xl bg-[#F4F0FB] px-4 py-2 text-sm font-semibold text-[#36136E]">
              <FaClipboardList /> {notificationsList.length} Entries
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-600">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Priority</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {notificationsList.map((item) => (
                  <tr
                    key={item.title}
                    className="border-b border-slate-100 transition duration-300 hover:bg-[#F4F0FB] cursor-pointer"
                    onClick={() => setPreview(item)}
                  >
                    <td className="px-4 py-4 text-slate-900 font-medium">{item.title}</td>
                    <td className="px-4 py-4">{item.category}</td>
                    <td className="px-4 py-4">{item.priority}</td>
                    <td className="px-4 py-4">{new Date(item.created_at).toLocaleDateString()}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badgeStyles[item.status]}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
