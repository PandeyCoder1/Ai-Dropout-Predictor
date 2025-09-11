"use client"

import { Badge } from "@/components/ui/badge"
import { useRealtime } from "@/contexts/realtime-context"
import { Wifi, WifiOff } from "lucide-react"

export function ConnectionStatus() {
  const { isConnected, lastUpdate } = useRealtime()

  return (
    <div className="flex items-center space-x-2">
      <Badge variant={isConnected ? "default" : "destructive"} className="flex items-center space-x-1">
        {isConnected ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
        <span>{isConnected ? "Live" : "Offline"}</span>
      </Badge>
      {lastUpdate && <span className="text-xs text-muted-foreground">Updated {lastUpdate.toLocaleTimeString()}</span>}
    </div>
  )
}
