import { Button } from "@/components/ui/button"
import { ArrowRight, Cloud, Cpu, Zap } from "lucide-react"

export function HeroSection() {
  return (
    <section id="home" className="bg-gradient-to-br from-gray-50 to-gray-100 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Transform Your Business with <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">21+ Years of Enterprise Expertise</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Led by AWS Certified Solution Architect with proven track record at major financial institutions. We specialize in Cloud Migration, Application
                Modernization, Generative AI solutions, and enterprise-scale digital transformation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                Learn More
              </Button>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">100+</div>
                <div className="text-sm text-gray-600">Enterprise Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">£7M+</div>
                <div className="text-sm text-gray-600">Programs Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">21+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
            </div>
          </div>

          {/* Visual Elements */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <Cloud className="h-12 w-12 text-purple-600 mb-4" />
                  <h3 className="font-semibold text-gray-900">Cloud Migration</h3>
                  <p className="text-sm text-gray-600">Seamless transition to cloud infrastructure</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <Zap className="h-12 w-12 text-orange-500 mb-4" />
                  <h3 className="font-semibold text-gray-900">AI Solutions</h3>
                  <p className="text-sm text-gray-600">Generative AI for business automation</p>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <Cpu className="h-12 w-12 text-purple-600 mb-4" />
                  <h3 className="font-semibold text-gray-900">Modernization</h3>
                  <p className="text-sm text-gray-600">Transform legacy applications</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
