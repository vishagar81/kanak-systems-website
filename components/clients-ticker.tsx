"use client"

import Image from "next/image"
import { majorClients } from "@/lib/data/clients"

export function ClientsTicker() {
  // Triple the clients array for seamless loop
  const tripleClients = [...majorClients, ...majorClients, ...majorClients]

  return (
    <div className="py-12 bg-white overflow-hidden">
      <div className="mb-8 text-center">
        <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold">Trusted by Industry Leaders</p>
      </div>

      <div className="relative">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        {/* Ticker */}
        <div className="overflow-hidden">
          <div className="flex animate-ticker-scroll">
            {tripleClients.map((client, index) => (
              <div key={index} className="flex-shrink-0 mx-8 flex items-center justify-center">
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

      <style jsx>{`
        @keyframes ticker-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        
        .animate-ticker-scroll {
          animation: ticker-scroll 45s linear infinite;
        }
        
        .animate-ticker-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
