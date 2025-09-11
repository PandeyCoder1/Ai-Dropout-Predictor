import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Users, AlertTriangle, FileSpreadsheet, Shield, Zap } from "lucide-react"

const features = [
  {
    icon: BarChart3,
    title: "Advanced Analytics Dashboard",
    description:
      "Comprehensive risk distribution charts and real-time student monitoring with intuitive visualizations.",
  },
  {
    icon: Users,
    title: "Student Profile Management",
    description:
      "Detailed student profiles with dropout probability, risk factors, and personalized intervention recommendations.",
  },
  {
    icon: AlertTriangle,
    title: "Early Warning System",
    description: "Real-time alerts and notifications for high-risk students with automated intervention triggers.",
  },
  {
    icon: FileSpreadsheet,
    title: "Data Import & Export",
    description: "Seamless CSV/Excel data upload and comprehensive report generation in multiple formats.",
  },
  {
    icon: Shield,
    title: "Role-Based Security",
    description: "Secure multi-role access control for administrators, teachers, and counselors with data protection.",
  },
  {
    icon: Zap,
    title: "Real-Time Updates",
    description: "Live data synchronization with attendance, grades, and LMS integration for instant insights.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">
            Powerful Features for Educational Success
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Everything you need to identify, understand, and support at-risk students with data-driven insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
