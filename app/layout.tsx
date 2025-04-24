import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/auth-context"
import { FavoritesProvider } from "@/contexts/favorites-context"
import { NotificationProvider } from "./context/NotificationContext"
import NotificationsContainer from "./components/NotificationsContainer"

// Load local font
const handicrafts = localFont({
  src: "./fonts/TheYearofHandicrafts-Regular.otf",
  variable: "--font-handicrafts",
  display: "swap",
})

export const metadata: Metadata = {
  title: "منصة قنفه - Qanfa Platform",
  description: "منصة قنفه للعقارات السكنية",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${handicrafts.variable}`}>
        <AuthProvider>
          <FavoritesProvider>
            <ThemeProvider attribute="class" defaultTheme="light">
              <NotificationProvider>
                {children}
                <NotificationsContainer />
              </NotificationProvider>
            </ThemeProvider>
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
