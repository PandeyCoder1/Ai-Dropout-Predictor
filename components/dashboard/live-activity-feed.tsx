"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { useRealtime } from "@/contexts/realtime-context"
import { Activity, Clock } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export function LiveActivityFeed() {
  const { activities } = useRealtime()

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "default"
      default:
        return "default"
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "risk_change":
        return "📊"
      case "attendance_update":
        return "📅"
      case "grade_update":
        return "📝"
      case "login_activity":
        return "💻"
      default:
        return "📋"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Activity className="h-5 w-5" />
          <span>Live Activity Feed</span>
        </CardTitle>
        <CardDescription>Real-time updates from student monitoring system</CardDescription>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No recent activity</p>
          </div>
        ) : (
          <ScrollArea className="h-80">
            <div className="space-y-3">
              {activities.slice(0, 20).map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg border">
                  <span className="text-lg">{getActivityIcon(activity.type)}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{activity.studentName}</p>
                      <Badge variant={getSeverityColor(activity.severity)} className="text-xs">
                        {activity.severity}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{activity.message}</p>
                    <div className="flex items-center space-x-1 mt-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{formatDistanceToNow(activity.timestamp, { addSuffix: true })}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}
