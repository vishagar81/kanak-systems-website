"use client"

import { useState, useEffect } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import Image from "next/image"
import type { Components } from "react-markdown"
import { BookOpen, ChevronRight } from "lucide-react"

interface MarkdownRendererProps {
  content: string
  showTableOfContents?: boolean
}

interface TOCItem {
  id: string
  title: string
  level: number
}

export function MarkdownRenderer({ content, showTableOfContents = true }: MarkdownRendererProps) {
  const [tocItems, setTocItems] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>("")

  // Generate slug from heading text
  const generateSlug = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  // Extract TOC items from content
  useEffect(() => {
    const headingRegex = /^(#{1,3})\s+(.+)$/gm
    const items: TOCItem[] = []
    let match

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length
      const title = match[2].trim()
      const id = generateSlug(title)

      items.push({ id, title, level })
    }

    setTocItems(items)
  }, [content])

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const headings = document.querySelectorAll("h1[id], h2[id], h3[id]")
      let currentActiveId = ""

      headings.forEach((heading) => {
        const rect = heading.getBoundingClientRect()
        if (rect.top <= 100 && rect.top >= -100) {
          currentActiveId = heading.id
        }
      })

      if (currentActiveId) {
        setActiveId(currentActiveId)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  const components: Components = {
    // Headings with IDs for TOC
    h1: ({ children }) => {
      const text = String(children)
      const id = generateSlug(text)
      return (
        <h1
          id={id}
          className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8 mt-12 pb-4 border-b border-gray-200 scroll-mt-24"
        >
          {children}
        </h1>
      )
    },
    h2: ({ children }) => {
      const text = String(children)
      const id = generateSlug(text)
      return (
        <h2
          id={id}
          className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 mt-10 pb-3 border-b border-gray-200 scroll-mt-24"
        >
          {children}
        </h2>
      )
    },
    h3: ({ children }) => {
      const text = String(children)
      const id = generateSlug(text)
      return (
        <h3 id={id} className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8 scroll-mt-24">
          {children}
        </h3>
      )
    },
    h4: ({ children }) => <h4 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-3 mt-6">{children}</h4>,
    h5: ({ children }) => <h5 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2 mt-4">{children}</h5>,
    h6: ({ children }) => <h6 className="text-base lg:text-lg font-semibold text-gray-900 mb-2 mt-4">{children}</h6>,

    // Paragraphs
    p: ({ children }) => <p className="text-gray-700 leading-relaxed mb-6 text-base lg:text-lg">{children}</p>,

    // Links
    a: ({ href, children }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-600 hover:text-purple-700 underline decoration-purple-300 hover:decoration-purple-500 transition-colors font-medium"
      >
        {children}
      </a>
    ),

    // Lists
    ul: ({ children }) => <ul className="list-disc list-outside ml-6 mb-6 space-y-2 text-gray-700">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal list-outside ml-6 mb-6 space-y-2 text-gray-700">{children}</ol>,
    li: ({ children }) => <li className="text-base lg:text-lg leading-relaxed pl-2">{children}</li>,

    // Blockquotes
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-purple-500 pl-6 py-4 my-6 bg-purple-50 rounded-r-lg italic text-gray-700">
        {children}
      </blockquote>
    ),

    // Code blocks
    code: ({ inline, className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || "")
      const language = match ? match[1] : ""

      return !inline && language ? (
        <div className="my-6 rounded-lg overflow-hidden shadow-lg border border-gray-200">
          <div className="bg-gray-800 px-4 py-2 text-gray-300 text-sm font-mono flex items-center justify-between">
            <span>{language}</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(String(children).replace(/\n$/, ""))
              }}
              className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded transition-colors"
            >
              Copy
            </button>
          </div>
          <SyntaxHighlighter
            style={vscDarkPlus}
            language={language}
            PreTag="div"
            className="!my-0 !rounded-t-none"
            showLineNumbers
            {...props}
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code
          className="bg-purple-50 text-purple-700 px-2 py-1 rounded font-mono text-sm border border-purple-200"
          {...props}
        >
          {children}
        </code>
      )
    },

    // Images
    img: ({ src, alt }) => {
      if (!src) return null

      return (
        <div className="my-8">
          <div className="relative w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl border border-gray-200">
            <Image
              src={(typeof src === 'string' ? src : "/placeholder.svg")}
              alt={alt || "Blog image"}
              width={1200}
              height={600}
              className="w-full h-auto"
              unoptimized
            />
          </div>
          {alt && (
            <p className="text-center text-sm text-gray-500 mt-4 italic max-w-4xl mx-auto leading-relaxed">{alt}</p>
          )}
        </div>
      )
    },

    // Horizontal Rule
    hr: () => <hr className="my-8 border-t-2 border-gray-200" />,

    // Tables
    table: ({ children }) => (
      <div className="my-8 overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">{children}</table>
      </div>
    ),
    thead: ({ children }) => <thead className="bg-gray-50">{children}</thead>,
    tbody: ({ children }) => <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>,
    tr: ({ children }) => <tr>{children}</tr>,
    th: ({ children }) => (
      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">{children}</th>
    ),
    td: ({ children }) => <td className="px-6 py-4 text-sm text-gray-700">{children}</td>,

    // Strong/Bold
    strong: ({ children }) => <strong className="font-bold text-gray-900">{children}</strong>,

    // Emphasis/Italic
    em: ({ children }) => <em className="italic text-gray-700">{children}</em>,

    // Strikethrough
    del: ({ children }) => <del className="line-through text-gray-500">{children}</del>,

    // Task Lists (requires remarkGfm)
    input: ({ checked, ...props }: any) => (
      <input
        type="checkbox"
        checked={checked}
        disabled
        className="mr-2 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
        {...props}
      />
    ),
  }

  return (
    <div className="relative">
      {/* Table of Contents - Desktop */}
      {showTableOfContents && tocItems.length > 0 && (
        <div className="hidden xl:block fixed left-8 top-32 w-64 max-h-[calc(100vh-200px)] overflow-y-auto">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-32">
            <div className="flex items-center space-x-2 mb-4 pb-3 border-b border-gray-200">
              <BookOpen className="h-5 w-5 text-purple-600" />
              <h3 className="font-semibold text-gray-900">Table of Contents</h3>
            </div>
            <nav className="space-y-1">
              {tocItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    w-full text-left px-3 py-2 rounded-lg transition-all duration-200 text-sm
                    ${item.level === 1 ? "font-semibold" : "font-normal"}
                    ${item.level === 2 ? "pl-6" : ""}
                    ${item.level === 3 ? "pl-9" : ""}
                    ${
                      activeId === item.id
                        ? "bg-purple-50 text-purple-700 border-l-2 border-purple-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }
                  `}
                >
                  <div className="flex items-center space-x-2">
                    {activeId === item.id && <ChevronRight className="h-3 w-3 flex-shrink-0" />}
                    <span className="truncate">{item.title}</span>
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Table of Contents - Mobile/Tablet */}
      {showTableOfContents && tocItems.length > 0 && (
        <div className="xl:hidden mb-8">
          <details className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <summary className="flex items-center space-x-2 cursor-pointer font-semibold text-gray-900">
              <BookOpen className="h-5 w-5 text-purple-600" />
              <span>Table of Contents</span>
            </summary>
            <nav className="mt-4 space-y-1">
              {tocItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    w-full text-left px-3 py-2 rounded-lg transition-all duration-200 text-sm
                    ${item.level === 1 ? "font-semibold" : "font-normal"}
                    ${item.level === 2 ? "pl-6" : ""}
                    ${item.level === 3 ? "pl-9" : ""}
                    ${
                      activeId === item.id
                        ? "bg-purple-50 text-purple-700"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }
                  `}
                >
                  {item.title}
                </button>
              ))}
            </nav>
          </details>
        </div>
      )}

      {/* Markdown Content */}
      <article className="prose prose-lg max-w-none">
        <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </article>
    </div>
  )
}
