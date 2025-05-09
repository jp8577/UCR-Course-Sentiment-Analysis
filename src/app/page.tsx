import Display from "@/components/display";
import TopReviewed from "@/components/TopReviewed";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="main">
      <header className="header">
        <h1 className="title">UCR Course Reviews</h1>
        <p className="subtitle">
          Real reviews by UCR students. Find the best classes before you enroll.
        </p>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by course code or name..."
            className="search-input"
          />
          <button className="primary-button">Browse All Courses</button>
        </div>
      </header>

      <section className="section">
        <h2 className="section-title">Top Reviewed Courses</h2>
        <TopReviewed />
      </section>

      <section className="section pb-10">
        <h2 className="section-title">How It Works</h2>
        <ol className="instruction-list">
          <li>Search for a course.</li>
          <li>Read student reviews.</li>
          <li>Submit your own to help others!</li>
        </ol>
      </section>


      {/* Add the button linking to the Courses Page */}
      <section className="section">
        <h2 className="section-title">Explore All Courses</h2>
        <Link href="/courses">
          <button className="primary-button">Go to Courses</button>
        </Link>

      {/* Add the button linking to the Google Form */}
      <section className="section">
        <h2 className="section-title">Submit Your Review</h2>
        <a
          href="https://docs.google.com/forms/d/1ieV9hByRgtBzp4mrEwRcNBNFnLC9f4XfZ6RPoa-NrD4/viewform?edit_requested=true"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="primary-button">Google form</button>
        </a>
      </section>

      <section className="section">
        <h2 className="section-title">All Courses</h2>
        <Display />
      </section>

      <footer className="footer">
        <p>&copy; TBD</p>
      </footer>
    </main>
  );
}
