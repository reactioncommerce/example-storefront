import React from "react";
import renderer from "react-test-renderer";
import ProductDetailDescription from "./ProductDetailDescription";

test("basic snapshot", () => {
  const component = renderer.create((
    <ProductDetailDescription>Description</ProductDetailDescription>
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("no vendor", () => {
  const component = renderer.create((
    <ProductDetailDescription />
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
