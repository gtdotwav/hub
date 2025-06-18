import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import CommandPaletteProvider from "@/components/command-palette-provider"
import { BonusPointsProvider } from "@/contexts/bonus-points-context"
import { AuthProvider } from "@/contexts/auth-context"
import PopupsProvider from "@/components/popups-provider" // User's existing PopupsProvider
import { ProPopupProvider } from "@/contexts/pro-popup-context" // New ProPopupProvider
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { dmSans, inter } from "@/lib/fonts"

export const metadata: Metadata = {
  title: "CreatorHub - Transforme Conteúdo em Renda",
  description: "A plataforma para criadores de conteúdo monetizarem sua paixão.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${dmSans.variable} ${inter.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <CommandPaletteProvider>
            <BonusPointsProvider>
              <AuthProvider>
                <ProPopupProvider>
                  {" "}
                  {/* Integrated ProPopupProvider */}
                  <PopupsProvider>
                    {" "}
                    {/* User's existing PopupsProvider */}
                    <Header />
                    <main>{children}</main>
                    <Footer />
                  </PopupsProvider>
                </ProPopupProvider>
              </AuthProvider>
            </BonusPointsProvider>
          </CommandPaletteProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
