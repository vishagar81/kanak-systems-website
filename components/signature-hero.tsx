import Image from "next/image"
import Link from "next/link"
import { ArrowDown, ArrowUpRight } from "lucide-react"

export function SignatureHero() {
  return (
    <section className="signature-hero section-wrap">
      <div className="signature-hero__main">
        <div className="signature-hero__copy">
          <p className="eyebrow">Software / Applied AI / Delivery</p>
          <h1 className="editorial-title signature-hero__title">
            Complex ideas,<br />
            <em>measurable</em><br />
            outcomes.
          </h1>
          <p className="signature-hero__description">
            From first idea to production: ideation, solution design and productionizing, delivered against pre-agreed, measurable outcomes.
          </p>
          <div className="signature-hero__actions">
            <Link className="site-button" href="#contact">Discuss your project <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
            <Link className="text-link" href="/case-studies">View selected work <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
          <p className="signature-hero__note">Pre-agreed, measurable outcomes <span aria-hidden="true">·</span> Milton Keynes, UK</p>
        </div>
        <div className="signature-hero__art" aria-label="Illustrative network of connected software systems">
          <Image src="/images/system-network.svg" alt="Abstract connected system moving from exploratory ideas to a live network" width={720} height={800} priority className="system-art" />
          <span className="signature-hero__art-caption">An illustrative system, from idea to operation</span>
        </div>
      </div>
      <div className="experience-note section-rule">
        <p className="eyebrow">Experience, with context</p>
        <p>Selected examples from the existing portfolio. Engagement roles, client permissions and reported results should be confirmed before publication.</p>
        <Link href="#work" aria-label="Continue to selected work"><ArrowDown className="h-5 w-5" aria-hidden="true" /></Link>
      </div>
    </section>
  )
}