import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import {ReactNode} from "react";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Profile',
  description: 'About myself and my experiences',
  applicationName: 'My Profile',
  keywords: ['celio', 'vieira', 'profile', 'about', 'me'],
  category: 'blog',
  classification: 'free',
  creator: 'Celio Vieira',
  authors: [{ name: 'Celio Vieira', url: 'celio-vieira.com' }],
  publisher: "Vercel",
  generator: "Next.js",
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
