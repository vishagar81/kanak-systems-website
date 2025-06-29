import Image from "next/image"

const majorClients = [
  {
    name: "Transport for London",
    logo: "/placeholder.svg?height=60&width=150&text=TfL",
  },
  {
    name: "London Stock Exchange Group",
    logo: "/placeholder.svg?height=60&width=150&text=LSEG",
  },
  {
    name: "Schroders",
    logo: "/placeholder.svg?height=60&width=150&text=Schroders",
  },
  {
    name: "RBS/NatWest",
    logo: "/placeholder.svg?height=60&width=150&text=NatWest",
  },
  {
    name: "HSBC",
    logo: "/placeholder.svg?height=60&width=150&text=HSBC",
  },
  {
    name: "JP Morgan",
    logo: "/placeholder.svg?height=60&width=150&text=JPMorgan",
  },
]

export function ClientsLogos() {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold">Trusted by Industry Leaders</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {majorClients.map((client, index) => (
            <div key={index} className="flex justify-center">
              <Image
                src={client.logo || "/placeholder.svg"}
                alt={`${client.name} logo`}
                width={120}
                height={48}
                className="max-w-full max-h-12 object-contain filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
