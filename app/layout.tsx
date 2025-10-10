import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Partner for Your Business | Kanak Systems',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
