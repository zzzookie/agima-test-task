import React from 'react'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.scss'

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['cyrillic', 'latin']
})

export const metadata: Metadata = {
  title: 'Agima Test Task',
  description: ''
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang="ru">
      <body className={roboto.className}>
        <div className="page-wrapper">
          {children}
        </div>
      </body>
    </html>
  )
}
