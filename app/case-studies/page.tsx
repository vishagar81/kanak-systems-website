import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WorkHero } from "@/components/work-hero"
import { WorkIndex } from "@/components/work-index"

export default function CaseStudiesPage() {
  return (
    <div className="page-shell">
      <Header />
      <main>
        <WorkHero />
        <WorkIndex />
      </main>
      <Footer />
    </div>
  )
}
