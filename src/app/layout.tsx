'use client'
import './globals.css'
import { AuthContextProvider } from '@/context/AuthContext'
import Header from '@/components/header'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <AuthContextProvider>
          <Header/>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  )
}
