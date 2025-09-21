"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Users, Bell, Star, Smile, Calendar, MessageCircle, BookOpen, Award, Send, BarChart3 } from "lucide-react"
import { useState } from "react"
import type { UserRole } from "@/lib/auth"

// Dummy data for demonstration
const child = {
  name: "Amit Sharma",
  status: "yellow", // "green" | "yellow" | "red"
  attendance: 88,
  avgMarks: 76,
  behavior: 4, // out of 5
  notifications: [
    { id: 1, message: "Parent-Teacher Meeting on 25th Sep", date: "2025-09-21" },
    { id: 2, message: "Maths Exam scheduled for 28th Sep", date: "2025-09-20" },
    { id: 3, message: "Risk Alert: Needs Attention in Science", date: "2025-09-18" },
  ],
  assignments: [
    { subject: "Math", status: "submitted" },
    { subject: "Science", status: "pending" },
    { subject: "English", status: "late" },
  ],
  feedback: [
    { teacher: "Mrs. Verma", note: "Active in class" },
    { teacher: "Mr. Singh", note: "Needs focus in Math" },
  ],
  achievements: [
    { title: "Science Olympiad Medal", date: "2025-08-10" },
    { title: "Best Attendance", date: "2025-07-15" },
  ],
  recommendations: [
    "Encourage your child to revise Science daily for 30 mins.",
    "Praise your child for consistent attendance.",
  ],
}

const parentSidebarItems = [
  { label: "Dashboard", href: "/dashboard/parents" },
  { label: "Performance", href: "/dashboard/parents/performance" },
  { label: "Behavior", href: "/dashboard/parents/behavior" },
  { label: "Counselling", href: "/dashboard/parents/counselling" },
  { label: "Communication", href: "/dashboard/parents/communication" },
  { label: "Achievements", href: "/dashboard/parents/achievements" },
]

function StatusIndicator({ status }: { status: string }) {
  const color =
    status === "red"
      ? "bg-red-500"
      : status === "yellow"
      ? "bg-yellow-400"
      : "bg-green-500"
  const text =
    status === "red"
      ? "At Risk"
      : status === "yellow"
      ? "Needs Attention"
      : "Doing Well"
  return (
    <div className="flex items-center gap-2">
      <span className={`inline-block w-3 h-3 rounded-full ${color}`} />
      <span className="font-semibold">{text}</span>
    </div>
  )
}
// Define UserRole type for allowedRoles prop
// (Removed: Use imported UserRole type from @/lib/auth)


