"use client";

import { useState } from "react";

// app/courses/page.tsx
import Display from "@/components/display";
import Link from "next/link";

export default function CoursesPage() {
  const [query, setQuery] = useState("");
  return (
    <main className="main">
      <header className="header">
        <h1 className="title">All Courses</h1>
      </header>

      {/* Button to link back to the homepage */}
      <section className="section">
        <Link href="/">
          <button className="primary-button">Home</button>
        </Link>
      </section>

      {/* SEARCH BAR */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by course code or name"
            className="search-input"
            onChange={(e) => setQuery(e.target.value)}
          />

          <button className="primary-button">Browse All Courses</button>
        </div>
      
      <section className="section">
        <Display query={query}/>
      </section>

      <footer className="footer">
        <p>&copy; TBD</p>
      </footer>
    </main>
  );
}
