import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRealtime } from "@/contexts/realtime-context"
import { AlertTriangle, Eye } from "lucide-react"
import Link from "next/link"

export function RecentAlerts() {
  const { students } = useRealtime()
  const highRiskStudents = students.filter((student) => student.riskCategory === "High").slice(0, 3)

  return (
    <div className="space-y-4">
      {highRiskStudents.map((student) => (
        <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-destructive/10 rounded-full">
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </div>
            <div>
              <p className="font-medium">{student.name}</p>
              <p className="text-sm text-muted-foreground">Risk: {student.riskPercentage.toFixed(0)}%</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {student.keyReasons.slice(0, 2).map((reason, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {reason}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <Button size="sm" variant="outline" asChild>
            <Link href={`/dashboard/students/${student.id}`}>
              <Eye className="h-4 w-4 mr-2" />
              View
            </Link>
          </Button>
        </div>
      ))}
    </div>
  )
}
