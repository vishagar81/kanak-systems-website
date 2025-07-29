"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, Award, Briefcase, GraduationCap } from "lucide-react"

export function ResumeSection() {
  const handleDownload = () => {
    // Create a more comprehensive resume content
    const resumeContent = `
VISHAL AGARWAL
Technical Project Manager & CEO, Kanak Systems Ltd

CONTACT INFORMATION
Email: kanaksystemsltd@gmail.com
Phone: +44 7955877527
Address: Aylesbury, HP22 7FS, UK
LinkedIn: https://www.linkedin.com/in/vishalagarwallondon
GitHub: https://github.com/vishagar81

CAREER SUMMARY
• 21+ years in developing, architecting and managing enterprise level cloud solutions
• Expertise in Serverless Architecture, SOA, Microservices, Applications Integration, Cloud Computing, EDA
• Proven experience of handling AI/LLM/Copilot projects in geographically distributed teams
• Tactical and Strategic Decisioning during project management and delivery
• A proven track record of success in leading software development teams with strong technical mentorship
• Experience building large scale, high throughput distributed systems and scaling web services
• Build high-performing cross-functional and collaborative teams
• Expertise in application modernisation, SaaS platform transformation (PaaS) to cloud

CERTIFICATIONS
• AWS Certified Solution Architect - Professional
• AWS Certified Solution Architect - Associate

EDUCATION
• B.E. Electronics and Telecommunication, University of Pune, India (1999-2003)
• Intensive Certificate Course in German from Goethe Institute, India (2008)

CORE SKILLS
Technologies: Salesforce, API, AWS, Azure, C#.NET, .NET Core, NodeJS, React, Angular, TypeScript, Docker, Kubernetes, TDD, BDD, Circle CI, Jenkins, Terraform
Architecture: Design patterns, Well Architected Framework, System Integration, Microservices, DDD, Event Driven Architecture
Cloud: AWS, Azure, Serverless architecture
AI/LLM/ML: Generative AI using different LLMs (OpenAI, deepseek, Gemma 2, LLaMa), RAG, Ollama, Crew AI Agents, Python, Conda, hugging face, copilot, ChatGPT

PROFESSIONAL EXPERIENCE

Technical Project Manager, Transport for London, London, UK (May 2024 - current)
• Manage Delivery and governance of multiple large-scale project and programmes
• End-to-end management and delivery of new Technology capability or enhancements
• Prepare and own Project Plan, bringing together multiple plans and dependencies
• Regularly managing RAID (risks, assumptions, issues, and dependencies)
• Mentoring junior developers & leads, continuous improvement, driving efficiencies

Program Manager, London Stock Exchange Group, London, UK (May 2023 - February 2024)
• Creating the technical roadmap for the Data Analytics division at LSEG
• Delivered a range of digital products to customers using Lean/Agile methodologies
• Improved productivity by 18-20% in the development lifecycle by leveraging automation and Gen AI tools
• £5mn change programme
• Managed geographically distributed team of 25 across US, UK, India, France, Romania and Thailand

Technical Program Manager, Schroders Personal Wealth, London, UK (April 2021 - December 2022)
• Delivered end-to-end solution for Fraud and Financial Crime project based on AWS Serverless
• Reduced the cloud expenditure by 20% by migrating the legacy solution to serverless architecture
• £2mn change programme
• Application modernization and transformation based on serverless and containerization

Lead Developer, RBS/Natwest, London, UK (September 2018 - May 2019)
• Developing the next generation Mortgage Application product for RBS/Natwest
• Interfacing with RBS internal APIs and third party APIs from Sopra
• Fully responsive React application using Bootstrap 3, redux-form and react-bootstrap-table libs

Lead Developer, HSBC, London, UK (May 2020 - October 2020)
• Worked in the Global Banking Division of HSBC focussing on Risk Management
• Client Optimisation and Portfolio Management Applications
• Navigated the teams prioritising key feature implementation within tight deadlines

Applications Developer Advanced, JP Morgan, London, UK (May 2017 - November 2017)
• Frontend lead working on performance improvement of Operations and Task Manager (OTM) project
• Redesigned the user journeys to minimise the number of clicks and improved the user interface
• OpenFin containerization of the OTM App

AWARDS
• Best Project Delivery Award 2009 in BOSCH
• Pat on the Back Award for winning the proposal in Infosys

PUBLICATIONS
• "Remediate Technical Debt with GenAI" - LinkedIn Article
  https://www.linkedin.com/pulse/remediate-technical-debt-genai-vishal-agarwal-jekze/
`

    // Create and download the resume as a text file
    const blob = new Blob([resumeContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "Vishal-Agarwal-Resume.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Professional Resume</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Download the complete professional resume showcasing 21+ years of enterprise experience
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Resume Preview */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 text-purple-600 mr-2" />
                  Resume Highlights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Experience Summary */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Briefcase className="h-4 w-4 text-purple-600 mr-2" />
                    Key Experience
                  </h4>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div className="space-y-2">
                      <p>• Transport for London (2024-current)</p>
                      <p>• London Stock Exchange Group (2023-2024)</p>
                      <p>• Schroders Personal Wealth (2021-2022)</p>
                    </div>
                    <div className="space-y-2">
                      <p>• RBS/Natwest (2018-2021)</p>
                      <p>• HSBC Global Banking (2020)</p>
                      <p>• JP Morgan CIB (2017)</p>
                    </div>
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Award className="h-4 w-4 text-purple-600 mr-2" />
                    Certifications
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">AWS Solution Architect - Professional</Badge>
                    <Badge variant="secondary">AWS Solution Architect - Associate</Badge>
                  </div>
                </div>

                {/* Education */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <GraduationCap className="h-4 w-4 text-purple-600 mr-2" />
                    Education
                  </h4>
                  <div className="text-sm text-gray-700">
                    <p>B.E. Electronics and Telecommunication</p>
                    <p className="text-gray-500">University of Pune, India (1999-2003)</p>
                  </div>
                </div>

                {/* Core Technologies */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Core Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "AWS",
                      "Azure",
                      "Serverless",
                      "Microservices",
                      "AI/LLM",
                      "C#.NET",
                      "React",
                      "Node.js",
                      "Docker",
                      "Kubernetes",
                    ].map((tech, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Download Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Download Resume</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  Get the complete professional resume with detailed experience, projects, and achievements.
                </p>

                <div className="space-y-3">
                  <Button onClick={handleDownload} className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white">
                    <Download className="h-4 w-4 mr-2" />
                    Download Resume (TXT)
                  </Button>

                  <Button variant="outline" className="w-full" asChild>
                    <a href="https://www.linkedin.com/in/vishalagarwallondon" target="_blank" rel="noopener noreferrer">
                      <FileText className="h-4 w-4 mr-2" />
                      View LinkedIn Profile
                    </a>
                  </Button>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h5 className="font-semibold text-sm text-gray-900 mb-2">Resume Includes:</h5>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Complete work history (21+ years)</li>
                    <li>• Technical skills & certifications</li>
                    <li>• Major project achievements</li>
                    <li>• Education & publications</li>
                    <li>• Awards & recognitions</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardContent className="p-6">
                <h5 className="font-semibold text-gray-900 mb-4">Career Statistics</h5>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Experience</span>
                    <span className="font-semibold">21+ Years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Programs Delivered</span>
                    <span className="font-semibold">£7M+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Team Size Managed</span>
                    <span className="font-semibold">25+ Members</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Countries Worked</span>
                    <span className="font-semibold">6 Countries</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
