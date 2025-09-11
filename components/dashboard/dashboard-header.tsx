import type React from "react"
import { UserNav } from "@/components/auth/user-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { NotificationCenter } from "@/components/dashboard/notification-center"
import { ConnectionStatus } from "@/components/dashboard/connection-status"

interface DashboardHeaderProps {
  children?: React.ReactNode
}

export function DashboardHeader({ children }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-4">{children}</div>
        <div className="flex items-center space-x-4">
          <ConnectionStatus />
          <NotificationCenter />
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  )
}
