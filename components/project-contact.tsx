"use client"

import { useEffect, useState, type FormEvent } from "react"
import Link from "next/link"
import { ArrowUpRight, CheckCircle2, Send } from "lucide-react"
import { initEmailJS, sendEmail } from "@/lib/emailjs"

type FormValues = {
  name: string
  email: string
  company: string
  message: string
}

export function ProjectContact() {
  const [values, setValues] = useState<FormValues>({ name: "", email: "", company: "", message: "" })
  const [error, setError] = useState("")
  const [status, setStatus] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    initEmailJS()
  }, [])

  const update = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }))
    setError("")
    setStatus("")
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())
    if (!values.name.trim() || !emailIsValid || values.message.trim().length < 10) {
      setError("Enter your name, a valid work email and a short project brief of at least 10 characters.")
      return
    }

    setIsSubmitting(true)
    setError("")
    try {
      await sendEmail({ firstName: values.name.trim(), lastName: "", email: values.email.trim(), company: values.company.trim(), message: values.message.trim() })
      setStatus("Thank you. Your enquiry has been sent.")
      setValues({ name: "", email: "", company: "", message: "" })
    } catch {
      setError("Your enquiry could not be sent. Please email kanaksystemsltd@gmail.com instead.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="project-contact">
      <div className="section-wrap project-contact__inner">
        <div className="project-contact__intro">
          <p className="eyebrow">05 / Let&apos;s talk</p>
          <h2 className="editorial-title">What should your next system achieve?</h2>
          <p>Tell us what you are working on and where you need clarity.</p>
          <a className="project-contact__email" href="mailto:kanaksystemsltd@gmail.com">kanaksystemsltd@gmail.com <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
        </div>
        <form className="project-form" onSubmit={submit} noValidate>
          <label htmlFor="project-name">Name <span aria-hidden="true">*</span></label>
          <input id="project-name" name="name" autoComplete="name" value={values.name} onChange={(event) => update("name", event.target.value)} required />
          <label htmlFor="project-email">Work email <span aria-hidden="true">*</span></label>
          <input id="project-email" name="email" type="email" autoComplete="email" value={values.email} onChange={(event) => update("email", event.target.value)} required />
          <label htmlFor="project-company">Company <span className="body-muted">(optional)</span></label>
          <input id="project-company" name="company" autoComplete="organization" value={values.company} onChange={(event) => update("company", event.target.value)} />
          <label htmlFor="project-message">What are you working on? <span aria-hidden="true">*</span></label>
          <textarea id="project-message" name="message" rows={4} value={values.message} onChange={(event) => update("message", event.target.value)} required />
          <p className="project-form__privacy">Your details will be used to respond to your enquiry. See our <Link href="/privacy">privacy information</Link>.</p>
          {(error || status) && <p className={`project-form__status ${error ? "is-error" : "is-success"}`} role="status">{error || <><CheckCircle2 className="h-4 w-4" aria-hidden="true" />{status}</>}</p>}
          <button className="site-button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send enquiry"} <Send className="h-4 w-4" aria-hidden="true" />
          </button>
        </form>
      </div>
    </section>
  )
}