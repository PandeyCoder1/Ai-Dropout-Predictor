import { Card, CardContent } from "@/components/ui/card"

const stats = [
  {
    number: "30%",
    label: "Average Dropout Reduction",
    description: "Schools using our platform see significant improvement in retention rates",
  },
  {
    number: "85%",
    label: "Prediction Accuracy",
    description: "AI models accurately identify at-risk students before they drop out",
  },
  {
    number: "500+",
    label: "Educational Institutions",
    description: "Trusted by schools, colleges, and universities worldwide",
  },
  {
    number: "50K+",
    label: "Students Supported",
    description: "Lives impacted through early intervention and personalized support",
  },
]

export function Impact() {
  return (
    <section id="impact" className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">Measurable Impact on Student Success</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Our AI-powered platform delivers real results for educational institutions committed to student success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center border-border">
              <CardContent className="pt-8 pb-6">
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-lg font-semibold text-foreground mb-2">{stat.label}</div>
                <div className="text-sm text-muted-foreground text-pretty">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
