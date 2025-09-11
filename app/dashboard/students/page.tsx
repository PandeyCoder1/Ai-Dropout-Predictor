import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { StudentsTable } from "@/components/dashboard/students-table"

export default function StudentsPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Student Management</h1>
            <p className="text-muted-foreground">Monitor and manage student risk levels</p>
          </div>
          <StudentsTable />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
