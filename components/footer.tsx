import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Kanak Systems Ltd</h3>
            <p className="text-gray-400 text-sm">
              Led by AWS Certified professionals with 21+ years of enterprise experience. Transforming businesses
              through innovative cloud solutions, AI implementation, and digital modernization.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/in/vishalagarwallondon"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/vishagar81"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold">Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Cloud Migration
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  App Modernization
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  AI Solutions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Automated Testing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Project Management
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-semibold">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Our Team
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold">Contact</h4>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>tiruvishal@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+44 7955877527</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Aylesbury, HP22 7FS, UK</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
          <p>&copy;  {new Date().getFullYear()} Kanak Systems Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
