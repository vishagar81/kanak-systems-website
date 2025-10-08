"use client"

import type { ReactNode } from "react"

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Simple markdown parser for basic formatting
  const parseMarkdown = (text: string): ReactNode[] => {
    const lines = text.split("\n")
    const elements: ReactNode[] = []
    let currentIndex = 0

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      // Skip empty lines
      if (!line.trim()) {
        elements.push(<br key={currentIndex++} />)
        continue
      }

      // Headers
      if (line.startsWith("# ")) {
        elements.push(
          <h1 key={currentIndex++} className="text-4xl font-bold text-gray-900 mb-6 mt-8">
            {line.substring(2)}
          </h1>,
        )
      } else if (line.startsWith("## ")) {
        elements.push(
          <h2 key={currentIndex++} className="text-3xl font-bold text-gray-900 mb-4 mt-8">
            {line.substring(3)}
          </h2>,
        )
      } else if (line.startsWith("### ")) {
        elements.push(
          <h3 key={currentIndex++} className="text-2xl font-bold text-gray-900 mb-3 mt-6">
            {line.substring(4)}
          </h3>,
        )
      }
      // Bold text with **
      else if (line.includes("**")) {
        const parts = line.split("**")
        const formattedParts = parts.map((part, index) =>
          index % 2 === 1 ? (
            <strong key={index} className="font-bold">
              {part}
            </strong>
          ) : (
            part
          ),
        )
        elements.push(
          <p key={currentIndex++} className="text-gray-700 mb-4 leading-relaxed">
            {formattedParts}
          </p>,
        )
      }
      // Lists
      else if (line.startsWith("* ")) {
        // Look ahead to collect all list items
        const listItems = []
        let j = i
        while (j < lines.length && lines[j].startsWith("* ")) {
          listItems.push(lines[j].substring(2))
          j++
        }
        elements.push(
          <ul key={currentIndex++} className="list-disc list-inside mb-4 space-y-2">
            {listItems.map((item, index) => (
              <li key={index} className="text-gray-700 ml-4">
                {item}
              </li>
            ))}
          </ul>,
        )
        i = j - 1 // Skip processed lines
      }
      // Images
      else if (line.startsWith("![")) {
        const pattern = /!\[([^\]]*)\]\(([^)]+)\)(?:\*([^*]+)\*)?/;  
        const match = line.match(pattern);
        console.log('line:', line);
        if (match) {
          const bracketText_alt = match[1]; // Text inside brackets
          const url_src = match[2];
          const captionText = match[3]; // Text after the image URL
          console.log('Image details:', { bracketText_alt, url_src, captionText });

          elements.push(
            <div key={currentIndex++} className="my-8">
              <img
                src={url_src || "/placeholder.svg?height=400&width=800&text=Image"}
                alt={bracketText_alt}
                className="w-full max-w-4xl mx-auto rounded-lg shadow-lg"
                title={captionText || ''}
              />
              {bracketText_alt && <p className="text-center text-sm text-gray-500 mt-2 italic">{bracketText_alt}</p>}
            </div>,
          )
        } 
      }
      // Links
      else if (line.includes("[") && line.includes("](")) {
        const linkRegex = /\[([^\]]+)\]$$([^)]+)$$/g
        let processedLine = line
        const matches = [...line.matchAll(linkRegex)]

        matches.forEach((match) => {
          const [fullMatch, text, url] = match
          const linkElement = `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:text-purple-700 underline">${text}</a>`
          processedLine = processedLine.replace(fullMatch, linkElement)
        })

        elements.push(
          <p
            key={currentIndex++}
            className="text-gray-700 mb-4 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: processedLine }}
          />,
        )
      }
      // Regular paragraphs
      else {
        elements.push(
          <p key={currentIndex++} className="text-gray-700 mb-4 leading-relaxed">
            {line}
          </p>,
        )
      }
    }

    return elements
  }

  return <div className="prose prose-lg max-w-none">{parseMarkdown(content)}</div>
}
