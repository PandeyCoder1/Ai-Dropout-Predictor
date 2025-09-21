"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Sidebar } from "@/components/dashboard/sidebar"
import {
  Users, Calendar, FileText, MessageCircle, BarChart3, AlertTriangle, BookOpen, Upload, PlayCircle, CheckCircle, Bell
} from "lucide-react"
import { useState } from "react"

// Dummy data for demonstration
const students = [
  { id: 1, name: "Amit Sharma", school: "ABC School", risk: "red", sentiment: "Negative", attendance: 70, performance: 55 },
  { id: 2, name: "Priya Singh", school: "XYZ School", risk: "yellow", sentiment: "Neutral", attendance: 85, performance: 75 },
  { id: 3, name: "Rahul Verma", school: "ABC School", risk: "green", sentiment: "Positive", attendance: 95, performance: 92 },
]

const sessions = [
  { id: 1, student: "Amit Sharma", date: "2025-09-22", time: "10:00 AM", status: "Scheduled" },
  { id: 2, student: "Priya Singh", date: "2025-09-23", time: "2:00 PM", status: "Reschedule" },
]

const alerts = [
  { id: 1, message: "New student flagged as at-risk: Amit Sharma", date: "2025-09-21" },
  { id: 2, message: "Reminder: Counselling session with Priya Singh tomorrow", date: "2025-09-20" },
]

const counselorSidebarItems = [
  { label: "Dashboard", href: "/dashboard/counselors" },
  { label: "Sessions", href: "/dashboard/counselors/sessions" },
  { label: "Analytics", href: "/dashboard/counselors/analytics" },
  { label: "Resources", href: "/dashboard/counselors/resources" },
  { label: "Alerts", href: "/dashboard/counselors/alerts" },
]

function RiskFlag({ risk }: { risk: string }) {
  const color =
    risk === "red"
      ? "bg-red-500"
      : risk === "yellow"
      ? "bg-yellow-400"
      : "bg-green-500"
  return <span className={`inline-block w-3 h-3 rounded-full mr-2 ${color}`} />
}

