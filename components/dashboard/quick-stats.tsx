import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface QuickStatsProps {
  title: string
  value: string
  icon: LucideIcon
  description: string
  variant?: "default" | "destructive"
}

export function QuickStats({ title, value, icon: Icon, description, variant = "default" }: QuickStatsProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className={cn("text-3xl font-bold", variant === "destructive" && "text-destructive")}>{value}</p>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          </div>
          <div className={cn("p-3 rounded-full", variant === "destructive" ? "bg-destructive/10" : "bg-primary/10")}>
            <Icon className={cn("h-6 w-6", variant === "destructive" ? "text-destructive" : "text-primary")} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
