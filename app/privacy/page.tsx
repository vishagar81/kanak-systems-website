import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"

export const metadata = {
  title: "Privacy information | Kanak Systems",
  description: "How information submitted through the Kanak Systems project enquiry form is handled.",
}

export default function PrivacyPage() {
  return (
    <div className="page-shell">
      <Header />
      <main className="section-wrap privacy-content">
        <p className="eyebrow">Privacy</p>
        <h1 className="editorial-title">Privacy information</h1>
        <p>This page is a draft notice for the project enquiry form. The company privacy contact, retention period, and full details of the email delivery provider must be confirmed before this notice is treated as final.</p>
        <h2>Enquiry information</h2>
        <p>If you submit the form, the information you provide is used to receive and respond to your project enquiry. The form currently sends submissions using EmailJS to the Kanak Systems contact address. Please do not include sensitive personal or confidential information.</p>
        <h2>Before publication</h2>
        <p>Kanak Systems should confirm its legal identity and contact details, the EmailJS processing and retention terms, how long enquiry messages are kept, and how people can exercise their data rights.</p>
        <p>For a project discussion, return to the <Link href="/#contact">enquiry form</Link> or email <a href="mailto:kanaksystemsltd@gmail.com">kanaksystemsltd@gmail.com</a>.</p>
      </main>
      <Footer />
    </div>
  )
}