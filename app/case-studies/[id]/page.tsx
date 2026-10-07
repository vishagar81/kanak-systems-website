import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"
import { notFound, permanentRedirect } from "next/navigation"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { CaseStudyContent } from "@/components/case-study-content"

// This would typically come from a CMS or database
const getCaseStudy = async (id: string) => {
  const caseStudiesData: Record<string, any> = {
    "1": {
      id: "1",
      slug: "lseg-ai-programme-transformation",
      title: "London Stock Exchange Group: £5M AI Programme Transformation",
      client: "London Stock Exchange Group",
      industry: "Financial Services",
      duration: "May 2023 - February 2024",
      teamSize: "25 members (US, UK, India, France, Romania, Thailand)",
      programmeValue: "£5M",
      excerpt:
        "Led a £5M AI programme implementing GenAI solutions across data analytics division, achieving 18-20% productivity improvement.",
      image: "/stocks.png?height=600&width=1200&text=LSEG+Case+Study",
      challenge: `The London Stock Exchange Group's Data Analytics division needed to modernize their development processes and leverage cutting-edge AI technologies to maintain competitive advantage in financial data services. The organization faced challenges with:

• Manual, time-consuming development workflows across geographically distributed teams
• Need for standardized AI/ML implementation across multiple product lines
• Requirements to improve developer productivity while maintaining quality standards
• Complex coordination across teams in 6 different countries and time zones`,
      solution: `As Program Manager, I led the creation and implementation of a comprehensive technical roadmap that transformed LSEG's approach to AI and development:

**AI Integration Strategy:**
• Implemented Generative AI tools using multiple LLMs (OpenAI, DeepSeek, Gemma 2, LLaMa)
• Developed RAG (Retrieval Augmented Generation) systems for knowledge management
• Created AI agents using Crew AI for automated workflow optimization
• Built custom VS Code extensions and Excel add-ins for developer productivity

**Programme Management:**
• Managed geographically distributed team across 6 countries
• Implemented Lean/Agile methodologies for rapid delivery
• Established governance frameworks for AI implementation
• Created technical roadmap aligned with business objectives

**Technology Implementation:**
• Python-based ML pipelines with Conda environment management
• Integration with Hugging Face models and custom fine-tuning
• Copilot and ChatGPT integration for enhanced developer workflows
• Comprehensive monitoring and analytics dashboards`,
      results: [
        {
          metric: "18-20%",
          description: "Improvement in development productivity through AI automation",
        },
        {
          metric: "£5M",
          description: "Programme value delivered across multiple initiatives",
        },
        {
          metric: "25",
          description: "Team members coordinated across 6 countries",
        },
        {
          metric: "Multiple",
          description: "AI/LLM models successfully integrated and deployed",
        },
      ],
      technologies: [
        "OpenAI",
        "LLaMa",
        "DeepSeek",
        "Gemma 2",
        "RAG",
        "Crew AI Agents",
        "Python",
        "Conda",
        "Hugging Face",
        "VS Code Extensions",
        "Lean/Agile",
      ],
      testimonial: {
        quote:
          "The AI programme transformation has fundamentally changed how our teams work, delivering measurable productivity gains while positioning us at the forefront of AI adoption in financial services.",
        author: "Programme Stakeholder",
        role: "London Stock Exchange Group",
      },
    },
    "2": {
      id: "2",
      slug: "transport-for-london-digital-transformation",
      title: "Transport for London: Large-Scale Digital Transformation",
      client: "Transport for London",
      industry: "Transportation & Government",
      duration: "May 2024 - Present",
      teamSize: "Multiple cross-functional teams",
      programmeValue: "Enterprise-scale transformation",
      excerpt:
        "Managing delivery and governance of multiple large-scale projects with end-to-end technology capability enhancements.",
      image: "/underground.png?height=600&width=1200&text=TfL+Case+Study",
      challenge: `Transport for London required comprehensive project management for multiple concurrent digital transformation initiatives affecting millions of daily passengers. Key challenges included:

• Complex stakeholder management across multiple government and transport organizations
• Need for robust governance frameworks for large-scale technology programmes
• Integration of new capabilities while maintaining 24/7 operational systems
• Risk management for critical infrastructure serving 5 million daily passengers
• Coordination of multiple vendors and internal teams`,
      solution: `As Technical Project Manager, I provide end-to-end management and governance for TfL's technology programmes:

**Programme Governance:**
• Comprehensive RAID (Risks, Assumptions, Issues, Dependencies) management
• Multi-project planning and dependency coordination
• Stakeholder engagement across government and transport sectors
• Regular steering committee and governance board reporting

**Delivery Management:**
• Agile delivery frameworks for rapid technology deployment
• Integration planning for new capabilities with existing systems
• Quality assurance and testing coordination
• Change management and organizational readiness

**Team Development:**
• Mentoring junior developers and technical leads
• Continuous improvement initiatives and process optimization
• Knowledge sharing and capability building across teams
• Best practice implementation from financial services experience`,
      results: [
        {
          metric: "Multiple",
          description: "Large-scale programmes successfully governed and delivered",
        },
        {
          metric: "Zero",
          description: "Service disruptions during technology deployments",
        },
        {
          metric: "Enhanced",
          description: "Team capabilities through mentoring and knowledge transfer",
        },
        {
          metric: "Improved",
          description: "Delivery efficiency through process optimization",
        },
      ],
      technologies: [
        "Agile/SAFe",
        "Programme Governance",
        "Risk Management",
        "Cloud Technologies",
        "Microservices",
        "DevOps",
        "CI/CD",
        "Stakeholder Management",
      ],
      testimonial: {
        quote:
          "The structured approach to programme governance and delivery has been instrumental in managing our complex technology transformation initiatives.",
        author: "Programme Director",
        role: "Transport for London",
      },
    },
    "3": {
      id: "3",
      slug: "schroders-serverless-architecture-migration",
      title: "Schroders: Serverless Architecture Migration",
      client: "Schroders Personal Wealth",
      industry: "Wealth Management",
      duration: "April 2021 - December 2022",
      teamSize: "Cross-functional development team",
      programmeValue: "£2M",
      excerpt:
        "Delivered end-to-end serverless solution for Fraud and Financial Crime, reducing cloud expenditure by 20%.",
      image: "/asset-management.png?height=600&width=1200&text=Schroders+Case+Study",
      challenge: `Schroders Personal Wealth needed to modernize their fraud detection and financial crime prevention systems while reducing operational costs. The legacy system faced:

• High cloud infrastructure costs due to inefficient architecture
• Scalability limitations during peak transaction periods
• Slow response times affecting fraud detection capabilities
• Complex maintenance requirements for monolithic architecture
• Need for enhanced security and compliance features`,
      solution: `Led the complete architectural transformation to serverless infrastructure:

**Serverless Architecture:**
• Designed and implemented AWS Lambda-based event-driven architecture
• Migrated from EC2-based infrastructure to fully serverless stack
• Implemented auto-scaling capabilities for variable workloads
• Created microservices for fraud detection and financial crime analysis

**Application Modernization:**
• Containerization of legacy components using Docker
• Event-driven communication patterns using AWS SNS/SQS
• API Gateway implementation for secure service exposure
• DynamoDB and RDS integration for optimal data storage

**Cost Optimization:**
• Detailed cost analysis and optimization strategies
• Right-sizing of resources based on usage patterns
• Implementation of cost monitoring and alerting
• Migration of batch processes to cost-effective Lambda execution`,
      results: [
        {
          metric: "20%",
          description: "Reduction in cloud infrastructure expenditure",
        },
        {
          metric: "£2M",
          description: "Programme value delivered through modernization",
        },
        {
          metric: "100%",
          description: "Migration to serverless architecture completed",
        },
        {
          metric: "Enhanced",
          description: "Fraud detection capabilities with improved response times",
        },
      ],
      technologies: [
        "AWS Lambda",
        "Serverless Framework",
        "Event-Driven Architecture",
        "Docker",
        "Kubernetes",
        "AWS SNS/SQS",
        "API Gateway",
        "DynamoDB",
        "CloudWatch",
        "Terraform",
      ],
      testimonial: {
        quote:
          "The serverless migration not only reduced our costs significantly but also improved our system's responsiveness and scalability. The architectural approach has become a model for our other modernization initiatives.",
        author: "Technical Director",
        role: "Schroders Personal Wealth",
      },
    },
  }

  return Object.values(caseStudiesData).find((caseStudy) => caseStudy.slug === id) || caseStudiesData[id] || null
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const caseStudy = await getCaseStudy(id)

  if (!caseStudy) return { title: "Case study not found | Kanak Systems" }

  const title = `${caseStudy.title} | Kanak Systems`
  const description = caseStudy.excerpt
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  const canonicalUrl = siteUrl ? new URL(`/case-studies/${caseStudy.slug}`, siteUrl).toString() : undefined
  const imagePath = caseStudy.image.split("?")[0]
  const imageUrl = siteUrl && /\.(png|jpe?g|gif|webp)$/i.test(imagePath)
    ? new URL(imagePath, siteUrl).toString()
    : undefined

  return {
    title,
    description,
    ...(canonicalUrl ? { alternates: { canonical: canonicalUrl } } : {}),
    openGraph: {
      title,
      description,
      type: "article",
      ...(canonicalUrl ? { url: canonicalUrl } : {}),
      ...(imageUrl ? { images: [{ url: imageUrl, alt: caseStudy.title }] } : {}),
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title,
      description,
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
  }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const caseStudy = await getCaseStudy(id)

  if (!caseStudy) notFound()
  if (/^\d+$/.test(id)) permanentRedirect(`/case-studies/${caseStudy.slug}`)

  return (
    <div className="page-shell">
      <Header />
      <main className="case-detail">
        <section className="section-wrap case-detail__hero">
          <Link href="/case-studies" className="text-link case-detail__back"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Selected work</Link>
          <p className="eyebrow">{caseStudy.industry} / {caseStudy.client}</p>
          <h1 className="editorial-title">{caseStudy.title}</h1>
          <p className="case-detail__summary">{caseStudy.excerpt}</p>
          <div className="case-detail__outcome">
            <p className="eyebrow">Reported outcome</p>
            <strong>{caseStudy.results[0]?.metric}</strong>
            <p>{caseStudy.results[0]?.description}</p>
          </div>
          <dl className="case-detail__facts">
            <div><dt>Engagement</dt><dd>{caseStudy.duration}</dd></div>
            <div><dt>Team</dt><dd>{caseStudy.teamSize}</dd></div>
            <div><dt>Programme value</dt><dd>{caseStudy.programmeValue}</dd></div>
          </dl>
          <p className="case-detail__caveat">Programme value is not Kanak revenue. Reported results require confirmation of role, baseline, measurement method and client publication permission.</p>
        </section>

        <figure className="section-wrap case-detail__visual">
          <Image src="/images/system-network.svg" alt="" fill sizes="(max-width: 720px) 92vw, 86vw" priority />
          <figcaption>Illustrative systems artwork, not a representation of a client system or technical specification.</figcaption>
        </figure>

        <div className="case-detail__body">
          <section className="case-detail__section">
            <p className="eyebrow">01 / Context</p>
            <h2 className="editorial-title">The challenge</h2>
            <p>{caseStudy.challenge}</p>
          </section>
          <section className="case-detail__section">
            <p className="eyebrow">02 / Contribution</p>
            <h2 className="editorial-title">The work</h2>
            <p>{caseStudy.solution}</p>
          </section>
          <section className="case-detail__section">
            <p className="eyebrow">03 / Evidence</p>
            <h2 className="editorial-title">Reported results</h2>
            <dl className="case-detail__results">
              {caseStudy.results.map((result: { metric: string; description: string }, index: number) => (
                <div key={`${result.metric}-${index}`}>
                  <dt>{result.metric}</dt>
                  <dd>{result.description}</dd>
                </div>
              ))}
            </dl>
            <p className="case-detail__caveat">These results are reported in the existing portfolio and have not been independently verified.</p>
          </section>
          <section className="case-detail__section case-detail__technology">
            <p className="eyebrow">Delivery context</p>
            <h2 className="editorial-title">Methods and technologies</h2>
            <ul>{caseStudy.technologies.map((tech: string) => <li key={tech}>{tech}</li>)}</ul>
          </section>
        </div>

        <CaseStudyContent />
      </main>

      <Footer />
    </div>
  )
}
