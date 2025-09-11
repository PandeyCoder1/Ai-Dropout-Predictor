"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRealtime } from "@/contexts/realtime-context"
import { Eye, Search, Download } from "lucide-react"
import Link from "next/link"

export function StudentsTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [riskFilter, setRiskFilter] = useState("all")

  const { students } = useRealtime()

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRisk = riskFilter === "all" || student.riskCategory.toLowerCase() === riskFilter
    return matchesSearch && matchesRisk
  })

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case "High":
        return "destructive"
      case "Medium":
        return "secondary"
      case "Low":
        return "default"
      default:
        return "default"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle>Students Overview (Live Data)</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>
            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Filter by risk" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
                <SelectItem value="medium">Medium Risk</SelectItem>
                <SelectItem value="low">Low Risk</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Roll No</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Risk %</TableHead>
                <TableHead>Risk Category</TableHead>
                <TableHead>Key Reasons</TableHead>
                <TableHead>Suggested Interventions</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.rollNo}</TableCell>
                  <TableCell>{student.grade}</TableCell>
                  <TableCell>
                    <span
                      className={`font-semibold ${
                        student.riskPercentage >= 70
                          ? "text-destructive"
                          : student.riskPercentage >= 40
                            ? "text-yellow-600"
                            : "text-green-600"
                      }`}
                    >
                      {student.riskPercentage.toFixed(0)}%
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getRiskBadgeVariant(student.riskCategory)}>{student.riskCategory}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {student.keyReasons.slice(0, 2).map((reason, index) => (
                        <div key={index} className="text-xs text-muted-foreground">
                          • {reason}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {student.suggestedInterventions.slice(0, 2).map((intervention, index) => (
                        <div key={index} className="text-xs text-muted-foreground">
                          • {intervention}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/dashboard/students/${student.id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
