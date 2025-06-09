import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Users, Award, Clock } from "lucide-react"

const benefits = [
  {
    icon: Users,
    title: "Expert Team",
    description: "Certified professionals with deep industry expertise and proven track record",
  },
  {
    icon: Award,
    title: "Quality Assurance",
    description: "Rigorous testing and quality control processes ensure exceptional results",
  },
  {
    icon: Clock,
    title: "Timely Delivery",
    description: "Agile methodologies and efficient project management for on-time delivery",
  },
  {
    icon: CheckCircle,
    title: "Proven Success",
    description: "Successful track record of transforming businesses across various industries",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Why Choose Kanak Systems Ltd?</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Led by Hands-on Certified Solution Architect with 21+ years of enterprise experience,
                Kanak Systems Ltd has successfully delivered complex digital transformation projects for major
                organizations including Transport for London, London Stock Exchange Group, RBS, HSBC, and Schroders
                Personal Wealth.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our proven track record includes managing £7M+ in change programmes, achieving 20% cost reductions
                through serverless architecture, and improving development productivity by 18-20% through AI automation.
                We specialize in large-scale, high-throughput distributed systems and have extensive experience with
                geographically distributed teams across US, UK, India, France, Romania, and Thailand.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Our Approach:</h3>
              <ul className="space-y-3">
                {[
                  "Comprehensive enterprise architecture assessment and roadmap development",
                  "Proven methodologies from major financial services and transport sectors",
                  "Scaled Agile (SAFe) implementation with cross-functional teams",
                  "Continuous delivery with modern DevOps practices and automation",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center p-6">
                <CardContent className="space-y-4">
                  <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <benefit.icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
