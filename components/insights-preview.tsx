import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const insights = [
  {
    category: "Engineering / Jul 2026",
    title: "Better context for agentic code review",
    href: "/blogs/agentic-code-review-copilot-context",
    action: "Read existing article",
  },
  {
    category: "Applied AI / Implementation",
    title: "Building an intelligent multi-agent system",
    href: "/blogs/intelligent-multi-agent-system",
    action: "Explore the article",
  },
]

export function InsightsPreview() {
  return (
    <section className="insights-preview section-wrap section-rule">
      <div className="section-heading">
        <p className="eyebrow">04 / Insights</p>
        <h2 className="editorial-title">Thinking worth sharing.</h2>
      </div>
      <div className="insights-preview__grid">
        {insights.map((insight) => (
          <article className="insight-item" key={insight.href}>
            <p className="eyebrow">{insight.category}</p>
            <h3><Link href={insight.href}>{insight.title}</Link></h3>
            <Link className="text-link" href={insight.href}>{insight.action} <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
          </article>
        ))}
      </div>
      <Link className="text-link insights-preview__all" href="/blogs">View all insights <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
    </section>
  )
}