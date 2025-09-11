export interface Student {
  id: string
  name: string
  rollNo: string
  email: string
  grade: string
  riskPercentage: number
  riskCategory: "Low" | "Medium" | "High"
  keyReasons: string[]
  suggestedInterventions: string[]
  attendance: number
  gpa: number
  lastLogin: string
  financialAid: boolean
  parentContact: string
}

export const mockStudents: Student[] = [
  {
    id: "1",
    name: "Alex Johnson",
    rollNo: "2024001",
    email: "alex.johnson@school.edu",
    grade: "10th",
    riskPercentage: 85,
    riskCategory: "High",
    keyReasons: ["Low attendance (65%)", "Declining grades", "No LMS activity"],
    suggestedInterventions: ["Immediate counseling", "Parent meeting", "Academic support"],
    attendance: 65,
    gpa: 2.1,
    lastLogin: "2024-01-15",
    financialAid: false,
    parentContact: "+1-555-0101",
  },
  {
    id: "2",
    name: "Maria Garcia",
    rollNo: "2024002",
    email: "maria.garcia@school.edu",
    grade: "11th",
    riskPercentage: 72,
    riskCategory: "High",
    keyReasons: ["Financial stress", "Part-time job conflicts", "Missing assignments"],
    suggestedInterventions: ["Financial aid counseling", "Schedule adjustment", "Tutoring"],
    attendance: 78,
    gpa: 2.8,
    lastLogin: "2024-01-20",
    financialAid: true,
    parentContact: "+1-555-0102",
  },
  {
    id: "3",
    name: "David Chen",
    rollNo: "2024003",
    email: "david.chen@school.edu",
    grade: "12th",
    riskPercentage: 45,
    riskCategory: "Medium",
    keyReasons: ["Inconsistent performance", "Social isolation"],
    suggestedInterventions: ["Peer mentoring", "Study groups", "Social activities"],
    attendance: 85,
    gpa: 3.2,
    lastLogin: "2024-01-22",
    financialAid: false,
    parentContact: "+1-555-0103",
  },
  {
    id: "4",
    name: "Sarah Williams",
    rollNo: "2024004",
    email: "sarah.williams@school.edu",
    grade: "9th",
    riskPercentage: 25,
    riskCategory: "Low",
    keyReasons: ["Good performance", "Regular attendance"],
    suggestedInterventions: ["Continue monitoring", "Enrichment programs"],
    attendance: 95,
    gpa: 3.8,
    lastLogin: "2024-01-23",
    financialAid: false,
    parentContact: "+1-555-0104",
  },
  {
    id: "5",
    name: "Michael Brown",
    rollNo: "2024005",
    email: "michael.brown@school.edu",
    grade: "10th",
    riskPercentage: 68,
    riskCategory: "Medium",
    keyReasons: ["Family issues", "Emotional stress", "Grade decline"],
    suggestedInterventions: ["Counseling services", "Flexible deadlines", "Support groups"],
    attendance: 82,
    gpa: 2.9,
    lastLogin: "2024-01-21",
    financialAid: true,
    parentContact: "+1-555-0105",
  },
  {
    id: "6",
    name: "Emily Davis",
    rollNo: "2024006",
    email: "emily.davis@school.edu",
    grade: "11th",
    riskPercentage: 15,
    riskCategory: "Low",
    keyReasons: ["Excellent performance", "High engagement"],
    suggestedInterventions: ["Leadership opportunities", "Advanced courses"],
    attendance: 98,
    gpa: 4.0,
    lastLogin: "2024-01-23",
    financialAid: false,
    parentContact: "+1-555-0106",
  },
]

export const getRiskDistribution = () => {
  const distribution = mockStudents.reduce(
    (acc, student) => {
      acc[student.riskCategory]++
      return acc
    },
    { Low: 0, Medium: 0, High: 0 },
  )

  return [
    { name: "Low Risk", value: distribution.Low, color: "#10b981" },
    { name: "Medium Risk", value: distribution.Medium, color: "#f59e0b" },
    { name: "High Risk", value: distribution.High, color: "#ef4444" },
  ]
}

export const getAttendanceData = () => {
  return mockStudents.map((student) => ({
    name: student.name.split(" ")[0],
    attendance: student.attendance,
    risk: student.riskPercentage,
  }))
}

export const getGradeDistribution = () => {
  const gradeCount = mockStudents.reduce(
    (acc, student) => {
      acc[student.grade] = (acc[student.grade] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  return Object.entries(gradeCount).map(([grade, count]) => ({
    grade,
    students: count,
  }))
}
