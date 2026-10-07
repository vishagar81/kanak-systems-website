import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const projects = [
  {
    client: "Financial services / Applied AI",
    title: "LSEG: AI programme transformation",
    summary: "Development workflows supported by generative AI.",
    outcome: "18-20% reported productivity improvement*",
    steps: ["Context", "AI workflow", "Evaluation"],
    href: "/case-studies/lseg-ai-programme-transformation",
    action: "Read existing case study",
  },
  {
    client: "Financial services / Cloud",
    title: "Schroders: Serverless migration",
    summary: "A serverless solution for fraud and financial crime.",
    outcome: "20% reported cloud cost reduction*",
    steps: ["Events", "Services", "Scale"],
    href: "/case-studies/schroders-serverless-architecture-migration",
    action: "Read existing case study",
  },
]

export function SelectedWork() {
  return (
    <section id="work" className="selected-work section-wrap section-rule">
      <div className="section-heading">
        <p className="eyebrow">01 / Selected work</p>
        <h2 className="editorial-title">From possibility to practice.</h2>
      </div>
      <div className="selected-work__grid">
        {projects.map((project) => (
          <article className="work-item" key={project.title}>
            <div className="work-diagram" aria-label={`${project.steps.join(" to ")} workflow diagram`}>
              {project.steps.map((step, index) => (
                <div className="work-diagram__step" key={step}>
                  {index > 0 && <span className="work-diagram__arrow" aria-hidden="true">→</span>}
                  <span className="work-diagram__node">{step}</span>
                </div>
              ))}
            </div>
            <p className="eyebrow">{project.client}</p>
            <h3>{project.title}</h3>
            <p className="body-muted">{project.summary}</p>
            <p className="work-item__outcome">{project.outcome}</p>
            <Link className="text-link" href={project.href}>{project.action} <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
          </article>
        ))}
      </div>
      <p className="work-disclaimer">*Reported on the existing website and not independently verified. Role, baseline, measurement method and attribution require confirmation.</p>
    </section>
  )
}