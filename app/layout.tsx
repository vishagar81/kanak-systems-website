import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined,
  title: 'Kanak Systems | Complex ideas, measurable outcomes',
  description:
    'A specialist services company helping organisations move complex ideas from ideation to production with measurable outcomes.',
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
