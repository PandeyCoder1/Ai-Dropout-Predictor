"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState, useCallback } from "react"
import type { Student } from "@/lib/mock-data"
import { mockStudents } from "@/lib/mock-data"

export interface ActivityLog {
  id: string
  timestamp: Date
  type: "risk_change" | "attendance_update" | "grade_update" | "login_activity"
  studentId: string
  studentName: string
  message: string
  severity: "low" | "medium" | "high"
}

export interface Notification {
  id: string
  title: string
  message: string
  type: "warning" | "error" | "info" | "success"
  timestamp: Date
  read: boolean
  studentId?: string
}

interface RealtimeContextType {
  students: Student[]
  activities: ActivityLog[]
  notifications: Notification[]
  isConnected: boolean
  lastUpdate: Date | null
  markNotificationAsRead: (id: string) => void
  clearAllNotifications: () => void
  getUnreadCount: () => number
}

const RealtimeContext = createContext<RealtimeContextType | undefined>(undefined)

export function RealtimeProvider({ children }: { children: React.ReactNode }) {
  const [students, setStudents] = useState<Student[]>(mockStudents)
  const [activities, setActivities] = useState<ActivityLog[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isConnected, setIsConnected] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  // Simulate real-time data updates
  const simulateDataUpdate = useCallback(() => {
    setStudents((prevStudents) => {
      const updatedStudents = [...prevStudents]
      const randomIndex = Math.floor(Math.random() * updatedStudents.length)
      const student = { ...updatedStudents[randomIndex] }

      // Simulate different types of updates
      const updateType = Math.random()
      let activityMessage = ""
      let notificationMessage = ""
      let severity: "low" | "medium" | "high" = "low"

      if (updateType < 0.3) {
        // Attendance update
        const oldAttendance = student.attendance
        student.attendance = Math.max(0, Math.min(100, student.attendance + (Math.random() - 0.5) * 10))
        activityMessage = `Attendance updated from ${oldAttendance}% to ${student.attendance.toFixed(0)}%`

        if (student.attendance < 70) {
          severity = "high"
          notificationMessage = `${student.name} has low attendance (${student.attendance.toFixed(0)}%)`
        }
      } else if (updateType < 0.6) {
        // Risk percentage update
        const oldRisk = student.riskPercentage
        student.riskPercentage = Math.max(0, Math.min(100, student.riskPercentage + (Math.random() - 0.5) * 15))

        // Update risk category based on new percentage
        if (student.riskPercentage >= 70) {
          student.riskCategory = "High"
          severity = "high"
        } else if (student.riskPercentage >= 40) {
          student.riskCategory = "Medium"
          severity = "medium"
        } else {
          student.riskCategory = "Low"
          severity = "low"
        }

        activityMessage = `Risk level changed from ${oldRisk}% to ${student.riskPercentage.toFixed(0)}%`

        if (student.riskPercentage >= 70 && oldRisk < 70) {
          notificationMessage = `${student.name} moved to HIGH RISK category (${student.riskPercentage.toFixed(0)}%)`
        }
      } else if (updateType < 0.8) {
        // GPA update
        const oldGPA = student.gpa
        student.gpa = Math.max(0, Math.min(4.0, student.gpa + (Math.random() - 0.5) * 0.5))
        activityMessage = `GPA updated from ${oldGPA.toFixed(1)} to ${student.gpa.toFixed(1)}`

        if (student.gpa < 2.5) {
          severity = "medium"
          notificationMessage = `${student.name} has low GPA (${student.gpa.toFixed(1)})`
        }
      } else {
        // Login activity
        student.lastLogin = new Date().toISOString().split("T")[0]
        activityMessage = "Logged into LMS"
        severity = "low"
      }

      updatedStudents[randomIndex] = student

      // Add activity log
      const newActivity: ActivityLog = {
        id: Date.now().toString(),
        timestamp: new Date(),
        type:
          updateType < 0.3
            ? "attendance_update"
            : updateType < 0.6
              ? "risk_change"
              : updateType < 0.8
                ? "grade_update"
                : "login_activity",
        studentId: student.id,
        studentName: student.name,
        message: activityMessage,
        severity,
      }

      setActivities((prev) => [newActivity, ...prev.slice(0, 49)]) // Keep last 50 activities

      // Add notification if needed
      if (notificationMessage) {
        const newNotification: Notification = {
          id: Date.now().toString(),
          title: severity === "high" ? "High Risk Alert" : "Student Alert",
          message: notificationMessage,
          type: severity === "high" ? "error" : "warning",
          timestamp: new Date(),
          read: false,
          studentId: student.id,
        }
        setNotifications((prev) => [newNotification, ...prev])
      }

      setLastUpdate(new Date())
      return updatedStudents
    })
  }, [])

  // Simulate connection status changes
  useEffect(() => {
    const connectionInterval = setInterval(() => {
      setIsConnected((prev) => {
        if (!prev) return true // Always reconnect
        return Math.random() > 0.05 // 95% uptime
      })
    }, 5000)

    return () => clearInterval(connectionInterval)
  }, [])

  // Simulate real-time updates
  useEffect(() => {
    if (!isConnected) return

    const updateInterval = setInterval(() => {
      simulateDataUpdate()
    }, 3000) // Update every 3 seconds

    return () => clearInterval(updateInterval)
  }, [isConnected, simulateDataUpdate])

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const clearAllNotifications = () => {
    setNotifications([])
  }

  const getUnreadCount = () => {
    return notifications.filter((n) => !n.read).length
  }

  return (
    <RealtimeContext.Provider
      value={{
        students,
        activities,
        notifications,
        isConnected,
        lastUpdate,
        markNotificationAsRead,
        clearAllNotifications,
        getUnreadCount,
      }}
    >
      {children}
    </RealtimeContext.Provider>
  )
}

export function useRealtime() {
  const context = useContext(RealtimeContext)
  if (context === undefined) {
    throw new Error("useRealtime must be used within a RealtimeProvider")
  }
  return context
}
