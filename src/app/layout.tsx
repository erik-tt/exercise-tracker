"use client";
import "./globals.css";
import { AuthContextProvider } from "@/context/AuthContext";
import Header from "@/components/header";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showSidebar = !["/signin", "/signup"].includes(pathname);

  return (
    <html lang="en">
      <body className="flex flex-col h-screen">
        <AuthContextProvider>
          <Header />
          <div className="flex flex-1 overflow-hidden">
            {showSidebar && (
              <aside>
                <Sidebar />
              </aside>
            )}
            <main
              className={`${
                showSidebar ? "flex-1" : "w-full"
              } text-gray-600  bg-gray-100 overflow-y-auto`}
            >
              {children}
            </main>
          </div>
        </AuthContextProvider>
      </body>
    </html>
  );
}
