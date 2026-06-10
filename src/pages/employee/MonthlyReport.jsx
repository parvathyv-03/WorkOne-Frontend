import { useState } from 'react'
import { FiCalendar, FiClock, FiCheckCircle, FiAlertTriangle, FiDownload, FiFileText, FiTrendingUp, FiBarChart2 } from 'react-icons/fi'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const YEARS = ['2024', '2025', '2026']

const summaryCards = [
  {
    title: 'Present Days',
    value: '18',
    subtitle: 'This month',
    icon: <FiCheckCircle className="h-5 w-5" />
  },
  {
    title: 'Absent Days',
    value: '2',
    subtitle: 'This month',
    icon: <FiAlertTriangle className="h-5 w-5" />
  },
  {
    title: 'Late Check-ins',
    value: '5',
    subtitle: 'This month',
    icon: <FiClock className="h-5 w-5" />
  },
  {
    title: 'Total Work Hours',
    value: '164h',
    subtitle: 'This month',
    icon: <FiTrendingUp className="h-5 w-5" />
  }
]

const stats = [
  { label: 'Attendance Percentage (Of total working days)', value: '92%'},
  { label: 'Avg. Check-In Time (Across the month)', value: '09:12 AM' },
  { label: 'Avg. Check-Out Time (Across the month)', value: '06:35 PM'},
  { label: 'Total Working Hours (Including regular hours)', value: '164h' },
  { label: 'Overtime Hours (Extra logged time)', value: '12h' },
  { label: 'Late Arrivals (Counted this month)', value: '5' }
]

const insights = [
  { label: 'Best Attendance Streak', value: '12 days' },
  { label: 'Total Present Days', value: '18 days' },
  { label: 'Total Absent Days', value: '2 days' },
  { label: 'Total Late Arrivals', value: '5 times' }
]

const reportRows = [
  { date: '2026-05-01', day: 'Mon', checkIn: '09:05 AM', checkOut: '06:30 PM', workHours: '9h 25m', status: 'Present' },
  { date: '2026-05-02', day: 'Tue', checkIn: '09:18 AM', checkOut: '06:40 PM', workHours: '9h 22m', status: 'Late' },
  { date: '2026-05-03', day: 'Wed', checkIn: '09:00 AM', checkOut: '06:20 PM', workHours: '9h 20m', status: 'Present' },
  { date: '2026-05-04', day: 'Thu', checkIn: '-', checkOut: '-', workHours: '-', status: 'Absent' },
  { date: '2026-05-05', day: 'Fri', checkIn: '09:10 AM', checkOut: '06:35 PM', workHours: '9h 25m', status: 'Present' },
  { date: '2026-05-06', day: 'Sat', checkIn: '09:25 AM', checkOut: '02:00 PM', workHours: '4h 35m', status: 'Half Day' }
]

function statusStyles(status) {
  const base = 'inline-flex rounded-full px-3 py-1 text-xs font-semibold'
  if (status === 'Present') return `${base} bg-emerald-100 text-emerald-700`
  if (status === 'Absent') return `${base} bg-rose-100 text-rose-700`
  if (status === 'Late') return `${base} bg-amber-100 text-amber-700`
  if (status === 'Half Day') return `${base} bg-sky-100 text-sky-700`
  return `${base} bg-slate-100 text-slate-700`
}

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="animate-pulse rounded-3xl bg-white p-6 shadow-md">
            <div className="h-5 w-24 rounded-full bg-slate-200" />
            <div className="mt-6 h-12 rounded-2xl bg-slate-200" />
            <div className="mt-4 h-4 w-3/4 rounded-full bg-slate-200" />
          </div>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="animate-pulse rounded-3xl bg-white p-6 shadow-md h-64" />
        <div className="animate-pulse rounded-3xl bg-white p-6 shadow-md h-64" />
        <div className="animate-pulse rounded-3xl bg-white p-6 shadow-md h-64" />
      </div>
      <div className="overflow-hidden rounded-3xl bg-white p-6 shadow-md">
        <div className="space-y-4">
          <div className="h-6 w-56 rounded-full bg-slate-200" />
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="grid grid-cols-6 gap-4 py-4 border-b border-slate-100">
              <div className="h-4 rounded-full bg-slate-200 col-span-1" />
              <div className="h-4 rounded-full bg-slate-200 col-span-1" />
              <div className="h-4 rounded-full bg-slate-200 col-span-1" />
              <div className="h-4 rounded-full bg-slate-200 col-span-1" />
              <div className="h-4 rounded-full bg-slate-200 col-span-1" />
              <div className="h-4 rounded-full bg-slate-200 col-span-1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function EmptyState({ onGenerate }) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center shadow-md">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-blue-600">
        <FiFileText className="h-10 w-10" />
      </div>
      <h2 className="mt-6 text-2xl font-semibold text-slate-900">No attendance report available</h2>
      <p className="mt-3 text-sm text-slate-500">Generate a monthly report to see attendance details, statistics, and insights.</p>
      <button onClick={onGenerate} className="mt-6 inline-flex items-center justify-center rounded-full bg-[#2563eb] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition">
        Generate Report
      </button>
    </div>
  )
}

