import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import HomePage from "../app/page"; // adjust path
import type { ReactNode } from "react";

// Mock next/link
jest.mock("next/link", () => {
  return ({ href, children }: { href: string; children: ReactNode }) => (
    <a href={href}>{children}</a>
  );
});

// Mock TopReviewed component
jest.mock("@/components/TopReviewed", () => () => (
  <div>Mocked TopReviewed Component</div>
));

describe("HomePage", () => {
  test("renders main header", () => {
    render(<HomePage />);
    expect(
      screen.getByRole("heading", { name: /ucr course reviews/i }),
    ).toBeInTheDocument();
  });

  test("has a working 'Browse all courses' link", () => {
    render(<HomePage />);
    const browseText = screen.getByText(/browse all courses/i);
    expect(browseText.closest("a")).toHaveAttribute("href", "/courses");
  });

  test("renders top reviewed courses section", () => {
    render(<HomePage />);
    expect(
      screen.getByRole("heading", { name: /top reviewed courses/i }),
    ).toBeInTheDocument();
  });
});
