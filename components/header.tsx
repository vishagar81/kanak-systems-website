"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href='/'>
              <Image
                src="/logo-small.png"
                alt="Kanak Systems Ltd"
                width={300}
                height={75}
                className="h-16 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="/" className="text-purple-700 hover:rounded-sm hover:bg-purple-700 hover:text-white transition-colors">
              Home
            </a>
            <a href="/#services" className="text-purple-700 hover:rounded-sm hover:bg-purple-700 hover:text-white transition-colors">
              Services
            </a>
            <a href="/blogs" className="text-purple-700 hover:rounded-sm hover:bg-purple-700 hover:text-white transition-colors">
              Blogs
            </a>
            <a href="/#contact" className="text-purple-700 hover:rounded-sm hover:bg-purple-700 hover:text-white transition-colors">
              Contact
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white">
              <Link href='/#contact'>Get Consultation</Link>
            </Button>
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
              <Button className="bg-purple-600 hover:bg-purple-700 w-full">
                <Link href='/#contact'>Get Consultation</Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
