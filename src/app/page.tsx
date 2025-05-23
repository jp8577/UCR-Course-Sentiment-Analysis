import Link from "next/link";
import TopReviewed from "@/components/TopReviewed";

const HomePage = () => {
  return (
    <main className="main">
      {/* Header */}
      <header className="header">
        <h1 className="title">UCR Course Reviews</h1>
        <p className="subtitle">
          Real reviews by UCR students. Find the best classes before you enroll.
        </p>
      </header>

      {/* Top Courses */}
      <section className="section">
        <h2 className="section-title">Top Reviewed Courses</h2>
        <TopReviewed />
      </section>

      {/* How It Works / Explore / Submit */}
      <div className="section-flex">
        <section className="section">
          <h2 className="section-title">How It Works</h2>
          <ol className="instruction-list">
            <li>Search for a course.</li>
            <li>Read student reviews.</li>
            <li>Submit your own to help others!</li>
          </ol>
        </section>

        <section className="section text-center">
          <h2 className="section-title">Explore All Courses</h2>
          <Link href="/courses">
            <button className="primary-button">Go to Courses</button>
          </Link>
        </section>

        <section className="section text-center">
          <h2 className="section-title">Submit Your Review</h2>
          <Link href="/reviews">
            <button className="primary-button">Submit a Review</button>
          </Link>
        </section>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} UCR Course Reviews. All rights reserved.</p>
      </footer>
    </main>
  );
};

export default HomePage;
