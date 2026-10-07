"use client"

import { useState } from "react"
import { ArrowUpRight, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="site-header" onKeyDown={(event) => event.key === "Escape" && setIsMenuOpen(false)}>
      <div className="section-wrap">
        <div className="flex min-h-[82px] justify-between items-center gap-8">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" aria-label="Kanak Systems home">
              <Image
                src="/logo-small.svg"
                alt="Kanak Systems Ltd"
                width={470}
                height={108}
                className="site-logo"
                priority
              />
            </Link>
          </div>

          <nav className="site-nav hidden md:flex items-center gap-8" aria-label="Main navigation">
            <Link href="/case-studies">Work <ArrowUpRight className="ml-1 inline h-3.5 w-3.5" aria-hidden="true" /></Link>
            <Link href="/#stages">How we work</Link>
            <Link href="/blogs">Insights</Link>
            <Link href="/#contact">Contact</Link>
          </nav>

          <Link className="site-button hidden md:inline-flex" href="/#contact">Discuss a project <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>

          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center border border-[var(--rule)] text-[var(--ink)]"
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div id="mobile-navigation" className="md:hidden border-t border-[var(--rule)] py-5">
            <nav className="site-nav flex flex-col gap-5" aria-label="Mobile navigation">
              <Link href="/case-studies" onClick={() => setIsMenuOpen(false)}>Work</Link>
              <Link href="/#stages" onClick={() => setIsMenuOpen(false)}>How we work</Link>
              <Link href="/blogs" onClick={() => setIsMenuOpen(false)}>Insights</Link>
              <Link href="/#contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
              <Link className="site-button w-full" href="/#contact" onClick={() => setIsMenuOpen(false)}>Discuss a project <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