export default function MonthlyReport() {
  const [selectedMonth, setSelectedMonth] = useState('May')
  const [selectedYear, setSelectedYear] = useState('2026')
  const [isLoading, setIsLoading] = useState(false)
  const [rows, setRows] = useState(reportRows)

  const handleGenerate = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setRows(reportRows)
    }, 600)
  }

  const handleExport = (type) => {
    alert(`Export ${type} report`)
  }

  const hasData = rows.length > 0

  return (
    <div className="space-y-8 text-slate-900">
      <div className="rounded-3xl bg-white p-8 shadow-md">
        <p className="text-sm uppercase tracking-[0.3em] text-[#2563eb]">Attendance Management</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-900">Monthly Attendance Report</h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-500">Review your monthly attendance summary, working hours, and late arrivals in a single polished report. Export the data for payroll or HR review.</p>
      </div>

      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {summaryCards.map((card) => (
              <div key={card.title} className="rounded-3xl bg-white p-6 shadow-md transition hover:shadow-xl">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-sm text-slate-500">{card.title}</p>
                    <p className="mt-4 text-3xl font-semibold text-slate-900">{card.value}</p>
                    <p className="mt-2 text-xs text-slate-400">{card.subtitle}</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-blue-50 text-[#2563eb]">
                    {card.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-6 xl:grid-cols-[150fr]">
                <div className="rounded-3xl bg-white p-8 shadow-md">
  
                    {/* Report Filters */}
                    <div className="flex flex-col items-center text-center">
                        <p className="text-xl font-semibold text-slate-900">
                        Report Filters
                        </p>

                        <p className="mt-2 text-sm text-slate-500">
                        Choose a month and year to generate the attendance report.
                        </p>

                        <div className="mt-6 flex flex-col sm:flex-row gap-4 w-full max-w-2xl">
                        <select
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                            className="flex-1 rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-400"
                        >
                            {MONTHS.map((month) => (
                            <option key={month} value={month}>
                                {month}
                            </option>
                            ))}
                        </select>

                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className="flex-1 rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-400"
                        >
                            {YEARS.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                            ))}
                        </select>
                        </div>

                        <button
                        onClick={handleGenerate}
                        className="mt-6 rounded-3xl bg-[#2563eb] px-8 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                        >
                        Generate Report
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="my-8 border-t border-slate-200"></div>

                    {/* Attendance Statistics */}
                    <div>
                        <p className="text-xl font-semibold text-slate-900 text-center">
                        Attendance Statistics
                        </p>

                        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {stats.map((item) => (
                            <div
                            key={item.label}
                            className="rounded-3xl border border-slate-100 bg-slate-50 p-5"
                            >
                            <p className="text-sm text-slate-500">
                                {item.label}
                            </p>

                            <p className="mt-3 text-3xl font-semibold text-slate-900">
                                {item.value}
                            </p>
                            </div>
                        ))}
                        </div>
                    </div>

                </div>
            </div>

          {hasData ? (
            <div className="space-y-6">
              <div className="overflow-hidden rounded-3xl bg-white shadow-md">
                <div className="border-b border-slate-200 px-6 py-5">
                  <h2 className="text-xl font-semibold text-slate-900">Monthly Attendance</h2>
                  <p className="mt-2 text-sm text-slate-500">Daily attendance records for the selected month.</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500">
                      <tr>
                        <th className="px-6 py-4 font-semibold">Date</th>
                        <th className="px-6 py-4 font-semibold">Day</th>
                        <th className="px-6 py-4 font-semibold">Check In</th>
                        <th className="px-6 py-4 font-semibold">Check Out</th>
                        <th className="px-6 py-4 font-semibold">Work Hours</th>
                        <th className="px-6 py-4 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
                      {rows.map((row) => (
                        <tr key={row.date} className="transition hover:bg-slate-50">
                          <td className="px-6 py-4 font-medium text-slate-900">{row.date}</td>
                          <td className="px-6 py-4">{row.day}</td>
                          <td className="px-6 py-4">{row.checkIn}</td>
                          <td className="px-6 py-4">{row.checkOut}</td>
                          <td className="px-6 py-4">{row.workHours}</td>
                          <td className="px-6 py-4">
                            <span className={statusStyles(row.status)}>{row.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-4">
                {insights.map((insight) => (
                  <div key={insight.label} className="rounded-3xl bg-white p-6 shadow-md transition hover:shadow-xl">
                    <p className="text-sm text-slate-500">{insight.label}</p>
                    <div className="mt-4 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-blue-50 text-[#2563eb]">
                        <FiBarChart2 className="h-5 w-5" />
                      </div>
                      <p className="text-2xl font-semibold text-slate-900">{insight.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <EmptyState onGenerate={handleGenerate} />
          )}
        </>
      )}
    </div>
  )
}
