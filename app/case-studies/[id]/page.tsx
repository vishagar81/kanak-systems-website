import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Building2, Calendar, TrendingUp, Users, CheckCircle, Target, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ClientsTicker } from "@/components/clients-ticker"
import { CaseStudyContent } from "@/components/case-study-content"

// This would typically come from a CMS or database
const getCaseStudy = async (id: string) => {
  const caseStudiesData: Record<string, any> = {
    "1": {
      id: "1",
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

  return caseStudiesData[id] || null
}

export default async function CaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const caseStudy = await getCaseStudy(id)

  if (!caseStudy) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Page under construction</h1>
            <p className="text-gray-600 mb-8">The requested page is under construction.</p>
            <Link href="/case-studies">
              <Button className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700">
                View All Case Studies
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-50 to-purple-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <Link href="/case-studies">
                <Button variant="ghost" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 mb-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Case Studies
                </Button>
              </Link>

              <div className="flex items-center space-x-3 mb-4">
                <Badge className="bg-purple-600 hover:bg-purple-700">{caseStudy.industry}</Badge>
                <span className="text-gray-500">•</span>
                <div className="flex items-center text-gray-600">
                  <Building2 className="h-4 w-4 mr-2" />
                  <span className="font-medium">{caseStudy.client}</span>
                </div>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">{caseStudy.title}</h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">{caseStudy.excerpt}</p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg p-4 border border-purple-100">
                  <div className="flex items-center text-purple-600 mb-2">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span className="text-sm font-semibold">Duration</span>
                  </div>
                  <p className="text-sm text-gray-900">{caseStudy.duration}</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-purple-100">
                  <div className="flex items-center text-purple-600 mb-2">
                    <Users className="h-5 w-5 mr-2" />
                    <span className="text-sm font-semibold">Team Size</span>
                  </div>
                  <p className="text-sm text-gray-900">{caseStudy.teamSize}</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-purple-100">
                  <div className="flex items-center text-purple-600 mb-2">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    <span className="text-sm font-semibold">Programme Value</span>
                  </div>
                  <p className="text-sm text-gray-900">{caseStudy.programmeValue}</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-purple-100">
                  <div className="flex items-center text-purple-600 mb-2">
                    <Target className="h-5 w-5 mr-2" />
                    <span className="text-sm font-semibold">Status</span>
                  </div>
                  <p className="text-sm text-gray-900">Completed</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="py-8 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
              <Image src={caseStudy.image || "/placeholder.svg"} alt={caseStudy.title} fill className="object-cover" />
            </div>
          </div>
        </section>

        {/* Challenge Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-violet-100 rounded-lg flex items-center justify-center mr-4">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">The Challenge</h2>
            </div>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{caseStudy.challenge}</p>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-16 bg-gradient-to-br from-purple-50 to-violet-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-violet-100 rounded-lg flex items-center justify-center mr-4">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">The Solution</h2>
            </div>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{caseStudy.solution}</p>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center mb-8 justify-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-violet-100 rounded-lg flex items-center justify-center mr-4">
                <CheckCircle className="h-6 w-6 text-purple-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Results & Impact</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {caseStudy.results.map((result: any, index: number) => (
                <Card key={index} className="text-center border-purple-100">
                  <CardContent className="pt-6">
                    <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent mb-3">
                      {result.metric}
                    </div>
                    <p className="text-gray-600">{result.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Technologies Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Technologies & Methodologies</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {caseStudy.technologies.map((tech: string, index: number) => (
                <Badge key={index} variant="outline" className="text-sm border-purple-200 text-purple-700 px-4 py-2">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        {caseStudy.testimonial && (
          <section className="py-16 bg-gradient-to-br from-purple-50 to-violet-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <Card className="border-purple-100">
                <CardContent className="p-8">
                  <div className="text-4xl text-purple-600 mb-4">"</div>
                  <p className="text-xl text-gray-700 italic mb-6 leading-relaxed">{caseStudy.testimonial.quote}</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-violet-200 rounded-full flex items-center justify-center mr-4">
                      <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                        {caseStudy.testimonial.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{caseStudy.testimonial.author}</div>
                      <div className="text-gray-600 text-sm">{caseStudy.testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <CaseStudyContent />

        {/* Social Proof */}
        <section className="border-t border-gray-200 pt-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Trusted by Industry Leaders</h3>
            <p className="text-gray-600">Join the organizations that have transformed with our expertise</p>
          </div>
          <ClientsTicker />
        </section>
      </main>

      <Footer />
    </div>
  )
}
