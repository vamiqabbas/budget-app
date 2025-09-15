import type { Metadata } from 'next'
import './globals.css'
import AppNavbar from '@/components/mui/AppNavbar'

export const metadata: Metadata = {
  title: 'BuildStock - Building Materials Management',
  description: 'Monitor your building materials inventory and project progress',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-indigo-200 via-sky-100 to-emerald-100 bg-fixed">
        <AppNavbar />
        <main className="px-4 max-w-7xl mx-auto min-h-[calc(100vh-5rem)]">
          {children}
        </main>
      </body>
    </html>
  )
}