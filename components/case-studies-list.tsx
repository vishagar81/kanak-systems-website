import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Building2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Case studies data
const caseStudies = [
  {
    id: 1,
    title: "London Stock Exchange Group: £5M AI Programme Transformation",
    client: "London Stock Exchange Group",
    industry: "Financial Services",
    excerpt:
      "Led a £5M AI programme implementing GenAI solutions across data analytics division, achieving 18-20% productivity improvement.",
    image: "/stocks.png?height=400&width=600&text=LSEG",
    metrics: [
      { label: "Programme Value", value: "£5M" },
      { label: "Productivity Gain", value: "18-20%" },
      { label: "Team Size", value: "25 members" },
    ],
    technologies: ["OpenAI", "LLaMa", "RAG", "AI Agents", "Python"],
    featured: true,
  },
  {
    id: 2,
    title: "Transport for London: Large-Scale Digital Transformation",
    client: "Transport for London",
    industry: "Transportation",
    excerpt:
      "Managing delivery and governance of multiple large-scale projects with end-to-end technology capability enhancements.",
    image: "/underground.png?height=400&width=600&text=TfL",
    metrics: [
      { label: "Project Scope", value: "Multi-programme" },
      { label: "Status", value: "Ongoing" },
      { label: "Team", value: "Cross-functional" },
    ],
    technologies: ["Agile", "DevOps", "Cloud", "Microservices"],
    featured: true,
  },
  {
    id: 3,
    title: "Schroders: Serverless Architecture Migration",
    client: "Schroders Personal Wealth",
    industry: "Wealth Management",
    excerpt:
      "Delivered end-to-end serverless solution for Fraud and Financial Crime, reducing cloud expenditure by 20%.",
    image: "/asset-management.png?height=400&width=600&text=Schroders",
    metrics: [
      { label: "Cost Reduction", value: "20%" },
      { label: "Programme Value", value: "£2M" },
      { label: "Migration", value: "Complete" },
    ],
    technologies: ["AWS Lambda", "Serverless", "Event-Driven Architecture", "Docker"],
    featured: true,
  },
  {
    id: 4,
    title: "RBS/NatWest: Next-Generation Mortgage Platform",
    client: "RBS/NatWest",
    industry: "Banking",
    excerpt:
      "Developed next-generation mortgage application with fully responsive React interface and third-party API integrations.",
    image: "/mortgage-loan.png?height=400&width=600&text=RBS",
    metrics: [
      { label: "Technology", value: "React/Redux" },
      { label: "Integrations", value: "Multiple APIs" },
      { label: "UX", value: "Responsive" },
    ],
    technologies: ["React", "Redux", "Bootstrap", "REST APIs"],
    featured: false,
  },
  {
    id: 5,
    title: "HSBC: Risk Management System Optimization",
    client: "HSBC Global Banking",
    industry: "Banking",
    excerpt:
      "Enhanced portfolio management and client optimization systems with performance improvements and feature prioritization.",
    image: "/bank.png?height=400&width=600&text=HSBC",
    metrics: [
      { label: "Division", value: "Global Banking" },
      { label: "Focus", value: "Risk Management" },
      { label: "Delivery", value: "On-time" },
    ],
    technologies: ["Java", "Spring", "Oracle", "Microservices"],
    featured: false,
  },
  {
    id: 6,
    title: "JP Morgan: Operations Task Manager Enhancement",
    client: "JP Morgan CIB",
    industry: "Investment Banking",
    excerpt:
      "Frontend performance optimization and UX redesign of OTM project with OpenFin containerization implementation.",
    image: "/bank.png?height=400&width=600&text=JPMorgan",
    metrics: [
      { label: "Performance", value: "Improved" },
      { label: "UX", value: "Redesigned" },
      { label: "Technology", value: "OpenFin" },
    ],
    technologies: ["JavaScript", "OpenFin", "React", "Performance Optimization"],
    featured: false,
  },
]

export function CaseStudiesList() {
  const featuredCaseStudies = caseStudies.filter((cs) => cs.featured)
  const regularCaseStudies = caseStudies.filter((cs) => !cs.featured)

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured Case Studies */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Case Studies</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {featuredCaseStudies.map((caseStudy) => (
              <Card key={caseStudy.id} className="overflow-hidden border-purple-100 hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={caseStudy.image || "/placeholder.svg"}
                    alt={caseStudy.title}
                    fill
                    className="object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-purple-600 hover:bg-purple-700">
                    {caseStudy.industry}
                  </Badge>
                </div>
                <CardContent className="pt-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Building2 className="h-4 w-4 mr-2" />
                    <span className="font-medium">{caseStudy.client}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-purple-600 transition-colors">
                    <Link href={`/case-studies/${caseStudy.id}`}>{caseStudy.title}</Link>
                  </h3>
                  <p className="text-gray-600 mb-4">{caseStudy.excerpt}</p>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg">
                    {caseStudy.metrics.map((metric, index) => (
                      <div key={index} className="text-center">
                        <div className="text-sm font-bold text-purple-600">{metric.value}</div>
                        <div className="text-xs text-gray-600">{metric.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {caseStudy.technologies.slice(0, 3).map((tech, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-purple-200 text-purple-700">
                        {tech}
                      </Badge>
                    ))}
                    {caseStudy.technologies.length > 3 && (
                      <Badge variant="outline" className="text-xs border-purple-200 text-purple-700">
                        +{caseStudy.technologies.length - 3}
                      </Badge>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  {/* <Link href={`/case-studies/${caseStudy.id}`} className="w-full">
                    <Button variant="ghost" className="w-full text-purple-600 hover:text-purple-700 hover:bg-purple-50">
                      Read Full Case Study <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link> */}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* All Case Studies */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">All Case Studies</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularCaseStudies.map((caseStudy) => (
              <Card key={caseStudy.id} className="overflow-hidden border-purple-100 hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={caseStudy.image || "/placeholder.svg"}
                    alt={caseStudy.title}
                    fill
                    className="object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-purple-600 hover:bg-purple-700">
                    {caseStudy.industry}
                  </Badge>
                </div>
                <CardContent className="pt-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Building2 className="h-4 w-4 mr-2" />
                    <span className="font-medium">{caseStudy.client}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-purple-600 transition-colors line-clamp-2">
                    <Link href={`/case-studies/${caseStudy.id}`}>{caseStudy.title}</Link>
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{caseStudy.excerpt}</p>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg">
                    {caseStudy.metrics.map((metric, index) => (
                      <div key={index} className="text-center">
                        <div className="text-xs font-bold text-purple-600">{metric.value}</div>
                        <div className="text-xs text-gray-600">{metric.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {caseStudy.technologies.slice(0, 3).map((tech, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-purple-200 text-purple-700">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  {/* <Link href={`/case-studies/${caseStudy.id}`} className="w-full">
                    <Button variant="ghost" className="w-full text-purple-600 hover:text-purple-700 hover:bg-purple-50">
                      View Details <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link> */}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
