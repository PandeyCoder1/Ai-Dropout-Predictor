"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const questions = [
  {
    id: "attendance",
    label: "How often do you attend classes?",
    options: [
      { label: "Always", value: 0 },
      { label: "Often", value: 1 },
      { label: "Sometimes", value: 2 },
      { label: "Rarely", value: 3 },
      { label: "Never", value: 4 },
    ],
  },
  {
    id: "workload",
    label: "How do you feel about your academic workload?",
    options: [
      { label: "Manageable", value: 0 },
      { label: "Sometimes overwhelming", value: 2 },
      { label: "Always overwhelming", value: 4 },
    ],
  },
  {
    id: "assignments",
    label: "How many assignments do you submit on time?",
    options: [
      { label: "All", value: 0 },
      { label: "Most", value: 1 },
      { label: "Some", value: 2 },
      { label: "Few", value: 3 },
      { label: "None", value: 4 },
    ],
  },
  {
    id: "support",
    label: "Do you feel supported by teachers/counselors?",
    options: [
      { label: "Always", value: 0 },
      { label: "Often", value: 1 },
      { label: "Sometimes", value: 2 },
      { label: "Rarely", value: 3 },
      { label: "Never", value: 4 },
    ],
  },
  {
    id: "stress",
    label: "How often do you feel stressed about studies?",
    options: [
      { label: "Never", value: 0 },
      { label: "Rarely", value: 1 },
      { label: "Sometimes", value: 2 },
      { label: "Often", value: 3 },
      { label: "Always", value: 4 },
    ],
  },
  {
    id: "participation",
    label: "How often do you participate in class or activities?",
    options: [
      { label: "Always", value: 0 },
      { label: "Often", value: 1 },
      { label: "Sometimes", value: 2 },
      { label: "Rarely", value: 3 },
      { label: "Never", value: 4 },
    ],
  },
  {
    id: "resources",
    label:
      "Do you have access to resources (books, internet, etc.) needed for your studies?",
    options: [
      { label: "Always", value: 0 },
      { label: "Often", value: 1 },
      { label: "Sometimes", value: 2 },
      { label: "Rarely", value: 3 },
      { label: "Never", value: 4 },
    ],
  },
  {
    id: "financial",
    label: "Do you have any financial difficulties affecting your studies?",
    options: [
      { label: "No", value: 0 },
      { label: "Sometimes", value: 2 },
      { label: "Yes", value: 4 },
    ],
  },
];

function analyzeRisk(answers: Record<string, number>) {
  // Higher value = higher risk for all questions
  let score = 0;
  for (const key in answers) {
    score += answers[key] || 0;
  }
  if (score <= 7) return { level: "Low", color: "#10b981" };
  if (score <= 15) return { level: "Medium", color: "#f59e0b" };
  return { level: "High", color: "#ef4444" };
}

export function StudentRiskQuiz({
  onResult,
}: {
  onResult: (risk: { level: string; color: string }) => void;
}) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (id: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      const risk = analyzeRisk(answers);
      onResult(risk);
      setSubmitting(false);
    }, 500);
  };

  return (
    <Card className="container mx-auto mt-6">
      <CardHeader>
        <CardTitle>Dropout Risk Self-Assessment Quiz</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {questions.map((q) => (
            <div key={q.id} className="space-y-2">
              <Label className="block mb-1 font-medium">{q.label}</Label>
              <div className="flex flex-wrap gap-4">
                {q.options.map((opt) => (
                  <label
                    key={opt.label}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name={q.id}
                      value={opt.value}
                      checked={answers[q.id] === opt.value}
                      onChange={() => handleChange(q.id, opt.value)}
                      required
                      disabled={submitting}
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Analyzing..." : "Submit Quiz"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
