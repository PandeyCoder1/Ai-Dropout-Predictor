"use client";
import { Button } from "@/components/ui/button";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import DashboardOverview from "@/components/dashboard/dashboard-overview";
import { useAuth } from "@/contexts/auth-context";
import StudentDashboard from "@/components/dashboard/student-dashboard";
import { useEffect, useState } from "react";

function AdminDashboard() {
  return <DashboardOverview />;
}

function TeacherDashboard() {
  return (
    <div className="text-xl font-bold">
      Teacher Dashboard (customize as needed)
    </div>
  );
}

function CounselorDashboard() {
  return (
    <div className="text-xl font-bold">
      Counselor Dashboard (customize as needed)
    </div>
  );
}

import { StudentRiskQuiz } from "@/components/dashboard/student-risk-quiz";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

// Removed duplicate StudentDashboard definition to resolve import conflict

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (user) setRole(user.role);
  }, [user]);

  let dashboardContent = null;
  if (role === "admin") dashboardContent = <AdminDashboard />;
  else if (role === "teacher") dashboardContent = <TeacherDashboard />;
  else if (role === "counselor") dashboardContent = <CounselorDashboard />;
  else if (role === "student") dashboardContent = <StudentDashboard />;

  return (
    <ProtectedRoute>
      <DashboardLayout>
        {isLoading ? <div>Loading...</div> : dashboardContent}
      </DashboardLayout>
    </ProtectedRoute>
  );
}
