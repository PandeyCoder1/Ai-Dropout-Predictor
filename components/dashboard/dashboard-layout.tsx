"use client"

import React, { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Menu, BarChart3, Users, FileText, Settings, Upload, AlertTriangle } from "lucide-react"

interface DashboardLayoutProps {
  children: React.ReactNode
  sidebar?: React.ReactNode
}

// Default sidebar items (for fallback)
const sidebarItems = [
  { label: "Overview", href: "/dashboard", icon: BarChart3 },
  { label: "Students", href: "/dashboard/students", icon: Users },
  { label: "Risk Alerts", href: "/dashboard/alerts", icon: AlertTriangle },
  { label: "Reports", href: "/dashboard/reports", icon: FileText },
  { label: "Data Upload", href: "/dashboard/upload", icon: Upload },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function DashboardLayout({ children, sidebar }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {sidebar
            ? React.cloneElement(sidebar as React.ReactElement, { onClose: () => setSidebarOpen(false) })
            : <Sidebar items={sidebarItems} onClose={() => setSidebarOpen(false)} />
          }
        </div>

        {/* Main content */}
        <div className="flex-1 lg:pl-0">
          <DashboardHeader>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-6 w-6" />
            </Button>
          </DashboardHeader>
          <main className="p-6">{children}</main>
        </div>
      </div>
    </div>
  )
}