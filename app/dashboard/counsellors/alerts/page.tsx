import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Bell } from "lucide-react"

export default function AlertsPage() {
  // Example static alerts; replace with real data fetching as needed
  const alerts = [
    { id: 1, message: "Student Priya Singh flagged as at-risk.", date: "2025-09-21" },
    { id: 2, message: "New counseling slot booked by Amit Sharma.", date: "2025-09-20" },
  ]

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Bell className="h-6 w-6 text-blue-600" />
            <h1 className="text-3xl font-bold text-foreground">Alerts & Notifications</h1>
          </div>
          <p className="text-muted-foreground">
            View important alerts and notifications related to students, sessions, and system updates.
          </p>
          <div className="bg-white rounded-lg shadow p-4">
            {alerts.length === 0 ? (
              <div className="text-muted-foreground">No alerts at this time.</div>
            ) : (
              <ul className="divide-y">
                {alerts.map(alert => (
                  <li key={alert.id} className="py-3 flex justify-between items-center">
                    <span>{alert.message}</span>
                    <span className="text-xs text-gray-400">{alert.date}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}