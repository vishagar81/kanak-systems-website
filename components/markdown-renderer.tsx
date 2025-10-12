"use client"

import type { ReactNode } from "react"
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";
import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import type { Components } from "react-markdown"

interface MarkdownRendererProps {
  content: string
}

// export function MarkdownRenderer({ content }: MarkdownRendererProps) {
//   // Simple markdown parser for basic formatting
//   const parseMarkdown = (text: string): ReactNode[] => {
//     const lines = text.split("\n")
//     const elements: ReactNode[] = []
//     let currentIndex = 0

//     for (let i = 0; i < lines.length; i++) {
//       const line = lines[i]

//       // Skip empty lines
//       if (!line.trim()) {
//         elements.push(<br key={currentIndex++} />)
//         continue
//       }

//       // Headers
//       if (line.startsWith("# ")) {
//         elements.push(
//           <h1 key={currentIndex++} className="text-4xl font-bold text-gray-900 mb-6 mt-8">
//             {line.substring(2)}
//           </h1>,
//         )
//       } else if (line.startsWith("## ")) {
//         elements.push(
//           <h2 key={currentIndex++} className="text-3xl font-bold text-gray-900 mb-4 mt-8">
//             {line.substring(3)}
//           </h2>,
//         )
//       } else if (line.startsWith("### ")) {
//         elements.push(
//           <h3 key={currentIndex++} className="text-2xl font-bold text-gray-900 mb-3 mt-6">
//             {line.substring(4)}
//           </h3>,
//         )
//       }
//       // Bold text with **
//       else if (line.includes("**")) {
//         const parts = line.split("**")
//         const formattedParts = parts.map((part, index) =>
//           index % 2 === 1 ? (
//             <strong key={index} className="font-bold">
//               {part}
//             </strong>
//           ) : (
//             part
//           ),
//         )
//         elements.push(
//           <p key={currentIndex++} className="text-gray-700 mb-4 leading-relaxed">
//             {formattedParts}
//           </p>,
//         )
//       }
//       // Lists
//       else if (line.startsWith("* ")) {
//         // Look ahead to collect all list items
//         const listItems = []
//         let j = i
//         while (j < lines.length && lines[j].startsWith("* ")) {
//           listItems.push(lines[j].substring(2))
//           j++
//         }
//         elements.push(
//           <ul key={currentIndex++} className="list-disc list-inside mb-4 space-y-2">
//             {listItems.map((item, index) => (
//               <li key={index} className="text-gray-700 ml-4">
//                 {item}
//               </li>
//             ))}
//           </ul>,
//         )
//         i = j - 1 // Skip processed lines
//       }
//       // Images
//       else if (line.startsWith("![")) {
//         const pattern = /!\[([^\]]*)\]\(([^)]+)\)(?:\*([^*]+)\*)?/;  
//         const match = line.match(pattern);
//         console.log('line:', line);
//         if (match) {
//           const bracketText_alt = match[1]; // Text inside brackets
//           const url_src = match[2];
//           const captionText = match[3]; // Text after the image URL
//           console.log('Image details:', { bracketText_alt, url_src, captionText });

//           elements.push(
//             <div key={currentIndex++} className="my-8">
//               <img
//                 src={url_src || "/placeholder.svg?height=400&width=800&text=Image"}
//                 alt={bracketText_alt}
//                 className="w-full max-w-4xl mx-auto rounded-lg shadow-lg"
//                 title={captionText || ''}
//               />
//               {bracketText_alt && <p className="text-center text-sm text-gray-500 mt-2 italic">{bracketText_alt}</p>}
//             </div>,
//           )
//         } 
//       }
//       // Links
//       else if (line.includes("[") && line.includes("](")) {
//         const linkRegex = /\[([^\]]+)\]$$([^)]+)$$/g
//         let processedLine = line
//         const matches = [...line.matchAll(linkRegex)]

//         matches.forEach((match) => {
//           const [fullMatch, text, url] = match
//           const linkElement = `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:text-purple-700 underline">${text}</a>`
//           processedLine = processedLine.replace(fullMatch, linkElement)
//         })

//         elements.push(
//           <p
//             key={currentIndex++}
//             className="text-gray-700 mb-4 leading-relaxed"
//             dangerouslySetInnerHTML={{ __html: processedLine }}
//           />,
//         )
//       }
//       // Regular paragraphs
//       else {
//         elements.push(
//           <p key={currentIndex++} className="text-gray-700 mb-4 leading-relaxed">
//             {line}
//           </p>,
//         )
//       }
//     }

//     return elements
//   }

//   return <div className="prose prose-lg max-w-none">{parseMarkdown(content)}</div>
// }


export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const components: Components = {
    // Headings
    h1: ({ children }) => (
      <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8 mt-12 pb-4 border-b border-gray-200">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 mt-10 pb-3 border-b border-gray-200">
        {children}
      </h2>
    ),
    h3: ({ children }) => <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">{children}</h3>,
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
              src={typeof src === 'string' ? src : "/placeholder.svg"}
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
    <article className="prose prose-lg max-w-none">
      <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </article>
  )
}