import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const work = [
  {
    id: "01",
    type: "Financial services / Applied AI",
    title: "LSEG: AI programme transformation",
    summary: "Development workflows supported by generative AI.",
    outcome: "18-20% reported productivity improvement*",
    flow: ["Context", "AI workflow", "Evaluation"],
    href: "/case-studies/lseg-ai-programme-transformation",
  },
  {
    id: "02",
    type: "Transportation / Delivery",
    title: "Transport for London: Digital transformation",
    summary: "Programme delivery and governance across multiple initiatives.",
    outcome: "Multi-programme delivery and governance",
    flow: ["Governance", "Delivery", "Capability"],
    href: "/case-studies/transport-for-london-digital-transformation",
  },
  {
    id: "03",
    type: "Financial services / Cloud",
    title: "Schroders: Serverless migration",
    summary: "A serverless solution for fraud and financial crime.",
    outcome: "20% reported cloud cost reduction*",
    flow: ["Events", "Services", "Scale"],
    href: "/case-studies/schroders-serverless-architecture-migration",
  },
]

export function WorkIndex() {
  return (
    <section className="work-index section-wrap">
      {work.map((item) => (
        <article className="work-index__item" key={item.id}>
          <span className="work-index__number">{item.id}</span>
          <div className="work-index__content">
            <p className="eyebrow">{item.type}</p>
            <h2>{item.title}</h2>
            <p className="body-muted">{item.summary}</p>
            <p className="work-item__outcome">{item.outcome}</p>
            <Link className="text-link" href={item.href}>Read case study <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
          <div className="work-diagram" aria-label={`${item.flow.join(" to ")} workflow diagram`}>
            {item.flow.map((step, index) => (
              <div className="work-diagram__step" key={step}>
                {index > 0 && <span className="work-diagram__arrow" aria-hidden="true">→</span>}
                <span className="work-diagram__node">{step}</span>
              </div>
            ))}
          </div>
        </article>
      ))}
      <p className="work-disclaimer">*Reported on the existing website and not independently verified. Client attribution, role, baseline and measurement method should be reviewed before launch.</p>
    </section>
  )
}