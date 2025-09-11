import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Impact } from "@/components/impact"
import { Pricing } from "@/components/pricing"
import { Contact } from "@/components/contact"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Features />
        <Impact />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
