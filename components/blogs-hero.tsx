import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export function BlogsHero() {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-purple-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Insights &{" "}
            <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
              Expertise
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Explore our latest thoughts on cloud migration, application modernization, and AI-driven transformation
          </p>

          {/* Search Bar */}
          <div className="flex w-full max-w-md mx-auto">
            <Input
              type="text"
              placeholder="Search articles..."
              className="rounded-r-none border-r-0 border-purple-200 focus:border-purple-500"
            />
            <Button className="rounded-l-none bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700">
              <Search className="h-4 w-4" />
            </Button>
          </div>

          {/* Categories */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {["All", "Cloud Migration", "AI & ML", "Modernization", "DevOps", "Case Studies"].map((category) => (
              <Button key={category} variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
