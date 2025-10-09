import { Award, TrendingUp, Users, Zap } from "lucide-react"

export function CaseStudiesHero() {
  const stats = [
    { icon: Award, value: "50+", label: "Projects Completed" },
    { icon: TrendingUp, value: "£7M+", label: "Programs Delivered" },
    { icon: Users, value: "14+", label: "Major Clients" },
    { icon: Zap, value: "20%", label: "Average Cost Reduction" },
  ]

  return (
    <section className="bg-gradient-to-br from-gray-50 to-purple-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Success Stories &{" "}
            <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
              Case Studies
            </span>
          </h1>
          <p className="text-xl text-gray-600">
            Discover how we've helped leading organizations across financial services, transportation, and technology
            sectors achieve digital transformation and operational excellence.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm border border-purple-100">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-100 to-violet-100 rounded-lg mb-3">
                <stat.icon className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Industry Focus */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Industry Expertise</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Financial Services",
              "Banking & Investment",
              "Transportation",
              "Government",
              "Technology",
              "Wealth Management",
            ].map((industry, index) => (
              <div
                key={index}
                className="px-4 py-2 bg-white rounded-full border border-purple-200 text-purple-700 text-sm font-medium"
              >
                {industry}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
