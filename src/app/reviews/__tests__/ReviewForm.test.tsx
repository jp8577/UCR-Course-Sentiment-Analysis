import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ReviewForm from "../page"; // Adjust if renamed or moved

beforeEach(() => {
  global.fetch = jest.fn(); // Ensure fresh mock each time
});

describe("ReviewForm", () => {
  test("shows error if fields are empty", async () => {
    render(<ReviewForm />);
    fireEvent.click(screen.getByText(/submit review/i));
    expect(
      await screen.findByText(/please fill all fields/i),
    ).toBeInTheDocument();
  });

  test("submits successfully and resets form", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true });

    render(<ReviewForm />);
    fireEvent.change(screen.getByLabelText(/course id/i), {
      target: { value: "CS180" },
    });
    fireEvent.change(screen.getByLabelText(/difficulty rating/i), {
      target: { value: "5" },
    });
    fireEvent.change(screen.getByLabelText(/review/i), {
      target: { value: "Awesome class!" },
    });

    fireEvent.click(screen.getByText(/submit review/i));

    await waitFor(() => {
      expect(
        screen.getByText(/review submitted successfully/i),
      ).toBeInTheDocument();
    });

    // Fields reset
    expect(screen.getByLabelText(/course id/i)).toHaveValue("");
    expect(screen.getByLabelText(/difficulty rating/i)).toHaveValue(null);
    expect(screen.getByLabelText(/review/i)).toHaveValue("");
  });

  test("shows backend error message if submission fails", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: "Failed to create review" }),
    });

    render(<ReviewForm />);
    fireEvent.change(screen.getByLabelText(/course id/i), {
      target: { value: "CS180" },
    });
    fireEvent.change(screen.getByLabelText(/difficulty rating/i), {
      target: { value: "3" },
    });
    fireEvent.change(screen.getByLabelText(/review/i), {
      target: { value: "Meh." },
    });

    fireEvent.click(screen.getByText(/submit review/i));

    await waitFor(() =>
      expect(screen.getByText(/failed to create review/i)).toBeInTheDocument(),
    );
  });

  test("shows error message on fetch failure", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Network Error"),
    );

    render(<ReviewForm />);
    fireEvent.change(screen.getByLabelText(/course id/i), {
      target: { value: "CS180" },
    });
    fireEvent.change(screen.getByLabelText(/difficulty rating/i), {
      target: { value: "6" },
    });
    fireEvent.change(screen.getByLabelText(/review/i), {
      target: { value: "Tough but fair." },
    });

    fireEvent.click(screen.getByText(/submit review/i));

    await waitFor(() =>
      expect(screen.getByText(/error submitting review/i)).toBeInTheDocument(),
    );
  });
});
