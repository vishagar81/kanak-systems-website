"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogsHero } from "@/components/blogs-hero"
import { InsightsList } from "@/components/insights-list"
import { useState } from "react";

export default function BlogsPage() {

  const [searchTerm, setSetSearchTerm] = useState("");
  const callbackFunction= (event: any) => setSetSearchTerm(event.currentTarget.value);

  return (
    <div className="page-shell">
      <Header />
      <main>
        <BlogsHero parentCallback={callbackFunction} />
        <InsightsList blogTitle={searchTerm} />
      </main>
      <Footer />
    </div>
  )
}