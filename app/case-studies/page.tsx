import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CaseStudiesHero } from "@/components/case-studies-hero"
import { CaseStudiesList } from "@/components/case-studies-list"

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <CaseStudiesHero />
        <CaseStudiesList />
      </main>
      <Footer />
    </div>
  )
}
