"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Sidebar } from "@/components/dashboard/sidebar"
import { useState } from "react"
import { Users, Filter, Search, Upload, BarChart3, PieChart, Star, AlertTriangle, BookOpen, Send } from "lucide-react"

// Dummy data for demonstration
const students = [
  { id: 1, name: "Amit Sharma", roll: "101", risk: "red", marks: 55, attendance: 70, sentiment: "Negative", flagged: false },
  { id: 2, name: "Priya Singh", roll: "102", risk: "yellow", marks: 75, attendance: 85, sentiment: "Neutral", flagged: false },
  { id: 3, name: "Rahul Verma", roll: "103", risk: "green", marks: 92, attendance: 95, sentiment: "Positive", flagged: false },
  // ...more students
]

const teacherSidebarItems = [
  { label: "Dashboard", href: "/dashboard/teachers" },
  { label: "Upload Grades", href: "/dashboard/teachers/upload" },
  { label: "Analytics", href: "/dashboard/teachers/analytics" },
  { label: "Interventions", href: "/dashboard/teachers/interventions" },
  { label: "Reports", href: "/dashboard/teachers/reports" },
]

function RiskIndicator({ risk }: { risk: string }) {
  const color = risk === "red" ? "bg-red-500" : risk === "yellow" ? "bg-yellow-400" : "bg-green-500"
  return <span className={`inline-block w-3 h-3 rounded-full mr-2 ${color}`} />
}

export default function TeachersDashboardPage() {
  const [filter, setFilter] = useState<"all" | "red" | "top">("all")
  const [search, setSearch] = useState("")

  const filteredStudents = students.filter((s) => {
    if (filter === "red") return s.risk === "red"
    if (filter === "top") return s.marks > 85
    return true
  }).filter((s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.roll.includes(search))

  return (
    <ProtectedRoute allowedRoles={["teacher"]}>
      <DashboardLayout sidebar={<Sidebar items={teacherSidebarItems} />}>
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <Users className="w-7 h-7 text-blue-600" /> Teacher Dashboard
            </h1>
            <p className="text-muted-foreground">Monitor, manage, and support your students’ progress and well-being.</p>
          </div>

          {/* Student Risk Tracker */}
          <section className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500" /> Student Risk Tracker
              </h2>
              <div className="flex gap-2">
                <button className="btn" onClick={() => setFilter("all")}><Filter className="w-4 h-4" /> All</button>
                <button className="btn" onClick={() => setFilter("red")}><Filter className="w-4 h-4 text-red-500" /> Only Red</button>
                <button className="btn" onClick={() => setFilter("top")}><Star className="w-4 h-4 text-yellow-400" /> Top Performers</button>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name or roll"
                    className="pl-8 pr-2 py-1 border rounded"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredStudents.map(student => (
                <div key={student.id} className="border rounded-lg p-4 hover:shadow transition cursor-pointer bg-gray-50">
                  <div className="flex items-center mb-2">
                    <RiskIndicator risk={student.risk} />
                    <span className="font-semibold">{student.name}</span>
                    <span className="ml-auto text-xs text-gray-400">Roll: {student.roll}</span>
                  </div>
                  <div className="text-sm mb-1">Marks: <span className="font-medium">{student.marks}</span></div>
                  <div className="text-sm mb-1">Attendance: <span className="font-medium">{student.attendance}%</span></div>
                  <div className="text-sm mb-1">Sentiment: <span className="font-medium">{student.sentiment}</span></div>
                  <div className="flex gap-2 mt-2">
                    <button className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Profile</button>
                    <button className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Flag</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Data Input Tools */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5 text-green-600" /> Data Input Tools
            </h2>
            <div className="flex flex-col md:flex-row gap-4">
              <button className="btn bg-blue-600 text-white flex items-center gap-2 px-4 py-2 rounded">
                <Upload className="w-4 h-4" /> Upload Marks (CSV)
              </button>
              <button className="btn bg-gray-200 text-gray-700 flex items-center gap-2 px-4 py-2 rounded">
                <BookOpen className="w-4 h-4" /> Enter Behavior Notes
              </button>
              <button className="btn bg-yellow-400 text-white flex items-center gap-2 px-4 py-2 rounded">
                <Star className="w-4 h-4" /> Rate Performance
              </button>
              <button className="btn bg-red-500 text-white flex items-center gap-2 px-4 py-2 rounded">
                <AlertTriangle className="w-4 h-4" /> Flag Student
              </button>
            </div>
          </section>

          {/* Analytics & Reports */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-600" /> Analytics & Reports
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded">
                <div className="font-semibold">Average Marks</div>
                <div className="text-2xl font-bold">78%</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded">
                <div className="font-semibold">Attendance Distribution</div>
                <div className="text-2xl font-bold">85%</div>
              </div>
              <div className="bg-red-50 p-4 rounded">
                <div className="font-semibold">Risk Distribution</div>
                <PieChart className="w-8 h-8 text-red-400" />
              </div>
            </div>
            <div className="mt-4">
              <div className="font-semibold mb-2">Term Comparison (Trend)</div>
              <div className="h-24 bg-gray-100 rounded flex items-center justify-center text-gray-400">[Trend Chart Placeholder]</div>
            </div>
            <div className="mt-4">
              <div className="font-semibold mb-2">Heatmap: High-Risk Subjects</div>
              <div className="h-24 bg-gray-100 rounded flex items-center justify-center text-gray-400">[Heatmap Placeholder]</div>
            </div>
          </section>

          {/* Intervention & Actions */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Send className="w-5 h-5 text-blue-600" /> Intervention & Actions
            </h2>
            <div className="flex flex-col md:flex-row gap-4">
              <button className="btn bg-green-600 text-white flex items-center gap-2 px-4 py-2 rounded">
                <BookOpen className="w-4 h-4" /> Assign Extra Classes
              </button>
              <button className="btn bg-blue-600 text-white flex items-center gap-2 px-4 py-2 rounded">
                <Upload className="w-4 h-4" /> Share Study Material
              </button>
              <button className="btn bg-yellow-500 text-white flex items-center gap-2 px-4 py-2 rounded">
                <AlertTriangle className="w-4 h-4" /> Recommend Counsellor
              </button>
              <button className="btn bg-purple-600 text-white flex items-center gap-2 px-4 py-2 rounded">
                <Send className="w-4 h-4" /> Send Notification
              </button>
            </div>
          </section>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}