import { BarChart3 } from "lucide-react"

export function StudentQuizReports() {
  // Replace this with real data fetching logic
  const reports = [
    { id: 1, student: "Amit Sharma", quiz: "Stress Assessment", score: 85, date: "2024-07-09" },
    { id: 2, student: "Priya Singh", quiz: "Motivation Survey", score: 92, date: "2024-07-08" },
  ]

  if (reports.length === 0) {
    return (
      <div className="flex items-center space-x-2 text-muted-foreground">
        <BarChart3 className="w-5 h-5" />
        <span>No quiz reports available.</span>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-muted-foreground">
            <th className="py-2">Student</th>
            <th className="py-2">Quiz</th>
            <th className="py-2">Score</th>
            <th className="py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {reports.map(report => (
            <tr key={report.id} className="border-t">
              <td className="py-2">{report.student}</td>
              <td className="py-2">{report.quiz}</td>
              <td className="py-2">{report.score}</td>
              <td className="py-2">{report.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}