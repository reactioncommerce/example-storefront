import React from "react";
import renderer from "react-test-renderer";
import ProductItem from "./ProductItem";

test("basic snapshot", () => {
  const component = renderer.create(<ProductItem />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
