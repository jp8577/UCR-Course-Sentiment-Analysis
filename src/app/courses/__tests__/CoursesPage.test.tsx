import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CoursesPage from "../page";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { course_id: "CS180", avg_difficulty: 2.7 },
        { course_id: "MATH010", avg_difficulty: 3.2 },
      ]),
  }),
) as jest.Mock;

describe("CoursesPage", () => {
  test("shows header properly", async () => {
    render(<CoursesPage />);
    expect(await screen.getByText("UCR Course Reviews")).toBeInTheDocument();
    expect(
      await screen.getByText(
        "Real reviews by UCR students. Find the best classes before you enroll.",
      ),
    ).toBeInTheDocument();
  });

  test("shows search input", async () => {
    render(<CoursesPage />);
    expect(
      await screen.findByPlaceholderText(/search by course/i),
    ).toBeInTheDocument();
  });

  test("filters courses based on search", async () => {
    render(<CoursesPage />);
    const input = await screen.findByPlaceholderText(/search by course/i);
    fireEvent.change(input, { target: { value: "CS180" } });

    await waitFor(() => {
      expect(screen.getByText("CS180")).toBeInTheDocument();
      expect(screen.queryByText("MATH010")).not.toBeInTheDocument();
    });
  });

  test("shows no results when nothing matches", async () => {
    render(<CoursesPage />);
    const input = await screen.findByPlaceholderText(/search by course/i);
    fireEvent.change(input, { target: { value: "PHYS999" } });

    await waitFor(() => {
      expect(screen.queryByText("CS180")).not.toBeInTheDocument();
      expect(screen.queryByText("MATH010")).not.toBeInTheDocument();
      expect(screen.getByText(/no matching courses/i)).toBeInTheDocument();
    });
  });

  test("shows correct results when matches", async () => {
    render(<CoursesPage />);
    const input = await screen.findByPlaceholderText(/search by course/i);
    fireEvent.change(input, { target: { value: "CS" } });

    await waitFor(() => {
      expect(screen.getByText("CS180")).toBeInTheDocument();
      expect(screen.queryByText("MATH010")).not.toBeInTheDocument();
    });
  });
});
