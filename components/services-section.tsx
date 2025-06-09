import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, RefreshCw, Zap, TestTube, ClipboardList, ArrowRight } from "lucide-react"

const services = [
  {
    icon: Cloud,
    title: "Cloud Migration",
    description:
      "Enterprise-grade cloud migration with proven track record at major financial institutions including RBS, HSBC, and Schroders.",
    features: [
      "AWS & Azure certified expertise",
      "Serverless architecture design",
      "20% cost reduction achieved",
      "Zero-downtime migration strategies",
    ],
  },
  {
    icon: RefreshCw,
    title: "Application Modernization",
    description:
      "Transform legacy systems to modern microservices architecture with experience from Transport for London and London Stock Exchange.",
    features: [
      "Microservices & containerization",
      "Event-driven architecture",
      "Performance optimization",
      "Scalable distributed systems",
    ],
  },
  {
    icon: Zap,
    title: "Generative AI Solutions",
    description:
      "Cutting-edge AI implementation with hands-on experience in LLMs, RAG, and AI agents from LSEG's £5M AI programme.",
    features: [
      "OpenAI, Claude, LLaMa integration",
      "RAG & AI agents development",
      "VS Code extensions & Excel add-ins",
      "18-20% productivity improvement",
    ],
  },
  {
    icon: TestTube,
    title: "Automated Testing",
    description: "Implement comprehensive testing solutions to ensure quality and reliability.",
    features: ["Test automation frameworks", "CI/CD integration", "Performance testing", "Quality assurance"],
  },
  {
    icon: ClipboardList,
    title: "Project Management",
    description: "Expert consultancy to streamline your project delivery and optimize team performance.",
    features: ["Agile methodologies", "Resource optimization", "Risk management", "Delivery acceleration"],
  },
  {
    icon: Cloud,
    title: "Cloud Adoption",
    description: "Strategic guidance for successful cloud adoption and digital transformation.",
    features: ["Cloud strategy", "Architecture design", "Best practices", "Training & support"],
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Expertise & Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide comprehensive IT consulting services to help your business thrive in the digital age
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors">
                    <service.icon className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </div>
                </div>
                <CardDescription className="text-gray-600">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <ArrowRight className="h-4 w-4 text-emerald-600 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
