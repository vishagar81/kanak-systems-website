"use client"

import Image from "next/image"

const clients = [  
  {
    name: "London Stock Exchange Group",
    logo: "/lseg_logo_rgb_pos.png?height=80&width=200&text=LSEG",
  },
  {
    name: "Schroders Personal Wealth",
    logo: "/spw.svg?height=80&width=200&text=Schroders",
  },
  {
    name: "RBS/NatWest",
    logo: "/nwg.png?height=80&width=200&text=NatWest",
  },
  {
    name: "HSBC",
    logo: "/hsbc-logo.svg?height=80&width=200&text=HSBC",
  },
  {
    name: "JP Morgan",
    logo: "/jpm-brown-logo.svg?height=80&width=200&text=JPMorgan",
  },
  {
    name: "Nationwide",
    logo: "/nationwide-logo.svg?height=80&width=200&text=Nationwide",
  },  
  {
    name: "BI Worldwide",
    logo: "/placeholder.svg?height=80&width=200&text=BI+Worldwide",
  },  
  {
    name: "Capita",
    logo: "/placeholder.svg?height=80&width=200&text=Capita",
  },
  {
    name: "Infosys",
    logo: "/placeholder.svg?height=80&width=200&text=Infosys",
  },
  {
    name: "Bosch",
    logo: "/placeholder.svg?height=80&width=200&text=BOSCH",
  },
  {
    name: "Tata Consultancy Services",
    logo: "/placeholder.svg?height=80&width=200&text=TCS",
  },
]

export function ClientsSection() {
  // Duplicate the clients array to create seamless loop
  const duplicatedClients = [...clients, ...clients]

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-violet-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
              Industry Leaders
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Over 21+ years of delivering enterprise solutions for major financial institutions, technology companies,
            and government organizations across the UK and globally.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent mb-2">
              14+
            </div>
            <div className="text-sm text-gray-600">Major Clients</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent mb-2">
              £7M+
            </div>
            <div className="text-sm text-gray-600">Programs Delivered</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent mb-2">
              100+
            </div>
            <div className="text-sm text-gray-600">Projects Completed</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent mb-2">
              21+
            </div>
            <div className="text-sm text-gray-600">Years Experience</div>
          </div>
        </div>

       
        {/* Running Ticker */}
        <div className="mb-16">
          <div className="relative">
            {/* Gradient overlays for smooth fade effect */}
            <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-purple-50 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-purple-50 to-transparent z-10 pointer-events-none"></div>

            {/* Ticker container */}
            <div className="overflow-hidden">
              <div className="flex animate-scroll">
                {duplicatedClients.map((client, index) => (
                  <div key={index} className="flex-shrink-0 mx-8 group">
                    <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-purple-100 hover:border-purple-200 w-64">
                      <div className="flex flex-col items-center text-center space-y-3">
                        <div className="relative w-full h-16 flex items-center justify-center">
                          <Image
                            src={client.logo || "/placeholder.svg"}
                            alt={`${client.name} logo`}
                            width={160}
                            height={64}
                            className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                          />
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-semibold text-gray-900 text-sm group-hover:text-purple-600 transition-colors">
                            {client.name}
                          </h3>                          
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Industry Sectors */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Industry Expertise</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Financial Services",
              "Banking & Investment",
              "Transportation",
              "Technology",
              "Government",
              "Professional Services",
              "Wealth Management",
              "Insurance",
            ].map((industry, index) => (
              <div
                key={index}
                className="px-4 py-2 bg-white rounded-full border border-purple-200 text-purple-700 text-sm font-medium hover:bg-purple-50 transition-colors"
              >
                {industry}
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-purple-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Join Our Success Stories?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Let us help you achieve the same level of success that we've delivered for these industry-leading
              organizations. Get in touch to discuss your project requirements.
            </p>
            <button
              onClick={() => {
                const contactSection = document.getElementById("contact")
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: "smooth" })
                }
              }}
              className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Start Your Transformation
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 60s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}