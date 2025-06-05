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
        <Link href="/courses">
          <p className="subtitle-search">Browse all courses →</p>
        </Link>
      </header>

      {/* Top Courses */}
      <section className="section">
        <h2 className="section-title">Top Reviewed Courses</h2>
        <TopReviewed />
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>
          &copy; {new Date().getFullYear()} UCR Course Reviews. All rights
          reserved.
        </p>
      </footer>
    </main>
  );
};

export default HomePage;
