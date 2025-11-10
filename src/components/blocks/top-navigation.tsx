"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export interface TopNavigationProps {
  scrollThreshold?: number // Pixel value for when color should change. If undefined, uses 80% of viewport height
}

export function TopNavigation({ scrollThreshold }: TopNavigationProps = {}) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [scrolledPastHero, setScrolledPastHero] = React.useState(false)
  const pathname = usePathname()

  React.useEffect(() => {
    const handleScroll = () => {
      // Use custom threshold if provided, otherwise default to 80% of viewport height
      const threshold = scrollThreshold ?? window.innerHeight * 0.8
      setScrolledPastHero(window.scrollY > threshold)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrollThreshold])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[10000] w-full" style={{ position: 'fixed', top: 0, left: 0, right: 0 }}>
        <nav
          className={cn(
            "w-full py-3 sm:py-4 transition-all duration-300 relative",
            scrolledPastHero 
              ? "backdrop-blur-md bg-white/80" 
              : "backdrop-blur-sm bg-[#0A031B]/60"
          )}
          style={{ minHeight: '56px' }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 flex items-center justify-between relative z-10">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 relative flex-shrink-0 min-w-0">
              <div className={cn(
                "text-sm sm:text-lg md:text-xl font-bold transition-colors duration-300 whitespace-nowrap truncate",
                scrolledPastHero ? "text-gray-900" : "text-white"
              )}>
                <span className="hidden sm:inline">Balance Conference</span>
                <span className="sm:hidden">Balance</span>
                <span className={cn(
                  "ml-1 sm:ml-2 text-xs sm:text-sm font-normal transition-colors duration-300",
                  scrolledPastHero ? "text-purple-600" : "text-purple-400"
                )}>2026</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/" className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent transition-colors duration-300",
                        scrolledPastHero
                          ? "text-gray-900 hover:bg-gray-100"
                          : "text-white hover:bg-white/10"
                      )}>
                        Home
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/about" className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent transition-colors duration-300",
                        scrolledPastHero
                          ? "text-gray-900 hover:bg-gray-100"
                          : "text-white hover:bg-white/10"
                      )}>
                        About
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/conferences" className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent transition-colors duration-300",
                        scrolledPastHero
                          ? "text-gray-900 hover:bg-gray-100"
                          : "text-white hover:bg-white/10"
                      )}>
                        Conferences
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/speakers" className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent transition-colors duration-300",
                        scrolledPastHero
                          ? "text-gray-900 hover:bg-gray-100"
                          : "text-white hover:bg-white/10"
                      )}>
                        Speakers
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/contact" className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent transition-colors duration-300",
                        scrolledPastHero
                          ? "text-gray-900 hover:bg-gray-100"
                          : "text-white hover:bg-white/10"
                      )}>
                        Contact
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              <Button
                asChild
                className="bg-balance-300 hover:bg-balance-400 text-white rounded-lg px-6"
              >
                <Link href="/tickets">Get Tickets</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                "lg:hidden p-2 rounded-md transition-colors relative flex-shrink-0 ml-2 z-20",
                scrolledPastHero
                  ? "text-gray-900 hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
              )}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu - Outside header to avoid z-index stacking context issues */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[9999] backdrop-blur-xl bg-[#0A031B]/85">
            <div className="flex flex-col h-full w-full px-16 py-24">
              <div className="flex flex-col space-y-8 flex-1">
                <Link
                  href="/"
                  className={cn(
                    "text-2xl font-semibold transition-all duration-300 relative",
                    pathname === "/"
                      ? "text-white"
                      : "text-white/60"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {pathname === "/" && (
                    <span className="absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent-gold" />
                  )}
                  Home
                </Link>
                <Link
                  href="/about"
                  className={cn(
                    "text-2xl font-semibold transition-all duration-300 relative",
                    pathname === "/about"
                      ? "text-white"
                      : "text-white/60"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {pathname === "/about" && (
                    <span className="absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent-gold" />
                  )}
                  About
                </Link>
                <Link
                  href="/conferences"
                  className={cn(
                    "text-2xl font-semibold transition-all duration-300 relative",
                    pathname === "/conferences" || pathname?.startsWith("/conferences/")
                      ? "text-white"
                      : "text-white/60"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {(pathname === "/conferences" || pathname?.startsWith("/conferences/")) && (
                    <span className="absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent-gold" />
                  )}
                  Conferences
                </Link>
                <Link
                  href="/speakers"
                  className={cn(
                    "text-2xl font-semibold transition-all duration-300 relative",
                    pathname === "/speakers" || pathname?.startsWith("/speakers/")
                      ? "text-white"
                      : "text-white/60"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {(pathname === "/speakers" || pathname?.startsWith("/speakers/")) && (
                    <span className="absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent-gold" />
                  )}
                  Speakers
                </Link>
                <Link
                  href="/contact"
                  className={cn(
                    "text-2xl font-semibold transition-all duration-300 relative",
                    pathname === "/contact"
                      ? "text-white"
                      : "text-white/60"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {pathname === "/contact" && (
                    <span className="absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent-gold" />
                  )}
                  Contact
                </Link>
              </div>
              <div className="pt-8">
                <Button
                  asChild
                  className="w-full bg-balance-300 hover:bg-balance-400 text-white rounded-lg"
                >
                  <Link href="/tickets" onClick={() => setMobileMenuOpen(false)}>
                    Get Tickets
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
    </>
  )
}
