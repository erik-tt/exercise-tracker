'use client'
import './globals.css'
import { AuthContextProvider } from '@/context/AuthContext'
import Header from '@/components/header'
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/sidebar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showSidebar = !['/signin', '/signup'].includes(pathname);

  return (
    <html lang="en">
      <head />
      <body className="flex flex-col min-h-screen">
        <AuthContextProvider>
        <Header />
          <div className="flex flex-1">
            {showSidebar && 
              <Sidebar />
            }
            <main className={`${showSidebar ? 'flex-1' : 'w-full'} overflow-y-auto`}>
              {children}
            </main>
          </div>
        </AuthContextProvider>
      </body>
    </html>
  )
}
