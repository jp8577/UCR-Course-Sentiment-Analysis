import Link from "next/link";

const Navbar = () => (
  <nav className="mb-6 w-full bg-white shadow">
    <div className="container mx-auto flex items-center justify-between px-6 py-3">
      <Link href="/" className="text-xl font-bold text-blue-700">
        UCR Course Reviews
      </Link>
      <div className="flex gap-6">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        <Link href="/courses" className="hover:text-blue-600">
          Courses
        </Link>
        <Link href="/reviews" className="hover:text-blue-600">
          Submit Review
        </Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
