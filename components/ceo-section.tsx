import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Building2, GraduationCap, Mail, Phone, MapPin, Linkedin, Github, ExternalLink, Download } from "lucide-react"
import { Button } from "./ui/button"

export function CeoSection() {
  const certifications = [
    "AWS Certified Solution Architect - Professional",
    "AWS Certified Solution Architect - Associate",
  ]

  const keyExperience = [
    "Transport for London - Technical Project Manager",
    "London Stock Exchange Group - Program Manager",
    "Schroders Personal Wealth - Technical Program Manager",
    "RBS/Natwest - Lead Developer",
    "HSBC Global Banking - Lead Developer",
    "JP Morgan CIB - Applications Developer Advanced",
  ]

  const technologies = [
    "AWS",
    "Azure",
    "Serverless Architecture",
    "Microservices",
    "AI/LLM",
    "Generative AI",
    "C#.NET",
    "React",
    "Node.js",
    "Docker",
    "Kubernetes",
    "Snowflake",
    "Terraform",
    "CI/CD",
    "Agile/Scrum",
    "DevOps",
    "Event-Driven Architecture",
    "Distributed Systems",
    "Data Engineering",
    "Data Pipelines",  
    "Application Modernization",
    "Cloud Migration",
    "Agentic AI Workflows",
    "RAG (Retrieval Augmented Generation)",
    "AI Copilot Solutions",
    "AI Automation",
    "AI Chatbots",
    "AI Integration",
    "AI Solutions",
    "AI Development",
    "AI Strategy",
    "AI Consulting",
    "AI Implementation",
    "AI Architecture",
    "AI Project Management",
    "AI Product Development",
    "AI Research",
    "AI Innovation",
    "AI Deployment",
    "AI Performance Optimization",  
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Meet Our CEO & Founder</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Leading digital transformation with 21+ years of enterprise experience
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Profile Image and Basic Info */}
          <div className="lg:col-span-1">
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-violet-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                    VA
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Mr. Vishal Agarwal</h3>
                <p className="text-lg text-purple-600 mb-4">CEO & Technical Project Manager</p>

                <div className="space-y-3 text-sm text-gray-600 mb-6">
                  <div className="flex items-center justify-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>tiruvishal@gmail.com</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>+44 7955877527</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>Aylesbury, UK</span>
                  </div>
                </div>

                <div className="flex justify-center space-x-4">
                  <a
                    href="https://www.linkedin.com/in/vishalagarwallondon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-purple-600 transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href="https://github.com/vishagar81"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-purple-600 transition-colors"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white"
                    asChild
                  >
                    <a href="/resume/vishal-agarwal-resume.pdf" download="Vishal-Agarwal-Resume.pdf">
                      <Download className="h-4 w-4 mr-2" />
                      Download Resume
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Information */}
          <div className="lg:col-span-2 space-y-8">
            {/* Career Summary */}
            <Card>
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Building2 className="h-5 w-5 text-purple-600 mr-2" />
                  Career Summary
                </h4>
                <div className="space-y-3 text-gray-700">
                  <p>• 2 decades of experience in developing, architecting and managing enterprise level cloud solutions</p>
                  <p>
                    • Expertise in Serverless Architecture, SOA, Microservices, Applications Integration, Cloud
                    Computing
                  </p>
                  <p>• Proven experience of handling AI/LLM/Copilot projects in geographically distributed teams</p>
                  <p>• Experience building large scale, high throughput distributed systems and scaling web services</p>
                  <p>• Expertise in application modernisation, SaaS platform transformation (PaaS) to cloud</p>
                  <p>• Successfully delivered £7M+ in change programmes across major financial institutions</p>
                </div>
              </CardContent>
            </Card>

            {/* Key Experience */}
            <Card>
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Key Enterprise Experience</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {keyExperience.map((exp, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-700">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3 flex-shrink-0"></div>
                      {exp}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Certifications & Education */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Award className="h-5 w-5 text-purple-600 mr-2" />
                    Certifications
                  </h4>
                  <div className="space-y-2">
                    {certifications.map((cert, index) => (
                      <Badge key={index} variant="secondary" className="block text-xs p-2">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <GraduationCap className="h-5 w-5 text-purple-600 mr-2" />
                    Education
                  </h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>B.E. Electronics and Telecommunication</p>
                    <p className="text-gray-500">University of Pune, India (1999-2003)</p>
                    <p className="mt-3">German Language Certificate</p>
                    <p className="text-gray-500">Goethe Institute, India (2008)</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Core Technologies */}
            <Card>
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Core Technologies & Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Publication */}
            <Card>
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Recent Publication</h4>
                <a
                  href="https://www.linkedin.com/pulse/remediate-technical-debt-genai-vishal-agarwal-jekze/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-purple-600 hover:text-purple-700 transition-colors"
                >
                  <span className="text-sm">Remediate Technical Debt with GenAI</span>
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
