import emailjs from "@emailjs/browser"

// Initialize EmailJS with your public key
export const initEmailJS = () => {
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

  if (!publicKey) {
    console.error("EmailJS public key is not configured")
    return false
  }

  emailjs.init(publicKey)
  return true
}

// Send email using EmailJS
export const sendEmail = async (templateParams: {
  firstName: string
  lastName: string
  email: string
  company: string
  message: string
}) => {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

  if (!serviceId || !templateId || !publicKey) {
    throw new Error("EmailJS configuration is incomplete")
  }

  try {
    const response = await emailjs.send(
      serviceId,
      templateId,
      {
        name: `${templateParams.firstName} ${templateParams.lastName}`,
        email: templateParams.email,
        company: templateParams.company,
        message: templateParams.message,
        to_email: "tiruvishal@gmail.com",
        reply_to: templateParams.email,
      },
      publicKey,
    )

    return {
      success: true,
      response,
    }
  } catch (error) {
    console.error("EmailJS Error:", error)
    throw error
  }
}