export default function ParentsDashboardPage() {
  const [feedback, setFeedback] = useState("")

  return (
    <ProtectedRoute allowedRoles={["parent" as UserRole]}>
      <DashboardLayout sidebar={<Sidebar items={parentSidebarItems} />}>
        <div className="space-y-8">
          {/* Overview */}
          <section>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <Users className="w-7 h-7 text-blue-600" /> Parent Dashboard
            </h1>
            <p className="text-muted-foreground mb-4">
              Welcome! Here’s a snapshot of your child’s progress and well-being.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
                <div className="text-lg font-semibold mb-2">{child.name}</div>
                <StatusIndicator status={child.status} />
              </div>
              <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
                <span className="font-semibold">Attendance</span>
                <span className="text-2xl font-bold">{child.attendance}%</span>
              </div>
              <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
                <span className="font-semibold">Average Marks</span>
                <span className="text-2xl font-bold">{child.avgMarks}%</span>
              </div>
              <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
                <span className="font-semibold">Behavior</span>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < child.behavior ? "text-yellow-400" : "text-gray-300"}`} />
                  ))}
                </div>
              </div>
            </div>
            {/* Notifications */}
            <div className="mt-6 bg-blue-50 rounded-lg p-4">
              <h2 className="text-lg font-semibold flex items-center gap-2 mb-2">
                <Bell className="w-5 h-5 text-blue-600" /> Notifications
              </h2>
              <ul className="divide-y">
                {child.notifications.map((n) => (
                  <li key={n.id} className="py-2 flex justify-between items-center">
                    <span>{n.message}</span>
                    <span className="text-xs text-gray-400">{n.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Performance Tracking */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-600" /> Performance Tracking
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="font-semibold mb-1">Marks & Grades</div>
                <div className="h-24 bg-gray-100 rounded flex items-center justify-center text-gray-400">[Subject-wise Chart]</div>
              </div>
              <div>
                <div className="font-semibold mb-1">Assignments</div>
                <ul>
                  {child.assignments.map((a, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      <span>{a.subject}:</span>
                      <span
                        className={
                          a.status === "submitted"
                            ? "text-green-600"
                            : a.status === "pending"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }
                      >
                        {a.status}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="font-semibold mb-1">Attendance</div>
                <div className="h-24 bg-gray-100 rounded flex items-center justify-center text-gray-400">[Calendar View]</div>
              </div>
            </div>
          </section>

          {/* Behavior & Wellbeing */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Smile className="w-5 h-5 text-green-600" /> Behavior & Wellbeing
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="font-semibold mb-1">Teacher’s Feedback</div>
                <ul>
                  {child.feedback.map((f, i) => (
                    <li key={i} className="mb-1">
                      <span className="font-medium">{f.teacher}:</span> {f.note}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="font-semibold mb-1">Behaviour Trend</div>
                <div className="h-16 bg-gray-100 rounded flex items-center justify-center text-gray-400">[Trend Graph]</div>
                <div className="mt-2 font-semibold">Mood/Sentiment: <span className="text-blue-600">Positive</span></div>
              </div>
            </div>
          </section>

          {/* Counselling & Interventions */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-yellow-600" /> Counselling & Interventions
            </h2>
            {child.status !== "green" ? (
              <div>
                <div className="mb-2">Suggested Counselling Sessions: <span className="text-blue-600">2 scheduled</span></div>
                <div className="mb-2">Recommended Extra Classes: <span className="text-green-600">Math, Science</span></div>
                <div className="mb-2">Progress after Counselling: <span className="text-purple-600">Improved focus in class</span></div>
              </div>
            ) : (
              <div className="text-green-600">No interventions needed. Your child is doing well!</div>
            )}
          </section>

          {/* Communication & Collaboration */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-blue-600" /> Communication & Collaboration
            </h2>
            <div className="flex flex-col md:flex-row gap-4">
              <button className="btn bg-blue-600 text-white flex items-center gap-2 px-4 py-2 rounded">
                <MessageCircle className="w-4 h-4" /> Chat with Teacher
              </button>
              <button className="btn bg-green-600 text-white flex items-center gap-2 px-4 py-2 rounded">
                <MessageCircle className="w-4 h-4" /> Chat with Counsellor
              </button>
              <button className="btn bg-yellow-500 text-white flex items-center gap-2 px-4 py-2 rounded">
                <Calendar className="w-4 h-4" /> Request Meeting
              </button>
            </div>
            <div className="mt-4">
              <div className="font-semibold mb-1">Feedback Box</div>
              <textarea
                className="w-full border rounded p-2"
                rows={2}
                placeholder="Leave feedback about your child’s progress..."
                value={feedback}
                onChange={e => setFeedback(e.target.value)}
              />
              <button className="btn bg-purple-600 text-white mt-2 flex items-center gap-2 px-4 py-2 rounded">
                <Send className="w-4 h-4" /> Submit Feedback
              </button>
            </div>
          </section>

          {/* Growth & Motivation */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-green-600" /> Growth & Motivation
            </h2>
            <div className="mb-2">
              <div className="font-semibold mb-1">Achievements</div>
              <ul>
                {child.achievements.map((a, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-yellow-500" />
                    <span>{a.title} <span className="text-xs text-gray-400">({a.date})</span></span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-1">Personalized Recommendations</div>
              <ul className="list-disc ml-6">
                {child.recommendations.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
            <div className="mt-4 text-xs text-gray-400">
              Weekly progress mail/SMS alerts are sent to your registered contact.
            </div>
          </section>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}