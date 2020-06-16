import React from "react";
import { render } from "@testing-library/react";
import Footer from "./Footer";

test("Renders the footer", () => {
  const { getByText } = render(<Footer />);
  const footerText = getByText(/Reaction Commerce/);
  expect(footerText).toBeInTheDocument();
});
