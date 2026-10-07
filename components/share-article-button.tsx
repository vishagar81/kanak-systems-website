"use client"

import { useState } from "react"
import { Share2 } from "lucide-react"

export function ShareArticleButton({ title }: { title: string }) {
  const [status, setStatus] = useState("")

  const share = async () => {
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({ title, url })
        setStatus("Article shared")
      } else {
        await navigator.clipboard.writeText(url)
        setStatus("Article link copied")
      }
    } catch {
      setStatus("Sharing was cancelled or unavailable")
    }
  }

  return (
    <span className="inline-flex items-center gap-3">
      <button type="button" onClick={share} className="site-button site-button--quiet">
        <Share2 className="h-4 w-4" aria-hidden="true" /> Share Article
      </button>
      <span className="sr-only" aria-live="polite">{status}</span>
    </span>
  )
}