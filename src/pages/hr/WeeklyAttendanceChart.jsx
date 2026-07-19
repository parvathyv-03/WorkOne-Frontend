import {BarChart,Bar,XAxis,YAxis,Tooltip,CartesianGrid,ResponsiveContainer,Legend} from "recharts";

export default function WeeklyAttendanceChart({data}){
    return(
        <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-bold text-slate-900">
                Weekly Attendance Report
            </h2>

            <div style={{ width:"100%", height: 350 }}>
                <ResponsiveContainer>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3"/>

                        <XAxis dataKey="day"/>

                        <YAxis/>

                        <Tooltip/>

                        <Legend/>

                        <Bar
                            dataKey="on_time"
                            name="On Time"
                            fill="#4F46E5"
                            radius={[5,5,0,0]}
                        />
                        <Bar
                            dataKey="late"
                            name="Late"
                            fill="#38BDF8"
                            radius={[5,5,0,0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}