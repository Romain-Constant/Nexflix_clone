import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MovieVideo from "./MovieVideo";

describe.skip("MovieVideo", () => {
  it("should render title and overview text", () => {
    // Mock data
    const data = {
      title: "Movie Title",
      overview: "Movie Overview",
    };

    // Render MovieVideo component
    render(<MovieVideo />);

    // Assert title and overview text exist
    const titleElement = screen.getByText(data.title);
    const overviewElement = screen.getByText(data.overview);
    expect(titleElement).toBeInTheDocument();
    expect(overviewElement).toBeInTheDocument();
  });
});
