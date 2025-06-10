import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogsHero } from "@/components/blogs-hero"
import { BlogsList } from "@/components/blogs-list"

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <BlogsHero />
        <BlogsList />
      </main>
      <Footer />
    </div>
  )
}