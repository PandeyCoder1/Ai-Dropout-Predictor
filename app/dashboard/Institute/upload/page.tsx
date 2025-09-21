import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { DataUpload } from "@/components/dashboard/data-upload"

export default function UploadPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Data Upload</h1>
            <p className="text-muted-foreground">Upload student data via CSV or Excel files</p>
          </div>
          <DataUpload />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
