"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogsHero } from "@/components/blogs-hero"
import { BlogsList } from "@/components/blogs-list"
import { useState } from "react";

export default function BlogsPage() {

  const [searchTerm, setSetSearchTerm] = useState("");
  const callbackFunction= (event: any) => setSetSearchTerm(event.currentTarget.value);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <BlogsHero parentCallback={callbackFunction} />
        <BlogsList blogTitle={searchTerm} />
      </main>
      <Footer />
    </div>
  )
}