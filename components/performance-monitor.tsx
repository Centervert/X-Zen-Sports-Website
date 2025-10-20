"use client"

import { useEffect } from "react"

export function PerformanceMonitor() {
  useEffect(() => {
    // Monitor Core Web Vitals
    if (typeof window !== "undefined" && "PerformanceObserver" in window) {
      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        console.log("LCP:", lastEntry.startTime)
      })
      lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] })

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          console.log("FID:", entry.processingStart - entry.startTime)
        })
      })
      fidObserver.observe({ entryTypes: ["first-input"] })

      // Cumulative Layout Shift (CLS)
      let clsValue = 0
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value
          }
        })
        console.log("CLS:", clsValue)
      })
      clsObserver.observe({ entryTypes: ["layout-shift"] })

      // Time to First Byte (TTFB)
      const navigationObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          console.log("TTFB:", entry.responseStart - entry.requestStart)
        })
      })
      navigationObserver.observe({ entryTypes: ["navigation"] })

      // Cleanup observers
      return () => {
        lcpObserver.disconnect()
        fidObserver.disconnect()
        clsObserver.disconnect()
        navigationObserver.disconnect()
      }
    }
  }, [])

  return null
}

// Resource loading optimization
export function ResourceOptimizer() {
  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      // Preload hero image
      const heroImage = document.createElement("link")
      heroImage.rel = "preload"
      heroImage.as = "image"
      heroImage.href = "/images/hero-boxing-background.png"
      document.head.appendChild(heroImage)

      // Preload logo
      const logo = document.createElement("link")
      logo.rel = "preload"
      logo.as = "image"
      logo.href = "/images/X-ZenLogo_OnDark_Horizontal_RGB.png"
      document.head.appendChild(logo)
    }

    // Run after initial load
    const timer = setTimeout(preloadCriticalResources, 100)
    return () => clearTimeout(timer)
  }, [])

  return null
}
