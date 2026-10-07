import { Header } from "@/components/header"
import { SignatureHero } from "@/components/signature-hero"
import { SelectedWork } from "@/components/selected-work"
import { StagesSection } from "@/components/stages-section"
import { OutcomesSection } from "@/components/outcomes-section"
import { InsightsPreview } from "@/components/insights-preview"
import { ProjectContact } from "@/components/project-contact"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="page-shell">
      <Header />
      <main>
        <SignatureHero />
        <SelectedWork />
        <StagesSection />
        <OutcomesSection />
        <InsightsPreview />
        <ProjectContact />
      </main>
      <Footer />
    </div>
  )
}
