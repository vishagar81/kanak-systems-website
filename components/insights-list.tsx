import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { blogs } from "@/lib/data/blogs"

export function InsightsList({ blogTitle }: { blogTitle: string }) {
  const query = blogTitle.trim().toLowerCase()
  const articles = blogs
    .filter((blog) => Boolean(blog.content || blog.link))
    .filter((blog) => !query || `${blog.title} ${blog.excerpt} ${blog.category}`.toLowerCase().includes(query))
    .sort((first, second) => new Date(second.date).getTime() - new Date(first.date).getTime())

  return (
    <section className="insights-list section-wrap section-rule">
      {articles.length > 0 ? (
        <div className="insights-list__grid">
          {articles.map((blog) => (
            <article className="insight-card" key={blog.id}>
              <Link href={blog.link || `/blogs/${blog.slug}`} target={blog.link?.startsWith("http") ? "_blank" : undefined} rel={blog.link?.startsWith("http") ? "noreferrer" : undefined} className="insight-card__image">
                <Image src={blog.image.split("?")[0]} alt="" fill sizes="(max-width: 720px) 90vw, 40vw" />
              </Link>
              <div className="insight-card__content">
                <p className="eyebrow">{blog.category} / {blog.date}</p>
                <h2><Link href={blog.link || `/blogs/${blog.slug}`} target={blog.link?.startsWith("http") ? "_blank" : undefined} rel={blog.link?.startsWith("http") ? "noreferrer" : undefined}>{blog.title}</Link></h2>
                <p className="body-muted">{blog.excerpt}</p>
                <Link className="text-link" href={blog.link || `/blogs/${blog.slug}`} target={blog.link?.startsWith("http") ? "_blank" : undefined} rel={blog.link?.startsWith("http") ? "noreferrer" : undefined}>
                  Read article <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="body-muted py-16" role="status">No insights match that search.</p>
      )}
    </section>
  )
}