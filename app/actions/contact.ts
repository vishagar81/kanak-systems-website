"use server"

import { z } from "zod"
import { Resend } from "resend"

// Define the schema for form validation
const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(1, "Company name is required"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
})

export type ContactFormState = {
  success?: boolean
  message?: string
  errors?: {
    firstName?: string[]
    lastName?: string[]
    email?: string[]
    company?: string[]
    message?: string[]
  }
}

export async function submitContactForm(prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
  // Extract form data
  const rawFormData = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    company: formData.get("company") as string,
    message: formData.get("message") as string,
  }

  // Validate the form data
  const validatedFields = contactSchema.safeParse(rawFormData)

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { firstName, lastName, email, company, message } = validatedFields.data

  try {
    // Simulate email sending (in a real app, you'd use a service like Resend, SendGrid, etc.)
    // For now, we'll just simulate a delay and return success
    // await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real implementation, you would send an email here
    // Example with a hypothetical email service:
    
    const resend = new Resend(process.env.RESEND_API_KEY || "");

    await resend.emails.send({
      to: 'tiruvishal@gmail.com',
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
      from: email
    })
    

    // console.log("Contact form submission:", {
    //   to: "tiruvishal@gmail.com",
    //   from: email,
    //   name: `${firstName} ${lastName}`,
    //   company,
    //   message,
    //   timestamp: new Date().toISOString(),
    // })

    return {
      success: true,
      message: "Thank you for your message! We will get back to you within 24 hours.",
    }
  } catch (error) {
    console.error("Error sending contact form:", error)
    return {
      success: false,
      message: "Sorry, there was an error sending your message. Please try again or contact us directly.",
    }
  }
}
