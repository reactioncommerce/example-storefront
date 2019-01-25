import React from "react";
import renderer from "react-test-renderer";
import ProductDetailVendor from "./ProductDetailVendor";

test("basic snapshot", () => {
  const component = renderer.create((
    <ProductDetailVendor>Vendor</ProductDetailVendor>
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("no vendor", () => {
  const component = renderer.create((
    <ProductDetailVendor />
  ));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
