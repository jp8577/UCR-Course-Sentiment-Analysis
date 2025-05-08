import Display from "@/components/display";
import TopReviewed from "@/components/TopReviewed"

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
        {/* <div className="course-list">
          <div className="course-card">
            CS180 - Introduction To Software Engineering
          </div>
          <div className="course-card">PHYS040C - General Physics</div>
        </div> */}
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
