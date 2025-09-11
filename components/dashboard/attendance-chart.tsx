"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useRealtime } from "@/contexts/realtime-context"

export function AttendanceChart() {
  const { students } = useRealtime()

  const getAttendanceData = () => {
    return students.map((student) => ({
      name: student.name.split(" ")[0],
      attendance: student.attendance,
      risk: student.riskPercentage,
    }))
  }

  const data = getAttendanceData()

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="attendance" fill="hsl(var(--primary))" name="Attendance %" />
        <Bar dataKey="risk" fill="hsl(var(--destructive))" name="Risk %" />
      </BarChart>
    </ResponsiveContainer>
  )
}
