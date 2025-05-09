// app/courses/page.tsx

import Display from "@/components/display";
import Link from "next/link";

export default function CoursesPage() {
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

      <section className="section">
        <Display />
      </section>

      <footer className="footer">
        <p>&copy; TBD</p>
      </footer>
    </main>
  );
}
