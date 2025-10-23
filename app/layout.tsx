import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google"
import Script from "next/script"
import { ErrorBoundary } from "@/components/error-boundary"
import "./globals.css"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "X-Zen Sports - Fight | Flow | Grow",
  description:
    "Premier martial arts and fitness training in Greenville. Specializing in Brazilian Jiu-Jitsu, Muay Thai, Boxing, and Wrestling.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${geistSans.variable} ${geistMono.variable}`}>
        <Script
          id="google-ads"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17600256104');
            `,
          }}
        />
        <Script src="https://www.googletagmanager.com/gtag/js?id=AW-17600256104" strategy="afterInteractive" />
        <ErrorBoundary>
          <Suspense fallback={null}>{children}</Suspense>
        </ErrorBoundary>
        <Analytics />
        <GoogleTagManager gtmId="GTM-TL2CDM5R" />
        <GoogleAnalytics gaId="G-F6X35BE0Z6" />
        <Script
          id="callrail"
          src="//cdn.callrail.com/companies/749077443/e950e0ac177630e8b0b2/12/swap.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}
