"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            {/* <h1 className="text-2xl font-bold text-gray-900">Kanak Systems Ltd</h1> */}
            <Image
              src="/images/logo-small.png"
              alt="Kanak Systems Ltd"
              width={300}
              height={75}
              className="h-16 w-auto"
              priority
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="/" className="text-purple-700 hover:text-purple-900 transition-colors">
              Home
            </a>
            <a href="/#services" className="text-purple-700 hover:text-purple-900 transition-colors">
              Services
            </a>
            <a href="/blogs" className="text-purple-700 hover:text-purple-900 transition-colors">
              Blogs
            </a>
            <a href="/#contact" className="text-purple-700 hover:text-purple-900 transition-colors">
              Contact
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white">Get Consultation</Button>
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
              <a href="/" className="text-purple-700 hover:text-purple-600 transition-colors">
                Home
              </a>
              <a href="/#services" className="text-purple-700 hover:text-purple-600 transition-colors">
                Services
              </a>
              <a href="/blogs" className="text-purple-700 hover:text-purple-600 transition-colors">
                Blogs
              </a>
              <a href="/#contact" className="text-purple-700 hover:text-purple-600 transition-colors">
                Contact
              </a>
              <Button className="bg-purple-600 hover:bg-purple-700 w-full">Get Consultation</Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
