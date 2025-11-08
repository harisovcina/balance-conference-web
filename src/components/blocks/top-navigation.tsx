"use client"

import * as React from "react"
import Link from "next/link"
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

export function TopNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [scrolledPastHero, setScrolledPastHero] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      // Hero section is 100vh, so check if scrolled past that
      const heroHeight = window.innerHeight
      setScrolledPastHero(window.scrollY > heroHeight * 0.8)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      <nav
        className={cn(
          "w-full py-4 transition-all duration-300",
          scrolledPastHero && "backdrop-blur-md bg-white/80"
        )}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 z-50">
            <div className={cn(
              "text-xl font-bold transition-colors duration-300",
              scrolledPastHero ? "text-gray-900" : "text-white"
            )}>
              Balance Conference
              <span className={cn(
                "ml-2 text-sm font-normal transition-colors duration-300",
                scrolledPastHero ? "text-purple-600" : "text-purple-400"
              )}>2026</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent transition-colors duration-300",
                      scrolledPastHero
                        ? "text-gray-900 hover:bg-gray-100"
                        : "text-white hover:bg-white/10"
                    )}>
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/about" legacyBehavior passHref>
                    <NavigationMenuLink className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent transition-colors duration-300",
                      scrolledPastHero
                        ? "text-gray-900 hover:bg-gray-100"
                        : "text-white hover:bg-white/10"
                    )}>
                      About
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/conferences" legacyBehavior passHref>
                    <NavigationMenuLink className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent transition-colors duration-300",
                      scrolledPastHero
                        ? "text-gray-900 hover:bg-gray-100"
                        : "text-white hover:bg-white/10"
                    )}>
                      Conferences
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/speakers" legacyBehavior passHref>
                    <NavigationMenuLink className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent transition-colors duration-300",
                      scrolledPastHero
                        ? "text-gray-900 hover:bg-gray-100"
                        : "text-white hover:bg-white/10"
                    )}>
                      Speakers
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/contact" legacyBehavior passHref>
                    <NavigationMenuLink className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent transition-colors duration-300",
                      scrolledPastHero
                        ? "text-gray-900 hover:bg-gray-100"
                        : "text-white hover:bg-white/10"
                    )}>
                      Contact
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Button
              asChild
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6"
            >
              <Link href="/tickets">Get Tickets</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={cn(
              "lg:hidden z-50 p-2 rounded-md transition-colors",
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

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={cn(
            "lg:hidden absolute top-full left-0 right-0 border-t mt-4 backdrop-blur-xl",
            scrolledPastHero
              ? "bg-white/95 border-gray-200"
              : "bg-[#0A031B]/95 border-white/10"
          )}>
            <div className="px-6 py-6 space-y-4">
              <Link
                href="/"
                className={cn(
                  "block transition-colors py-2",
                  scrolledPastHero
                    ? "text-gray-900 hover:text-purple-600"
                    : "text-white hover:text-purple-400"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={cn(
                  "block transition-colors py-2",
                  scrolledPastHero
                    ? "text-gray-900 hover:text-purple-600"
                    : "text-white hover:text-purple-400"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/conferences"
                className={cn(
                  "block transition-colors py-2",
                  scrolledPastHero
                    ? "text-gray-900 hover:text-purple-600"
                    : "text-white hover:text-purple-400"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                Conferences
              </Link>
              <Link
                href="/speakers"
                className={cn(
                  "block transition-colors py-2",
                  scrolledPastHero
                    ? "text-gray-900 hover:text-purple-600"
                    : "text-white hover:text-purple-400"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                Speakers
              </Link>
              <Link
                href="/contact"
                className={cn(
                  "block transition-colors py-2",
                  scrolledPastHero
                    ? "text-gray-900 hover:text-purple-600"
                    : "text-white hover:text-purple-400"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Button
                asChild
                className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-full"
              >
                <Link href="/tickets" onClick={() => setMobileMenuOpen(false)}>
                  Get Tickets
                </Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
