"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export function CaseStudyContent() {
  return (
    <section className="case-study-discussion">
      <div className="section-wrap case-study-discussion__inner">
        <div>
          <p className="eyebrow">Project discussion</p>
          <h2 className="editorial-title">Could this approach fit your next system?</h2>
          <p>Start with the outcome you need and the questions you want to resolve.</p>
        </div>
        <div className="case-study-discussion__actions">
          <Link className="site-button" href="/#contact">Discuss a project <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
          <Link className="text-link" href="/case-studies">View selected work <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  )
}