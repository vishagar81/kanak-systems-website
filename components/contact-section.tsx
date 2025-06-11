"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react"
import { useActionState } from "react"
import { submitContactForm, type ContactFormState } from "@/app/actions/contact"

const initialState: ContactFormState = {}

export function ContactSection() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState)

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Ready to Transform Your Business?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with our experts to discuss your project requirements and discover how we can help you achieve
            your goals.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="border-purple-100">
            <CardHeader>
              <CardTitle className="text-2xl">Get Free Consultation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Success/Error Messages */}
              {state.message && (
                <div
                  className={`p-4 rounded-lg flex items-center space-x-2 ${
                    state.success
                      ? "bg-green-50 text-green-800 border border-green-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  {state.success ? (
                    <CheckCircle className="h-5 w-5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  )}
                  <span className="text-sm">{state.message}</span>
                </div>
              )}

              <form action={formAction} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="John"
                      className="border-purple-200 focus:border-purple-500"
                      required
                    />
                    {state.errors?.firstName && (
                      <p className="text-red-600 text-xs mt-1">{state.errors.firstName[0]}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Doe"
                      className="border-purple-200 focus:border-purple-500"
                      required
                    />
                    {state.errors?.lastName && <p className="text-red-600 text-xs mt-1">{state.errors.lastName[0]}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@company.com"
                    className="border-purple-200 focus:border-purple-500"
                    required
                  />
                  {state.errors?.email && <p className="text-red-600 text-xs mt-1">{state.errors.email[0]}</p>}
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="Your Company"
                    className="border-purple-200 focus:border-purple-500"
                    required
                  />
                  {state.errors?.company && <p className="text-red-600 text-xs mt-1">{state.errors.company[0]}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Project Details *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your project requirements, timeline, and how we can help you..."
                    rows={4}
                    className="border-purple-200 focus:border-purple-500"
                    required
                  />
                  {state.errors?.message && <p className="text-red-600 text-xs mt-1">{state.errors.message[0]}</p>}
                </div>

                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white disabled:opacity-50"
                >
                  {isPending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
              <p className="text-gray-600 mb-8">
                Reach out to us through any of the following channels. Our team is ready to assist you with your IT
                transformation journey.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gradient-to-br from-purple-100 to-violet-100 rounded-lg">
                  <Mail className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Email Us</h4>
                  <p className="text-gray-600">tiruvishal@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gradient-to-br from-purple-100 to-violet-100 rounded-lg">
                  <Phone className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Call Us</h4>
                  <p className="text-gray-600">+44 7955877527</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gradient-to-br from-purple-100 to-violet-100 rounded-lg">
                  <MapPin className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Visit Us</h4>
                  <p className="text-gray-600">Aylesbury, HP22 7FS, UK</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-lg border border-purple-100">
              <h4 className="font-semibold text-gray-900 mb-2">Business Hours</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-lg border border-purple-100">
              <h4 className="font-semibold text-gray-900 mb-2">Response Time</h4>
              <p className="text-sm text-gray-600">
                We typically respond to all inquiries within 24 hours during business days. For urgent matters, please
                call us directly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
