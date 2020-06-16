import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

test("Renders the footer", () => {
  render(<Footer />);

  const footerText = screen.getByText(/Reaction Commerce/);
  expect(footerText).toBeInTheDocument();
});
