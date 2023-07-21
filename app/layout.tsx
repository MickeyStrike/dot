import './globals.css'
import { Inter } from 'next/font/google'
import React from 'react'
import Context from './context/context'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata() {
  return {
    title: 'DOT',
    description: 'DOT',
    icons: {
      icon: '/icon.png',
      apple: '/apple-icon.png',
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <body className={inter.className}>
          <Context>
            {children}
          </Context>
        </body>
    </html>
  )
}
