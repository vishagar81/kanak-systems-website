import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import type { Metadata } from "next"
import { notFound, permanentRedirect } from "next/navigation"
import { ArrowLeft, ArrowUpRight, Calendar, Clock, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import fs from "fs"
import path from "path"
import { blogs } from "@/lib/data/blogs"
import { ShareArticleButton } from "@/components/share-article-button"

const getBlogPost = async (slug: string) => {
  const blog = blogs.find((item) => item.slug === slug || item.id === Number(slug));
  if (!blog?.content) return null

  try {
    const filePath = path.join(process.cwd(), "content", "blogs", blog.content)
    const fileContent = fs.readFileSync(filePath, "utf8")
    return { ...blog, content: fileContent }
  } catch {
    return { ...blog, content: "# Article unavailable\n\nThis article could not be loaded." }
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const post = blogs.find((blog) => blog.slug === id || blog.id === Number(id))
  if (!post) return { title: "Article not found | Kanak Systems" }

  const title = `${post.title} | Kanak Systems`
  const description = post.excerpt
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  const canonicalUrl = siteUrl ? new URL(`/blogs/${post.slug}`, siteUrl).toString() : undefined
  const imagePath = post.image.split("?")[0]
  const imageUrl = siteUrl && /\.(png|jpe?g|gif|webp)$/i.test(imagePath)
    ? new URL(imagePath, siteUrl).toString()
    : undefined

  return {
    title,
    description,
    ...(canonicalUrl ? { alternates: { canonical: canonicalUrl } } : {}),
    openGraph: {
      title,
      description,
      type: "article",
      ...(canonicalUrl ? { url: canonicalUrl } : {}),
      ...(imageUrl ? { images: [{ url: imageUrl, alt: post.title }] } : {}),
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title,
      description,
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
  }
}

export default async function BlogPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getBlogPost(id);
  if (!post) notFound()
  if (/^\d+$/.test(id)) permanentRedirect(`/blogs/${post.slug}`)
  const relatedArticles = blogs
    .filter((article) => article.id !== post.id && Boolean(article.content || article.link))
    .slice(0, 3)

  return (
    <div className="page-shell">
      <Header />

      <main>
        <section className="section-wrap article-hero">
          <Link href="/blogs" className="text-link article-back"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Insights</Link>
          <p className="eyebrow">{post.category} / {post.date}</p>
          <h1 className="editorial-title">{post.title}</h1>
          <p className="article-hero__summary">{post.excerpt}</p>
          <div className="article-byline">
            <span><User className="h-4 w-4" aria-hidden="true" /> {post.author}</span>
            <span><Calendar className="h-4 w-4" aria-hidden="true" /> {post.date}</span>
            <span><Clock className="h-4 w-4" aria-hidden="true" /> {post.readTime}</span>
            <ShareArticleButton title={post.title} />
          </div>
          <Image src={post.image.split("?")[0]} alt="" width={1440} height={800} priority className="article-cover" />
        </section>

        <section className="article-content-wrap">
          <MarkdownRenderer content={post.content} showTableOfContents={post.showTableOfContents} />
        </section>

        <section className="section-wrap article-author">
          <div>
            <p className="eyebrow">About the author</p>
            <h2 className="editorial-title">{post.author}</h2>
          </div>
          <p>Sharing practical perspectives on applied AI, software engineering and delivery at Kanak Systems.</p>
          <Link className="text-link" href="/#contact">Discuss a project <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
        </section>

        <section className="section-wrap article-related">
          <p className="eyebrow">Continue reading</p>
          <div className="article-related__list">
            {relatedArticles.map((article) => {
              const href = article.link || `/blogs/${article.slug}`
              const external = href.startsWith("http")
              return (
                <article key={article.id}>
                  <p className="eyebrow">{article.category}</p>
                  <h3><Link href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>{article.title}</Link></h3>
                  <Link className="text-link" href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>Read article <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
                </article>
              )
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}