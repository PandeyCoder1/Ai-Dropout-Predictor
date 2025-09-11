import { LoginForm } from "@/components/auth/login-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-4">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">AI Dropout Predictor</span>
          </Link>
          <p className="text-muted-foreground">Sign in to your account</p>
        </div>

        <Card className="border-border">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
            <CardDescription className="text-center">Enter your credentials to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link href="/signup" className="text-primary hover:underline font-medium">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 p-4 bg-card rounded-lg border">
          <h3 className="font-semibold text-sm mb-2">Demo Accounts:</h3>
          <div className="space-y-1 text-xs text-muted-foreground">
            <div>Admin: admin@school.edu / admin123</div>
            <div>Teacher: teacher@school.edu / teacher123</div>
            <div>Counselor: counselor@school.edu / counselor123</div>
          </div>
        </div>
      </div>
    </div>
  )
}
