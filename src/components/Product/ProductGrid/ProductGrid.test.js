import React from "react";
import renderer from "react-test-renderer";
import ProductGrid from "./ProductGrid";

test("basic snapshot", () => {
  const component = renderer.create(<ProductGrid />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
