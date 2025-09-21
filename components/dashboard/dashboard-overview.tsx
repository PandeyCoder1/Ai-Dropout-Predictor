"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RiskDistributionChart } from "@/components/dashboard/risk-distribution-chart";
import { AttendanceChart } from "@/components/dashboard/attendance-chart";
import { RecentAlerts } from "@/components/dashboard/recent-alerts";
import { QuickStats } from "@/components/dashboard/quick-stats";
import { LiveActivityFeed } from "@/components/dashboard/live-activity-feed";
import { useRealtime } from "@/contexts/realtime-context";
import { Users, AlertTriangle, TrendingUp, GraduationCap } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { RegisterStudentForm } from "@/components/dashboard/register-student-form";

export default function DashboardOverview() {
  const { students } = useRealtime();
  const { user } = useAuth();

  const totalStudents = students.length;
  const highRiskStudents = students.filter(
    (s) => s.riskCategory === "High"
  ).length;
  const averageAttendance = Math.round(
    students.reduce((sum, student) => sum + student.attendance, 0) /
      totalStudents
  );
  const averageGPA = (
    students.reduce((sum, student) => sum + student.gpa, 0) / totalStudents
  ).toFixed(1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground">
          Monitor student risk levels and key metrics in real-time
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <QuickStats
          title="Total Students"
          value={totalStudents.toString()}
          icon={Users}
          description="Active students monitored"
        />
        <QuickStats
          title="High Risk"
          value={highRiskStudents.toString()}
          icon={AlertTriangle}
          description="Students needing immediate attention"
          variant="destructive"
        />
        <QuickStats
          title="Avg Attendance"
          value={`${averageAttendance}%`}
          icon={TrendingUp}
          description="Overall attendance rate"
        />
        <QuickStats
          title="Avg GPA"
          value={averageGPA}
          icon={GraduationCap}
          description="Current academic performance"
        />
      </div>

      {/* Admin: Register Student */}
      {user?.role === "admin" && (
        <Card>
          <CardHeader>
            <CardTitle>Register New Student</CardTitle>
            <CardDescription>
              Generate login credentials for a new student and save them to the
              database.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterStudentForm />
          </CardContent>
        </Card>
      )}

      {/* Charts and Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Risk Distribution</CardTitle>
            <CardDescription>
              Student risk levels across the institution
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RiskDistributionChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Attendance vs Risk</CardTitle>
            <CardDescription>
              Correlation between attendance and dropout risk
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AttendanceChart />
          </CardContent>
        </Card>

        <LiveActivityFeed />
      </div>

      {/* Recent Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Risk Alerts</CardTitle>
          <CardDescription>
            Students who recently moved to higher risk categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RecentAlerts />
        </CardContent>
      </Card>
    </div>
  );
}
