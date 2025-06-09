"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-900">Kanak Systems Ltd</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Home
            </a>
            <a href="#services" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Services
            </a>
            <a href="#about" className="text-gray-700 hover:text-emerald-600 transition-colors">
              About
            </a>
            <a href="#contact" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Contact
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="bg-emerald-600 hover:bg-emerald-700">Get Consultation</Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <a href="#home" className="text-gray-700 hover:text-emerald-600 transition-colors">
                Home
              </a>
              <a href="#services" className="text-gray-700 hover:text-emerald-600 transition-colors">
                Services
              </a>
              <a href="#about" className="text-gray-700 hover:text-emerald-600 transition-colors">
                About
              </a>
              <a href="#contact" className="text-gray-700 hover:text-emerald-600 transition-colors">
                Contact
              </a>
              <Button className="bg-emerald-600 hover:bg-emerald-700 w-full">Get Consultation</Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