export default function CounselorsDashboardPage() {
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null)
  const [report, setReport] = useState("")

  return (
    <ProtectedRoute allowedRoles={["counsellor"]}>
      <DashboardLayout sidebar={<Sidebar items={counselorSidebarItems} />}>
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <Users className="w-7 h-7 text-blue-600" /> Counsellor Dashboard
            </h1>
            <p className="text-muted-foreground">
              Monitor, counsel, and support students across schools.
            </p>
          </div>

          {/* Student Monitoring */}
          <section className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500" /> Student Monitoring
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {students.map(student => (
                <div
                  key={student.id}
                  className="border rounded-lg p-4 hover:shadow transition cursor-pointer bg-gray-50"
                  onClick={() => setSelectedStudent(student.id)}
                >
                  <div className="flex items-center mb-2">
                    <RiskFlag risk={student.risk} />
                    <span className="font-semibold">{student.name}</span>
                    <span className="ml-auto text-xs text-gray-400">{student.school}</span>
                  </div>
                  <div className="text-sm mb-1">Performance: <span className="font-medium">{student.performance}%</span></div>
                  <div className="text-sm mb-1">Attendance: <span className="font-medium">{student.attendance}%</span></div>
                  <div className="text-sm mb-1">Sentiment: <span className="font-medium">{student.sentiment}</span></div>
                  <button className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded mt-2">Profile</button>
                </div>
              ))}
            </div>
            {/* Student Profile Modal (simplified) */}
            {selectedStudent && (
              <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                  <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                    onClick={() => setSelectedStudent(null)}
                  >
                    ×
                  </button>
                  <h3 className="text-lg font-bold mb-2">Student Profile</h3>
                  {/* Replace with real student details */}
                  <div>Academic Performance: 75%</div>
                  <div>Attendance: 85%</div>
                  <div>Behavioral Notes: Needs focus in Math</div>
                  <div>Sentiment Trend: Neutral</div>
                  <div>Counselling Status: Scheduled</div>
                </div>
              </div>
            )}
          </section>

          {/* Counselling Management */}
          
        <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-600" /> Counselling Management
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Pending Appointments */}
                <div>
                <div className="font-semibold mb-1">Pending Appointments</div>
                <ul>
                    {sessions
                    .filter((s) => s.status !== "Done")
                    .map((s) => (
                        <li key={s.id} className="mb-2 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <span>{s.student}</span>
                        <span className="text-xs text-gray-400">{s.date} at {s.time}</span>
                        <span className={`ml-auto text-xs px-2 py-1 rounded ${s.status === "Scheduled" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{s.status}</span>
                        </li>
                    ))}
                </ul>
                </div>
                {/* Appointments Done */}
                <div>
                <div className="font-semibold mb-1">Appointments Done</div>
                <ul>
                    {sessions
                    .filter((s) => s.status === "Done")
                    .map((s) => (
                        <li key={s.id} className="mb-2 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>{s.student}</span>
                        <span className="text-xs text-gray-400">{s.date} at {s.time}</span>
                        <span className="ml-auto text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">Done</span>
                        </li>
                    ))}
                    {sessions.filter((s) => s.status === "Done").length === 0 && (
                    <li className="text-sm text-muted-foreground">No completed appointments yet.</li>
                    )}
                </ul>
                </div>
                {/* Organize a Meeting */}
                <div>
                <div className="font-semibold mb-1">Organize a Meeting</div>
                <button className="btn bg-blue-600 text-white flex items-center gap-2 px-4 py-2 rounded w-full">
                    <Calendar className="w-4 h-4" /> Schedule New Session
                </button>
                <div className="mt-2 text-xs text-gray-400">
                    Click to organize a new counselling meeting with a student.
                </div>
                </div>
            </div>
            {/* Upload Counselling Report */}
            <div className="mt-6">
                <div className="font-semibold mb-1">Upload Counselling Report</div>
                <textarea
                className="w-full border rounded p-2"
                rows={2}
                placeholder="Enter session notes, outcomes, etc."
                value={report}
                onChange={e => setReport(e.target.value)}
                />
                <button className="btn bg-blue-600 text-white mt-2 flex items-center gap-2 px-4 py-2 rounded">
                <Upload className="w-4 h-4" /> Upload Report
                </button>
            </div>
            </section>

          {/* Collaboration & Feedback */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-blue-600" /> Collaboration & Feedback
            </h2>
            <div className="flex flex-col md:flex-row gap-4">
              <button className="btn bg-blue-600 text-white flex items-center gap-2 px-4 py-2 rounded">
                <MessageCircle className="w-4 h-4" /> Message Teacher
              </button>
              <button className="btn bg-green-600 text-white flex items-center gap-2 px-4 py-2 rounded">
                <MessageCircle className="w-4 h-4" /> Message Parent
              </button>
              <button className="btn bg-yellow-500 text-white flex items-center gap-2 px-4 py-2 rounded">
                <MessageCircle className="w-4 h-4" /> Message Student
              </button>
              <button className="btn bg-purple-600 text-white flex items-center gap-2 px-4 py-2 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 19h8a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Start Video Call
                </button>
                {/* New: Voice Call */}
                <button className="btn bg-pink-600 text-white flex items-center gap-2 px-4 py-2 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10v4a2 2 0 01-2 2H7a2 2 0 01-2-2v-4a2 2 0 012-2h6a2 2 0 012 2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7v10M19 7l-2 2m2-2l2 2" />
                </svg>
                Start Voice Call
                </button>
            </div>
            <div className="mt-4">
              <div className="font-semibold mb-1">Feedback Loop</div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Mark if counselling helped (Red → Yellow → Green)</span>
              </div>
            </div>
          </section>

          {/* Analytics & Insights */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-600" /> Analytics & Insights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="font-semibold mb-1">Sentiment Trends</div>
                <div className="h-20 bg-gray-100 rounded flex items-center justify-center text-gray-400">[Trend Graph]</div>
              </div>
              <div>
                <div className="font-semibold mb-1">Risk Distribution</div>
                <div className="h-20 bg-gray-100 rounded flex items-center justify-center text-gray-400">[Pie Chart]</div>
              </div>
              <div>
                <div className="font-semibold mb-1">Common Issues</div>
                <ul className="list-disc ml-6 text-sm">
                  <li>Stress</li>
                  <li>Lack of attendance</li>
                  <li>Exam fear</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Resource Sharing */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-green-600" /> Resource Sharing
            </h2>
            <div className="flex flex-col md:flex-row gap-4">
              <button className="btn bg-blue-600 text-white flex items-center gap-2 px-4 py-2 rounded">
                <Upload className="w-4 h-4" /> Upload Study Material
              </button>
              <button className="btn bg-purple-600 text-white flex items-center gap-2 px-4 py-2 rounded">
                <PlayCircle className="w-4 h-4" /> Share Motivational Resource
              </button>
              <button className="btn bg-yellow-500 text-white flex items-center gap-2 px-4 py-2 rounded">
                <FileText className="w-4 h-4" /> Create Action Plan
              </button>
            </div>
          </section>

          {/* Alerts & Notifications */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-600" /> Alerts & Notifications
            </h2>
            <ul className="divide-y">
              {alerts.map((alert) => (
                <li key={alert.id} className="py-2 flex justify-between items-center">
                  <span>{alert.message}</span>
                  <span className="text-xs text-gray-400">{alert.date}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}