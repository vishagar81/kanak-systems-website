'use client'
import { Input } from "@/components/ui/input"
import { useState } from "react";

export function BlogsHero(props: { parentCallback: (event: any) => void }) {
  const { parentCallback } = props;

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {    
    setSearchTerm(event.target.value);
    parentCallback(event); // Call the parent callback with the event
  };


  return (
    <section className="insights-hero section-wrap">
      <div className="insights-hero__copy">
        <p className="eyebrow">Kanak Systems / Insights</p>
        <h1 className="editorial-title">Thinking worth sharing.</h1>
        <p>Perspectives on applied AI, software engineering and delivery.</p>
        <label className="sr-only" htmlFor="insights-search">Search insights</label>
        <Input
          id="insights-search"
          type="search"
          placeholder="Search insights"
          className="insights-search"
          onChange={handleSearchChange}
          value={searchTerm}
        />
        </div>
    </section>
  )
}
