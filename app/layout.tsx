import './globals.css'
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Pankh Technology - Wings to Financial Freedom',
  description: 'Democratizing wealth creation across India. Simple, safe, and meaningful investing for Tier 2/3 India.',
  keywords: 'mutual funds, SIP, retirement awareness, financial literacy, financial education India, Tier 2 cities',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">{children}</body>
    </html>
  )
}
