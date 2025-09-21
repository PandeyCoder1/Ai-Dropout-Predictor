"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { StudentRiskQuiz } from "@/components/dashboard/student-risk-quiz";
import { QuickStats } from "@/components/dashboard/quick-stats";
import { BookOpen, CalendarCheck, Award, Users } from "lucide-react";

export default function StudentDashboard() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [risk, setRisk] = useState<{ level: string; color: string } | null>(
    null
  );

  // Dummy data for student widgets
  const stats = [
    {
      title: "Attendance",
      value: "92%",
      icon: CalendarCheck,
      description: "Your attendance this semester",
    },
    {
      title: "Assignments Submitted",
      value: "18/20",
      icon: BookOpen,
      description: "Assignments submitted on time",
    },
    {
      title: "GPA",
      value: "3.7",
      icon: Award,
      description: "Your current GPA",
    },
    {
      title: "Clubs Joined",
      value: "2",
      icon: Users,
      description: "Active club memberships",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Student Dashboard
        </h1>
        <p className="text-muted-foreground">
          Check your risk status and take the self-assessment quiz to see your
          dropout risk level.
        </p>
      </div>

      {/* Student Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <QuickStats
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            description={stat.description}
          />
        ))}
      </div>

      {/* Risk Level and Quiz */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Dropout Risk Level</CardTitle>
            <CardDescription>
              Based on your latest self-assessment
            </CardDescription>
          </CardHeader>
          <CardContent>
            {risk ? (
              <div className="flex flex-col items-center space-y-2">
                <span className="text-lg font-semibold">Risk Level:</span>
                <span
                  className="text-2xl font-bold"
                  style={{ color: risk.color }}
                >
                  {risk.level}
                </span>
              </div>
            ) : (
              <div className="text-muted-foreground">
                No assessment taken yet.
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Take Risk Quiz</CardTitle>
            <CardDescription>
              Fill out the quiz to analyze your risk
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!showQuiz ? (
              <Button className="w-full" onClick={() => setShowQuiz(true)}>
                Take Risk Quiz
              </Button>
            ) : (
              <StudentRiskQuiz
                onResult={(riskResult) => {
                  setRisk(riskResult);
                  setShowQuiz(false);
                }}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
