import Link from "next/link"

export function Footer() {
  return (
    <footer className="site-footer">
      <Link href="/" className="font-semibold text-[var(--ink)]">KANAK SYSTEMS</Link>
      <span>Milton Keynes, UK</span>
      <nav className="flex items-center gap-5" aria-label="Footer navigation">
        <Link href="/case-studies">Work</Link>
        <Link href="/blogs">Insights</Link>
        <Link href="/privacy">Privacy</Link>
        <a href="mailto:kanaksystemsltd@gmail.com">Email</a>
      </nav>
      <span className="w-full text-xs">&copy; {new Date().getFullYear()} Kanak Systems Ltd</span>
    </footer>
  )
}
