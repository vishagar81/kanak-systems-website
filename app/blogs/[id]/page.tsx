import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, User, Share2 } from "lucide-react"
import Link from "next/link"
import { ClientsTicker } from "@/components/clients-ticker"
import fs from "fs"
import path from "path"

// This would typically come from a CMS or database
const getBlogPost = async (id: string) => {
  if (id === "4") {
    try {
      // Read the asylum-flow markdown file
      const filePath = path.join(process.cwd(), "content", "blogs", "asylum-flow.md")
      const fileContent = fs.readFileSync(filePath, "utf8")

      return {
        id: "4",
        title:
          "Agentic Workflow for Asylum Claims Processing: How Multi-Agent AI could Transform Government Decision-Making",
        excerpt:
          "A deep dive into an innovative system that combines advanced document processing, legal reasoning, and human-centred design",
        content: fileContent,
        author: "Vishal Agarwal",
        date: "June 5, 2025",
        readTime: "15 min read",
        category: "AI & ML",
        image: "/placeholder.svg?height=400&width=800&text=AI+Workflow+System",
        featured: true,
      }
    } catch (error) {
      console.error("Error reading asylum-flow.md:", error)
      // Fallback content if file can't be read
      return {
        id: "4",
        title: "Blog Post Loading Error",
        excerpt: "There was an error loading the blog post content.",
        content: "# Error Loading Content\n\nSorry, there was an error loading this blog post. Please try again later.",
        author: "Vishal Agarwal",
        date: "June 5, 2024",
        readTime: "15 min read",
        category: "AI & ML",
        image: "/placeholder.svg?height=400&width=800",
        featured: true,
      }
    }
  }

  // Default blog post for other IDs
  return {
    id,
    title: "Blog Post Not Found",
    excerpt: "The requested blog post could not be found.",
    content: "This blog post is not available.",
    author: "Vishal Agarwal",
    date: "June 5, 2024",
    readTime: "5 min read",
    category: "General",
    image: "/placeholder.svg?height=400&width=800",
    featured: false,
  }
}

export default async function BlogPost({ params }: { params: { id: string } }) {
  const { id } = await params;
  const post = await getBlogPost(id);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-50 to-purple-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <Link href="/blogs">
                <Button variant="ghost" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 mb-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Blogs
                </Button>
              </Link>
              <div></div>
              <Badge className="bg-purple-600 hover:bg-purple-700 mb-4">{post.category}</Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">{post.title}</h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">{post.excerpt}</p>
              <div className="flex items-center text-gray-500 space-x-6 mb-8">
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>{post.readTime}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Article
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <article className="prose prose-lg max-w-none">
              <MarkdownRenderer content={post.content} />
            </article>
          </div>
        </section>

        {/* Author Bio */}
        <section className="py-16 bg-gradient-to-br from-purple-50 to-violet-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-purple-100">
              <div className="flex items-start space-x-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-violet-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                    VA
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">About the Author</h3>
                  <h4 className="text-lg text-purple-600 mb-3">Vishal Agarwal</h4>
                  <p className="text-gray-600 mb-4">
                    CEO & Technical Project Manager at Kanak Systems Ltd with 21+ years of enterprise experience. AWS
                    Certified Solution Architect with expertise in AI/ML, cloud migration, and digital transformation.
                    Previously worked with Transport for London, London Stock Exchange Group, and major financial
                    institutions.
                  </p>
                  <div className="flex space-x-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-purple-200 text-purple-700 hover:bg-purple-50 bg-transparent"
                    >
                      View Profile
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-purple-200 text-purple-700 hover:bg-purple-50 bg-transparent"
                    >
                      More Articles
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="border-t border-gray-200 pt-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Written by experts who've worked with</h3>
            <p className="text-gray-600">Industry-leading organizations trust our expertise</p>
          </div>
          <ClientsTicker />
        </section>

        {/* Related Articles */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Related Articles</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Cloud Migration Strategies for Financial Institutions",
                  excerpt:
                    "Best practices for migrating critical financial systems to the cloud with minimal disruption.",
                  category: "Cloud Migration",
                  readTime: "12 min read",
                  href: "/blogs/2",
                },
                {
                  title: "RAG Implementation for Enterprise Knowledge Bases",
                  excerpt:
                    "Leveraging Retrieval Augmented Generation to enhance enterprise search and knowledge management.",
                  category: "AI & ML",
                  readTime: "9 min read",
                  href: "/blogs/5",
                },
                {
                  title: "Serverless Architecture: Reducing Cloud Costs by 20%",
                  excerpt:
                    "How we helped a financial services client reduce their cloud expenditure through serverless adoption.",
                  category: "Cloud Migration",
                  readTime: "7 min read",
                  href: "/blogs/4",
                },
              ].map((article, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-purple-100"
                >
                  <div className="p-6">
                    <Badge variant="secondary" className="bg-purple-50 text-purple-700 mb-3">
                      {article.category}
                    </Badge>
                    <h4 className="text-lg font-bold text-gray-900 mb-2 hover:text-purple-600 transition-colors">
                      <Link href={article.href}>{article.title}</Link>
                    </h4>
                    <p className="text-gray-600 text-sm mb-4">{article.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{article.readTime}</span>
                      <Link href={article.href}>
                        <Button variant="link" className="text-purple-600 hover:text-purple-700 p-0 text-sm">
                          Read More →
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}