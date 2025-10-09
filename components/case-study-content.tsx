"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CaseStudyContent() {
  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Transform Your Business?</h2>
        <p className="text-xl text-gray-600 mb-8">
          Let's discuss how we can help you achieve similar results for your organization.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
            onClick={() => {
              const contactSection = document.getElementById("contact")
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" })
              } else {
                window.location.href = "/#contact"
              }
            }}
          >
            Get Free Consultation
          </Button>
          <Link href="/case-studies">
            <Button
              variant="outline"
              className="border-purple-200 text-purple-700 hover:bg-purple-50 bg-transparent"
            >
              View More Case Studies
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}