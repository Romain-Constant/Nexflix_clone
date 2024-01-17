import { expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import ComponentRomain from "./ComponentRomain";

it("should render with no props", () => {
  render(<ComponentRomain />);
  expect(screen.getByRole("heading")).toBeDefined();
});
