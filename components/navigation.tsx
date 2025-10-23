"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Phone, Menu, X, ChevronDown } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isProgramsOpen, setIsProgramsOpen] = useState(false)
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/coaching", label: "Coaches" },
    { href: "/contact", label: "Contact" },
    { href: "/blog", label: "Blog" },
  ]

  const scrollToClasses = () => {
    const classesSection = document.querySelector(".classes-section")
    if (classesSection) {
      classesSection.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    setIsOpen(false)
    setIsProgramsOpen(false)
  }

  const handleMouseEnter = () => {
    if (closeTimeout) {
      clearTimeout(closeTimeout)
      setCloseTimeout(null)
    }
    setIsProgramsOpen(true)
  }

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsProgramsOpen(false)
    }, 150)
    setCloseTimeout(timeout)
  }

  return (
    <nav
      className={`fixed top-0 z-50 w-full border-b border-white/10 transition-all duration-300 ${
        isScrolled ? "bg-black/95 backdrop-blur-xl shadow-lg" : "glass"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/images/X-ZenLogo_OnDark_Horizontal_RGB.png"
              alt="X-Zen Sports"
              width={180}
              height={50}
              className="h-8 sm:h-10 lg:h-12 w-auto"
              priority
            />
          </Link>

          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <button className="flex items-center gap-1 text-white hover:text-primary transition-colors font-medium">
                Programs
                <ChevronDown className="h-4 w-4" />
              </button>
              {isProgramsOpen && (
                <div className="absolute top-full left-0 pt-2">
                  <div className="w-48 bg-black/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl overflow-hidden">
                    <Link
                      href="/youth"
                      className="block px-4 py-3 text-white hover:bg-primary/20 hover:text-primary transition-colors font-medium"
                      onClick={() => setIsProgramsOpen(false)}
                    >
                      Youth
                    </Link>
                    <a
                      href="/#classes"
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToClasses()
                      }}
                      className="block px-4 py-3 text-white hover:bg-primary/20 hover:text-primary transition-colors font-medium cursor-pointer"
                    >
                      Adult
                    </a>
                  </div>
                </div>
              )}
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white hover:text-primary transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="tel:+18642143174"
              className="flex items-center gap-1.5 sm:gap-2 text-white hover:text-primary transition-colors group bg-white/5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/10"
            >
              <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-primary group-hover:scale-110 transition-transform flex-shrink-0" />
              <span className="font-semibold text-sm sm:text-base lg:text-lg hidden md:inline whitespace-nowrap">
                (864) 214-3174
              </span>
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden py-4 border-t border-white/10 animate-in slide-in-from-top-2 duration-200">
            <div className="space-y-1">
              <button
                onClick={() => setIsProgramsOpen(!isProgramsOpen)}
                className="flex items-center justify-between w-full py-3 px-2 text-white hover:text-primary hover:bg-white/5 rounded-lg transition-colors font-medium"
              >
                Programs
                <ChevronDown className={`h-4 w-4 transition-transform ${isProgramsOpen ? "rotate-180" : ""}`} />
              </button>
              {isProgramsOpen && (
                <div className="pl-4 space-y-1 animate-in slide-in-from-top-1 duration-150">
                  <Link
                    href="/youth"
                    className="block py-2 px-2 text-white/80 hover:text-primary hover:bg-white/5 rounded-lg transition-colors"
                    onClick={() => {
                      setIsOpen(false)
                      setIsProgramsOpen(false)
                    }}
                  >
                    Youth
                  </Link>
                  <a
                    href="/#classes"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToClasses()
                    }}
                    className="block py-2 px-2 text-white/80 hover:text-primary hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                  >
                    Adult
                  </a>
                </div>
              )}
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-3 px-2 text-white hover:text-primary hover:bg-white/5 rounded-lg transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
