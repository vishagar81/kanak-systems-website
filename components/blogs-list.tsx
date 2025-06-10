import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Clock, User } from "lucide-react"
import Image from "next/image"

// Sample blog data
const blogs = [
  {
    id: 1,
    title: "Remediate Technical Debt with GenAI",
    excerpt: "How generative AI can help identify, prioritize, and address technical debt in legacy systems.",
    category: "AI & ML",
    author: "Vishal Agarwal",
    date: "June 5, 2024",
    readTime: "8 min read",
    image: "/placeholder.svg?height=400&width=600",
    featured: true,
  },
  {
    id: 2,
    title: "Cloud Migration Strategies for Financial Institutions",
    excerpt: "Best practices for migrating critical financial systems to the cloud with minimal disruption.",
    category: "Cloud Migration",
    author: "Vishal Agarwal",
    date: "May 22, 2024",
    readTime: "12 min read",
    image: "/placeholder.svg?height=400&width=600",
    featured: true,
  },
  {
    id: 3,
    title: "Microservices vs. Monoliths: Making the Right Choice",
    excerpt: "A comprehensive comparison to help you decide the best architecture for your application.",
    category: "Modernization",
    author: "Vishal Agarwal",
    date: "May 15, 2024",
    readTime: "10 min read",
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
  },
  {
    id: 4,
    title: "Serverless Architecture: Reducing Cloud Costs by 20%",
    excerpt: "How we helped a financial services client reduce their cloud expenditure through serverless adoption.",
    category: "Cloud Migration",
    author: "Vishal Agarwal",
    date: "May 8, 2024",
    readTime: "7 min read",
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
  },
  {
    id: 5,
    title: "RAG Implementation for Enterprise Knowledge Bases",
    excerpt: "Leveraging Retrieval Augmented Generation to enhance enterprise search and knowledge management.",
    category: "AI & ML",
    author: "Vishal Agarwal",
    date: "April 30, 2024",
    readTime: "9 min read",
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
  },
  {
    id: 6,
    title: "DevOps Best Practices for Regulated Industries",
    excerpt: "Implementing CI/CD pipelines while maintaining compliance in highly regulated sectors.",
    category: "DevOps",
    author: "Vishal Agarwal",
    date: "April 22, 2024",
    readTime: "11 min read",
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
  },
]

export function BlogsList() {
  // Separate featured and regular blogs
  const featuredBlogs = blogs.filter((blog) => blog.featured)
  const regularBlogs = blogs.filter((blog) => !blog.featured)

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured Blogs */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Articles</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {featuredBlogs.map((blog) => (
              <Card key={blog.id} className="overflow-hidden border-purple-100 hover:shadow-lg transition-shadow">
                <div className="relative h-64">
                  <Image src={blog.image || "/placeholder.svg"} alt={blog.title} fill className="object-cover" />
                  <Badge className="absolute top-4 left-4 bg-purple-600 hover:bg-purple-700">{blog.category}</Badge>
                </div>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-purple-600 transition-colors">
                    <a href={`/blogs/${blog.id}`}>{blog.title}</a>
                  </h3>
                  <p className="text-gray-600 mb-4">{blog.excerpt}</p>
                  <div className="flex items-center text-sm text-gray-500 space-x-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      <span>{blog.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{blog.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="link" className="text-purple-600 hover:text-purple-700 p-0">
                    Read More <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Regular Blogs */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Recent Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularBlogs.map((blog) => (
              <Card key={blog.id} className="overflow-hidden border-purple-100 hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image src={blog.image || "/placeholder.svg"} alt={blog.title} fill className="object-cover" />
                  <Badge className="absolute top-4 left-4 bg-purple-600 hover:bg-purple-700">{blog.category}</Badge>
                </div>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-purple-600 transition-colors">
                    <a href={`/blogs/${blog.id}`}>{blog.title}</a>
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{blog.excerpt}</p>
                  <div className="flex items-center text-xs text-gray-500 space-x-3">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{blog.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="link" className="text-purple-600 hover:text-purple-700 p-0 text-sm">
                    Read More <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Load More Button */}
        <div className="mt-12 text-center">
          <Button className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700">
            Load More Articles
          </Button>
        </div>
      </div>
    </section>
  )
}
