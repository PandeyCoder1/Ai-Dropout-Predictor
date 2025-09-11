"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { useRealtime } from "@/contexts/realtime-context"

export function RiskDistributionChart() {
  const { students } = useRealtime()

  const getRiskDistribution = () => {
    const distribution = students.reduce(
      (acc, student) => {
        acc[student.riskCategory]++
        return acc
      },
      { Low: 0, Medium: 0, High: 0 },
    )

    return [
      { name: "Low Risk", value: distribution.Low, color: "#10b981" },
      { name: "Medium Risk", value: distribution.Medium, color: "#f59e0b" },
      { name: "High Risk", value: distribution.High, color: "#ef4444" },
    ]
  }

  const data = getRiskDistribution()

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, value }) => `${name}: ${value}`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
