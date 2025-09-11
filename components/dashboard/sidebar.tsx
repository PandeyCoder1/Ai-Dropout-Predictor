"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { BarChart3, Users, FileText, Settings, Upload, AlertTriangle, GraduationCap, X } from "lucide-react"

const navigation = [
  { name: "Overview", href: "/dashboard", icon: BarChart3 },
  { name: "Students", href: "/dashboard/students", icon: Users },
  { name: "Risk Alerts", href: "/dashboard/alerts", icon: AlertTriangle },
  { name: "Reports", href: "/dashboard/reports", icon: FileText },
  { name: "Data Upload", href: "/dashboard/upload", icon: Upload },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

interface SidebarProps {
  onClose?: () => void
}

export function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname()
  const { user } = useAuth()

  return (
    <div className="flex h-full w-64 flex-col bg-sidebar border-r border-sidebar-border">
      <div className="flex h-16 items-center justify-between px-6 border-b border-sidebar-border">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <GraduationCap className="h-8 w-8 text-sidebar-accent" />
          <span className="text-lg font-bold text-sidebar-foreground">AI Dropout</span>
        </Link>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden">
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      <div className="flex-1 px-4 py-6">
        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
                onClick={onClose}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center space-x-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sidebar-accent text-sidebar-accent-foreground text-sm font-medium">
            {user?.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">{user?.name}</p>
            <p className="text-xs text-sidebar-foreground/70 truncate capitalize">{user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
