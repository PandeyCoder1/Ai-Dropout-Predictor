"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Upload, FileSpreadsheet, CheckCircle, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function DataUpload() {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)
  const { toast } = useToast()

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    const allowedTypes = [".csv", ".xlsx", ".xls"]
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf("."))

    if (!allowedTypes.includes(fileExtension)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV or Excel file.",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)
    setUploadProgress(0)
    setUploadComplete(false)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setUploadComplete(true)
          toast({
            title: "Upload successful",
            description: `${file.name} has been processed successfully.`,
          })
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5" />
            <span>Upload Student Data</span>
          </CardTitle>
          <CardDescription>
            Upload CSV or Excel files containing student information, grades, and attendance data.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="file-upload">Select File</Label>
            <Input
              id="file-upload"
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileUpload}
              disabled={isUploading}
            />
          </div>

          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} />
            </div>
          )}

          {uploadComplete && (
            <div className="flex items-center space-x-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <span className="text-sm">Upload completed successfully!</span>
            </div>
          )}

          <div className="pt-4 border-t">
            <h4 className="font-medium mb-2">File Requirements:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Supported formats: CSV, Excel (.xlsx, .xls)</li>
              <li>• Maximum file size: 10MB</li>
              <li>• Required columns: Name, Roll No, Grade, Email</li>
              <li>• Optional: Attendance, GPA, Parent Contact</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileSpreadsheet className="h-5 w-5" />
            <span>Sample Template</span>
          </CardTitle>
          <CardDescription>Download our sample template to ensure your data is formatted correctly.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Button variant="outline" className="w-full bg-transparent">
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Download CSV Template
            </Button>
            <Button variant="outline" className="w-full bg-transparent">
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Download Excel Template
            </Button>
          </div>

          <div className="pt-4 border-t">
            <h4 className="font-medium mb-2">Template Columns:</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <div className="grid grid-cols-2 gap-2">
                <span>• Name</span>
                <span>• Roll Number</span>
                <span>• Email</span>
                <span>• Grade</span>
                <span>• Attendance %</span>
                <span>• GPA</span>
                <span>• Parent Contact</span>
                <span>• Financial Aid</span>
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-yellow-800 dark:text-yellow-200">Important Note</p>
              <p className="text-yellow-700 dark:text-yellow-300">
                Ensure all student data is anonymized and complies with your institution's privacy policies.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
