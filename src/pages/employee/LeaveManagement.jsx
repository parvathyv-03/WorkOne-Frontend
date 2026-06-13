import { MdBeachAccess, MdLocalHospital, MdWorkOutline } from "react-icons/md";
import { HiOutlineDocumentText, HiOutlineClock, HiOutlineUserGroup } from "react-icons/hi";
import { useEffect,useState } from "react";

export default function LeaveManagement() {
  const [summaryItems, setSummaryItems] = useState([]);
  const [trackerStats, setTrackerStats] = useState([]);
  const [historyItems, setHistoryItems] = useState([]);

  const [leaveType,setLeaveType] = useState("Casual Leave");
  const [startDate,setStartDate] = useState("");
  const [endDate,setEndDate] = useState("");
  const [reason,setReason] = useState("");

  useEffect(() => {
    fetchLeaveData();
  },[]);

  const fetchLeaveData = async () => {
    const token = localStorage.getItem("accessToken");

    const response =
    await fetch(
      "http://127.0.0.1:8000/api/leave/dashboard/",{
        headers:{
          Authorization:
          `Bearer ${token}`
        }
      }
    );

    const data = await response.json();

    setSummaryItems(data.summary);
    setTrackerStats([
      {
        label:"Pending",
        value: data.tracker.pending,
        badge: "bg-yellow-100 text-yellow-700",
      },
      {
      label: "Approved",
      value: data.tracker.approved,
      badge: "bg-emerald-100 text-emerald-700",
      },
      {
        label: "Rejected",
        value: data.tracker.rejected,
        badge: "bg-red-100 text-red-700",
      },
    ]);
    setHistoryItems(data.history);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("accessToken");

    const response = await fetch(
      "http://127.0.0.1:8000/api/leave/apply/",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`,
        },
        body: JSON.stringify({
          leave_type:leaveType,
          start_date:startDate,
          end_date:endDate,
          reason:reason,
        }),
      }
    );

    const data = await response.json();

    if(response.ok){
      alert("Leave applied succesfully.");

      setLeaveType("");
      setStartDate("");
      setEndDate("");
      setReason("");

      fetchLeaveData();
    }else{
      alert(data.error);
    }
  };

  const getStatusColor = (status) => {
    if(status === "Approved")
      return "bg-emerald-100 text-emerald-700"

    if(status === "Rejected")
      return "bg-red-100 text-red-700"

    return "bg-yellow-100 text-yellow-700";
  };

  const iconMap = {
    "Casual Leave Remaining":{
      icon:<MdBeachAccess className="h-6 w-6"/>,
      iconBg:"bg-blue-100 text-blue-600",
    },
     "Sick Leave Remaining": {
    icon: <MdLocalHospital className="h-6 w-6" />,
    iconBg: "bg-cyan-100 text-cyan-600",
    },
    "Privilege Leave Remaining": {
      icon: <MdWorkOutline className="h-6 w-6" />,
      iconBg: "bg-slate-100 text-slate-800",
    },
  };



  return (
    <div className="space-y-8  text-slate-900">
      <div className="rounded-3xl bg-white p-8 shadow-md">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Leave Management</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-900">Leave Management</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
          Review your leave balances, submit new requests, and monitor approval status from one easy dashboard.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {summaryItems.map((item) => (
          <div
            key={item.title}
            className="group rounded-3xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-3xl ${
                    iconMap[item.title]?.iconBg
                }`}
              >
                {iconMap[item.title]?.icon}
              </div>

               <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  {item.title.split(" ")[0]}
               </span>
          </div>
          <div className="mt-6">
            <p className="text-3xl font-bold text-slate-900">
              {item.value} Days
            </p>

            <p className="mt-2 text-sm text-slate-600">
              {item.description}
            </p>
          </div>
        </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">

            {/* LEAVE HISTORY */}
            <div className="rounded-3xl bg-white p-8 shadow-md">
                <div className="flex items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-semibold text-slate-900">Leave History</h2>
                    <p className="mt-2 text-sm text-slate-600">Review recent leave requests and their outcomes.</p>
                </div>
                <div className="rounded-3xl bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
                    <HiOutlineClock className="mr-2 inline h-5 w-5" /> Updated Today
                </div>
                </div>

                <div className="mt-8 space-y-6">
                {historyItems.map((item) => (
                    <div key={item.date + item.type} className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-slate-50 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-semibold text-slate-900">{item.type}</p>
                        <p className="mt-2 text-sm text-slate-600">Applied: {item.date}</p>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-700">
                        <div className="rounded-2xl bg-white px-4 py-2 shadow-sm">{item.duration}</div>
                        <div className={`rounded-2xl px-4 py-2 text-sm font-semibold ${getStatusColor(item.status)}`}>{item.status}</div>
                    </div>
                    </div>
                ))}
                </div>
          </div>


        {/* LEAVE STATUS TRACKER  */}
        <div className="rounded-3xl bg-white p-8 shadow-md">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">Leave Status Tracker</h2>
                <p className="mt-2 text-sm text-slate-600">Monitor your request flow from pending to approval.</p>
              </div>
              <div className="rounded-3xl bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-600">
                Live Status
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {trackerStats.map((stat) => (
                <div key={stat.label} className="flex items-center justify-between rounded-3xl bg-slate-50 px-5 py-4">
                  <div>
                    <p className="text-sm text-slate-500">{stat.label}</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">{stat.value}</p>
                  </div>
                  <span className={`rounded-full px-4 py-2 text-xs font-semibold ${stat.badge}`}>{stat.label}</span>
                </div>
              ))}
            </div>
        </div>        
        </div>

        {/* LEAVE REQUEST FORM */}
        <div className="rounded-3xl bg-white p-8 shadow-md">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Apply for Leave</h2>
              <p className="mt-2 text-sm text-slate-600">
                Submit a leave request quickly and track its approval status instantly.
              </p>
            </div>
            <div className="inline-flex items-center gap-3 rounded-3xl bg-blue-50 px-4 py-3 text-blue-600">
              <HiOutlineDocumentText className="h-5 w-5" />
              <span className="text-sm font-semibold">Request Form</span>
            </div>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="grid gap-6 md:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-700">
                Leave Type
                <select value={leaveType} onChange={(e) => setLeaveType(e.target.value)} className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white">
                  <option>Casual Leave</option>
                  <option>Sick Leave</option>
                  <option>Privilege Leave</option>
                </select>
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                Start Date
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white" />
              </label>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-700">
                End Date
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white" />
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                Reason
                <textarea value={reason} onChange={(e) => setReason(e.target.value)} rows="3" className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white" placeholder="Enter the reason for your leave request." />
              </label>
            </div>

            <button type="submit" className="inline-flex items-center justify-center rounded-3xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white transition hover:bg-blue-700">
              Submit Leave Request
            </button>
          </form>
        </div>           
    </div>
  );
}
