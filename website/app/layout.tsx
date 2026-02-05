import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'rsLSM v1.1 Build Log | Whole-Brain Zebrafish Voltage Imaging',
  description: 'Technical documentation of the complete rebuild of a remote-scanning lightsheet microscope for whole-brain zebrafish voltage imaging.',
  keywords: ['microscopy', 'neuroscience', 'zebrafish', 'lightsheet', 'voltage imaging', 'rsLSM'],
  authors: [{ name: 'Quilee Simeon' }],
  openGraph: {
    title: 'rsLSM v1.1 Build Log',
    description: 'Complete rebuild documentation of a remote-scanning lightsheet microscope',
    type: 'website',
    url: 'https://rslsm-v1-1.vercel.app',
  },
  metadataBase: new URL('https://rslsm-v1-1.vercel.app'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans bg-primary-bg text-text-light antialiased">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
